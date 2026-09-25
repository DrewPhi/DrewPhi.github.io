const SITE_URL = 'https://drewphi.github.io/CurrentDrew/';
const ALLOWED_SITE_ORIGINS = new Set([
  'https://drewphi.github.io',
  'http://localhost:5173',
  'http://localhost:5174',
]);
const API_VERSION = '2026-03-10';

function json(data, status = 200, headers = {}) {
  return Response.json(data, {
    status,
    headers: {'Cache-Control':'no-store', ...headers},
  });
}

function error(message, status = 400, headers = {}) {
  return json({error:message}, status, headers);
}

function base64url(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64url(value) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(normalized + '='.repeat((4 - normalized.length % 4) % 4));
  return Uint8Array.from(binary, character => character.charCodeAt(0));
}

function redirectToSite(values) {
  const fragment = new URLSearchParams(values);
  return new Response(null, {
    status:302,
    headers:{
      Location:`${SITE_URL}#${fragment.toString()}`,
      'Cache-Control':'no-store',
      'Referrer-Policy':'no-referrer',
    },
  });
}

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  if (!ALLOWED_SITE_ORIGINS.has(origin)) return {'Vary':'Origin'};
  return {
    'Access-Control-Allow-Origin':origin,
    'Access-Control-Allow-Methods':'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers':'Authorization, Content-Type, Accept',
    'Access-Control-Max-Age':'600',
    'Vary':'Origin',
  };
}

async function signSession(login, secret) {
  const now = Math.floor(Date.now() / 1000);
  const payload = base64url(new TextEncoder().encode(JSON.stringify({sub:login,iat:now,exp:now + 3600})));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return `${payload}.${base64url(new Uint8Array(signature))}`;
}

async function verifySession(request, env) {
  const authorization = request.headers.get('Authorization') || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : '';
  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra || !env.SESSION_SIGNING_SECRET) return null;
  try {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.SESSION_SIGNING_SECRET), {name:'HMAC',hash:'SHA-256'}, false, ['verify']);
    const valid = await crypto.subtle.verify('HMAC', key, decodeBase64url(signature), new TextEncoder().encode(payload));
    if (!valid) return null;
    const session = JSON.parse(new TextDecoder().decode(decodeBase64url(payload)));
    if (session.sub !== 'DrewPhi' || session.exp <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

function parsePkcs8(pem) {
  const body = pem.replace(/-----BEGIN PRIVATE KEY-----/g, '').replace(/-----END PRIVATE KEY-----/g, '').replace(/\s/g, '');
  return Uint8Array.from(atob(body), character => character.charCodeAt(0));
}

async function createGitHubAppJwt(env) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(new TextEncoder().encode(JSON.stringify({alg:'RS256',typ:'JWT'})));
  const payload = base64url(new TextEncoder().encode(JSON.stringify({iat:now - 60,exp:now + 540,iss:env.GITHUB_APP_ID})));
  const unsigned = `${header}.${payload}`;
  const privateKey = await crypto.subtle.importKey('pkcs8', parsePkcs8(env.GITHUB_APP_PRIVATE_KEY), {name:'RSASSA-PKCS1-v1_5',hash:'SHA-256'}, false, ['sign']);
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, new TextEncoder().encode(unsigned));
  return `${unsigned}.${base64url(new Uint8Array(signature))}`;
}

