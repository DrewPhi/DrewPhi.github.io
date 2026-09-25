# CurrentDrew GitHub sync setup

The site stays on GitHub Pages. A Cloudflare Worker signs in the GitHub account, then uses a narrowly installed GitHub App to read and write one JSON file in this website repository. The Worker accepts only the `DrewPhi` account. The board file is in the public repository and is readable by anyone, as requested; only the Worker can write it through the configured app credentials. A friend editing the page in their browser changes only their own browser storage.

## 1. Deploy the Worker once

Install Wrangler and sign in to Cloudflare if needed:

```sh
npx wrangler login
npx wrangler deploy --config sync-worker/wrangler.toml
```

This first deployment uses placeholder app IDs and is only to reserve the Worker URL. Note the URL, which will look like `https://currentdrew-sync.<your-cloudflare-subdomain>.workers.dev`.

## 2. Create a GitHub OAuth App for sign-in

In GitHub, open **Settings → Developer settings → OAuth Apps → New OAuth App**.

- Application name: `CurrentDrew Sign In`
- Homepage URL: `https://drewphi.github.io/CurrentDrew/`
- Authorization callback URL: `https://currentdrew-sync.<your-cloudflare-subdomain>.workers.dev/auth/callback`

Copy the client ID and generate a client secret. The OAuth App requests only `read:user`; it is used to confirm your GitHub identity.

## 3. Create and install a GitHub App for board storage

Under **Settings → Developer settings → GitHub Apps**, create `CurrentDrew Board Storage`.

- Homepage URL: `https://drewphi.github.io/CurrentDrew/`
- Webhook: disable it
- Repository permissions: **Contents: Read and write**; **Metadata: Read-only**
- Subscribe to events: none

Create a private key and install the app on **Only select repositories**. Select only `DrewPhi/DrewPhi.github.io`. Record the GitHub App ID and the installation ID shown in that app installation's settings URL.

This repo is public, so the board JSON in it will be public too. The GitHub App credential stays inside Cloudflare and is the only write credential. The Worker code hardcodes the file path `public/CurrentDrew/board-data.json`.

Convert the downloaded App key to PKCS#8 PEM before uploading it as a Worker secret:

```sh
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in github-app.private-key.pem -out github-app.pkcs8.pem
```

Do not commit either key file.

## 4. Configure and deploy the Worker

Replace the three `REPLACE_WITH_...` values in `sync-worker/wrangler.toml` with the OAuth App client ID, GitHub App ID, and installation ID. Then add the secrets and deploy the configured Worker:

```sh
npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET --config sync-worker/wrangler.toml
npx wrangler secret put SESSION_SIGNING_SECRET --config sync-worker/wrangler.toml
npx wrangler secret put GITHUB_APP_PRIVATE_KEY --config sync-worker/wrangler.toml
npx wrangler deploy --config sync-worker/wrangler.toml
```

Use a new random value with at least 32 random bytes for `SESSION_SIGNING_SECRET`; `openssl rand -hex 32` can generate one locally. Paste the full converted PEM when Wrangler asks for `GITHUB_APP_PRIVATE_KEY`. Keep all three secret values out of GitHub and the website source.

## 5. Connect the website

Set `syncApiUrl` in `public/CurrentDrew/index.html` to your Worker origin, for example:

```js
const syncApiUrl = 'https://currentdrew-sync.<your-cloudflare-subdomain>.workers.dev';
```

Deploy the website. Unlock the board, choose **Connect GitHub**, then press **Pull** followed by **Push** once to create `public/CurrentDrew/board-data.json`. On another computer, connect the same GitHub account and press **Pull**.

## Sync behavior

- Sync writes a JSON file to the public `main` branch. It does not redeploy the site; the Worker reads the latest committed file when you pull.
- Visitors can read that JSON file, but cannot use the Worker to write it unless they sign in as `DrewPhi`.
- The page keeps a one-hour signed session in memory. Reloading clears it, so sign in again before syncing.
- Pull replaces the current browser's board after confirmation.
- Push requires a Pull first. The Worker checks the file SHA and rejects stale writes if another computer changed the board after that pull.
- Export a JSON backup before the first sync.