async function installationToken(env) {
  const jwt = await createGitHubAppJwt(env);
  const response = await fetch(`https://api.github.com/app/installations/${env.GITHUB_INSTALLATION_ID}/access_tokens`, {
    method:'POST',
    headers:{Authorization:`Bearer ${jwt}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':API_VERSION,'User-Agent':'CurrentDrew-board-sync'},
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.token) throw new Error(`GitHub App token request failed (${response.status}).`);
  return data.token;
}

function githubContentsUrl(env) {
  const repository = String(env.GITHUB_REPOSITORY || '');
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) throw new Error('GITHUB_REPOSITORY must be owner/repository.');
  const path = String(env.GITHUB_BOARD_PATH || '');
  if (!/^[A-Za-z0-9_./-]+$/.test(path) || path.split('/').includes('..')) throw new Error('GITHUB_BOARD_PATH is invalid.');
  const branch = String(env.GITHUB_BRANCH || 'main');
  return `https://api.github.com/repos/${repository}/contents/${path.split('/').map(encodeURIComponent).join('/')}?ref=${encodeURIComponent(branch)}`;
}

async function readBoardFile(env, token) {
  const response = await fetch(githubContentsUrl(env), {
    headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':API_VERSION,'User-Agent':'CurrentDrew-board-sync'},
    cache:'no-store',
  });
  if (response.status === 404) return {exists:false,sha:null};
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`GitHub board read failed (${response.status}).`);
  if (!data.content || data.encoding !== 'base64') throw new Error('The repository board file is not valid base64 content.');
  const bytes = Uint8Array.from(atob(data.content.replace(/\s/g,'')), character => character.charCodeAt(0));
  let board;
  try { board = JSON.parse(new TextDecoder().decode(bytes)); } catch { throw new Error('The repository board file contains invalid JSON.'); }
  return {exists:true,sha:data.sha,board};
}

function encodeBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return btoa(binary);
}

async function handleBoard(request, env, headers) {
  if (!(await verifySession(request, env))) return error('GitHub sign-in expired. Connect again.', 401, headers);
  let token;
  try { token = await installationToken(env); }
  catch (cause) { return error(cause.message || 'Could not authorize the board repository.', 502, headers); }

  if (request.method === 'GET') {
    try { return json(await readBoardFile(env, token), 200, headers); }
    catch (cause) { return error(cause.message || 'Could not read the board.', 502, headers); }
  }

  let input;
  try { input = await request.json(); }
  catch { return error('The sync request was not valid JSON.', 400, headers); }
  const board = input?.board;
  if (!board || !Array.isArray(board.projects) || !Array.isArray(board.folders)) return error('Board data must contain project and folder lists.', 400, headers);
  const content = JSON.stringify(board, null, 2);
  if (content.length > 450000) return error('The board is too large to save.', 413, headers);

  try {
    const current = await readBoardFile(env, token);
    if (current.exists !== (typeof input.expectedSha === 'string')) return error('The cloud board changed. Pull the latest copy first.', 409, headers);
    if (current.exists && current.sha !== input.expectedSha) return error('The cloud board changed. Pull the latest copy first.', 409, headers);

    const update = {message:'Update CurrentDrew project board',content:encodeBase64(content),branch:env.GITHUB_BRANCH || 'main'};
    if (current.exists) update.sha = current.sha;
    const response = await fetch(githubContentsUrl(env), {
      method:'PUT',
      headers:{Authorization:`Bearer ${token}`,Accept:'application/vnd.github+json','Content-Type':'application/json','X-GitHub-Api-Version':API_VERSION,'User-Agent':'CurrentDrew-board-sync'},
      body:JSON.stringify(update),
    });
    const result = await response.json().catch(() => ({}));
    if (response.status === 409 || response.status === 422) return error('The cloud board changed during this push. Pull the latest copy first.', 409, headers);
    if (!response.ok || !result.content?.sha) return error(`GitHub board save failed (${response.status}).`, 502, headers);
    return json({sha:result.content.sha}, 200, headers);
  } catch (cause) {
    return error(cause.message || 'Could not save the board.', 502, headers);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = corsHeaders(request);
    if (request.method === 'OPTIONS') return new Response(null, {status:204,headers});

    if (url.pathname === '/auth/start' && request.method === 'GET') {
      const state = url.searchParams.get('state') || '';
      if (!/^[a-f0-9]{48}$/.test(state)) return error('Invalid sign-in state.');
      if (!env.GITHUB_OAUTH_CLIENT_ID) return error('GitHub OAuth is not configured.', 503);
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID);
      authorize.searchParams.set('redirect_uri', `${url.origin}/auth/callback`);
      authorize.searchParams.set('scope', 'read:user');
      authorize.searchParams.set('state', state);
      return Response.redirect(authorize.toString(), 302);
    }

    if (url.pathname === '/auth/callback' && request.method === 'GET') {
      const state = url.searchParams.get('state') || '';
      if (!/^[a-f0-9]{48}$/.test(state)) return redirectToSite({sync_error:'invalid_state'});
      if (url.searchParams.has('error')) return redirectToSite({sync_error:'authorization_cancelled',state});
      const code = url.searchParams.get('code');
      if (!code || !env.GITHUB_OAUTH_CLIENT_ID || !env.GITHUB_OAUTH_CLIENT_SECRET || !env.SESSION_SIGNING_SECRET || env.SESSION_SIGNING_SECRET.length < 32) {
        return redirectToSite({sync_error:'oauth_not_configured',state});
      }
      const exchange = await fetch('https://github.com/login/oauth/access_token', {
        method:'POST',
        headers:{Accept:'application/json','Content-Type':'application/json'},
        body:JSON.stringify({client_id:env.GITHUB_OAUTH_CLIENT_ID,client_secret:env.GITHUB_OAUTH_CLIENT_SECRET,code,redirect_uri:`${url.origin}/auth/callback`,state}),
      });
      const result = await exchange.json().catch(() => ({}));
      if (!exchange.ok || !result.access_token) return redirectToSite({sync_error:'token_exchange_failed',state});
      const identity = await fetch('https://api.github.com/user', {
        headers:{Authorization:`Bearer ${result.access_token}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':API_VERSION,'User-Agent':'CurrentDrew-board-sync'},
      });
      const user = await identity.json().catch(() => ({}));
      if (!identity.ok || !user.login) return redirectToSite({sync_error:'github_identity_failed',state});
      if (String(user.login).toLowerCase() !== 'drewphi') return redirectToSite({sync_error:'wrong_github_account',state});
      try {
        const session = await signSession(user.login, env.SESSION_SIGNING_SECRET);
        return redirectToSite({sync_session:session,state});
      } catch { return redirectToSite({sync_error:'session_create_failed',state}); }
    }

    if (url.pathname === '/api/board' && (request.method === 'GET' || request.method === 'PUT')) {
      const origin = request.headers.get('Origin') || '';
      if (!ALLOWED_SITE_ORIGINS.has(origin)) return error('Origin is not allowed.', 403, headers);
      return handleBoard(request, env, headers);
    }

    if (url.pathname === '/health' && request.method === 'GET') return json({ok:true,service:'CurrentDrew sync'});
    return error('Not found.', 404, headers);
  },
};
