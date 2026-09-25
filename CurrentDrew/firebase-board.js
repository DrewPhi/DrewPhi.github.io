// Paste the web app config from Firebase Console → Project settings → Your apps.
const firebaseConfig = {
  apiKey: 'AIzaSyCetjeZKUkvl1XsTzRPyb6YrZqLDmmzaPs',
  authDomain: 'currentdrew.firebaseapp.com',
  projectId: 'currentdrew',
  appId: '1:737455824873:web:7d2e350142ba7c0455f578',
};

const localBoardKey = 'currentdrew-projects-v1';
const passphraseSalt = '664267d71d0b5c299b526fd57e066ba5';
const passphraseHash = '27bb0d0aaa0a30c4696459840f8f1755c6e688faa1924a5d1fc41844c655e544';
const gate = document.querySelector('#gate');
const boardPage = document.querySelector('#project-board');
const gateForm = document.querySelector('#gate-form');
const gateError = document.querySelector('#gate-error');
const syncStatus = document.querySelector('#sync-status');
const syncConnect = document.querySelector('#sync-connect');
const syncDisconnect = document.querySelector('#sync-disconnect');
const saveLabel = document.querySelector('#save-label');
const board = document.querySelector('#board');
const template = document.querySelector('#card-template');
const makeId = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const hex = bytes => Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
const configured = !firebaseConfig.projectId.startsWith('REPLACE_') && !firebaseConfig.apiKey.startsWith('REPLACE_') && !firebaseConfig.appId.startsWith('REPLACE_');
const tones = ['yellow', 'mint', 'blue', 'pink', 'orange'];
let projects = [];
let folders = [];
let auth = null;
let db = null;
let currentUser = null;
let stopListening = null;
let cloudLoadStarted = false;
let applyingCloud = false;
let saveTimer = null;
let saveRevision = 0;
let GithubAuthProvider;
let signInWithPopup;
let signOut;
let doc;
let getDoc;
let onSnapshot;
let setDoc;
let serverTimestamp;

try {
  const local = JSON.parse(localStorage.getItem(localBoardKey) || '{}');
  projects = Array.isArray(local) ? local : (Array.isArray(local.projects) ? local.projects : []);
  folders = Array.isArray(local.folders) ? local.folders : JSON.parse(localStorage.getItem('currentdrew-folders-v1') || '[]');
  if (!Array.isArray(folders)) folders = [];
} catch { projects = []; folders = []; }
if (!folders.some(folder => folder.id === 'unfiled')) folders.unshift({id:'unfiled',name:'Unfiled'});
projects.forEach(project => { project.id ||= makeId(); project.folderId ||= 'unfiled'; });

function localSave() {
  localStorage.setItem(localBoardKey, JSON.stringify({folders,projects}));
  localStorage.setItem('currentdrew-folders-v1', JSON.stringify(folders));
}

function remoteSaveSoon() {
  if (!currentUser || !db || applyingCloud) return;
  saveRevision += 1;
  const revision = saveRevision;
  syncStatus.textContent = 'Saving your changes to your account…';
  saveLabel.textContent = 'Saving to cloud…';
  clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      const ref = doc(db, 'users', currentUser.uid, 'boards', 'main');
      await setDoc(ref, {folders, projects, updatedAt:serverTimestamp()});
      if (revision === saveRevision) {
        syncStatus.textContent = 'All changes saved and synced across your devices.';
        saveLabel.textContent = 'Saved to cloud';
      }
    } catch (error) {
      console.error('Could not save CurrentDrew board:', error);
      syncStatus.textContent = 'Cloud save failed. Your changes are still saved in this browser; check your connection and sign-in.';
      saveLabel.textContent = 'Cloud save failed';
    }
  }, 450);
}

function save() {
  localSave();
  remoteSaveSoon();
}

function persist() { save(); render(); }

function createCard(project, index) {
  const card = template.content.firstElementChild.cloneNode(true);
  card.dataset.tone = tones[index % tones.length];
  const title = card.querySelector('.title');
  const date = card.querySelector('.date');
  const status = card.querySelector('select');
  title.value = project.title || '';
  date.value = project.deadline || '';
  status.value = project.status || 'In progress';
  project.goals = Array.isArray(project.goals) ? project.goals : (project.goal ? [project.goal] : []);
  project.steps = Array.isArray(project.steps) ? project.steps : (project.next ? [project.next] : []);
  delete project.goal;
  delete project.next;
  [[title,'title'],[date,'deadline'],[status,'status']].forEach(([el, field]) => el.addEventListener('input', () => {
    project[field] = el.value;
    save();
    if (field === 'status') render();
  }));
  const addBullet = (field, list, focusNew = true, existingIndex = null) => {
    const itemIndex = existingIndex === null ? project[field].length : existingIndex;
    if (existingIndex === null) project[field].push('');
    const row = document.createElement('div');
    row.className = 'bullet-row';
    const dot = document.createElement('span');
    dot.className = 'bullet-dot';
    dot.textContent = '•';
    const input = document.createElement('textarea');
    input.className = 'field bullet-text';
    input.rows = 1;
    input.setAttribute('aria-label', field === 'goals' ? 'Goal bullet' : 'Next step bullet');
    input.value = project[field][itemIndex] || '';
    const remove = document.createElement('button');
    remove.className = 'remove-bullet';
    remove.type = 'button';
    remove.setAttribute('aria-label', 'Remove bullet');
    remove.textContent = '×';
    const resize = () => { input.style.height = 'auto'; input.style.height = `${input.scrollHeight}px`; };
    input.addEventListener('input', () => { project[field][itemIndex] = input.value; resize(); save(); });
    remove.addEventListener('click', () => { project[field].splice(itemIndex, 1); persist(); });
    row.append(dot, input, remove);
    list.append(row);
    resize();
    if (focusNew) input.focus();
    if (existingIndex === null) save();
  };
  const goals = card.querySelector('.goals');
  const steps = card.querySelector('.steps');
  project.goals.forEach((_, bulletIndex) => addBullet('goals', goals, false, bulletIndex));
  project.steps.forEach((_, bulletIndex) => addBullet('steps', steps, false, bulletIndex));
  card.querySelector('.add-goal').addEventListener('click', () => addBullet('goals', goals));
  card.querySelector('.add-step').addEventListener('click', () => addBullet('steps', steps));
  card.querySelector('.delete').addEventListener('click', () => {
    const name = project.title.trim() || 'this project';
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;
    projects.splice(index, 1);
    persist();
  });
  const dragGrip = card.querySelector('.drag-grip');
  dragGrip.draggable = true;
  dragGrip.addEventListener('dragstart', event => { event.dataTransfer.setData('text/plain', project.id); event.dataTransfer.effectAllowed = 'move'; });
  return card;
}

function render() {
  board.replaceChildren();
  document.querySelector('#count').textContent = String(projects.filter(project => project.status !== 'Done').length).padStart(2, '0');
  folders.forEach(folder => {
    const section = document.createElement('section');
    section.className = 'folder-section';
    const heading = document.createElement('div');
    heading.className = 'folder-heading';
    const folderName = document.createElement('span');
    folderName.textContent = `▰ ${folder.name}`;
    const folderCount = document.createElement('span');
    folderCount.className = 'folder-count';
    const inFolder = projects.filter(project => project.folderId === folder.id);
    folderCount.textContent = `${inFolder.length} ${inFolder.length === 1 ? 'project' : 'projects'}`;
    heading.append(folderName, folderCount);
    if (folder.id !== 'unfiled') {
      const removeFolder = document.createElement('button');
      removeFolder.type = 'button';
      removeFolder.className = 'folder-delete';
      removeFolder.textContent = 'Delete folder';
      removeFolder.addEventListener('click', () => {
        if (!window.confirm(`Delete the “${folder.name}” folder? Its cards will move to Unfiled.`)) return;
        projects.forEach(project => { if (project.folderId === folder.id) project.folderId = 'unfiled'; });
        folders = folders.filter(item => item.id !== folder.id);
        persist();
      });
      heading.append(removeFolder);
    }
    const cards = document.createElement('div');
    cards.className = 'folder-cards';
    cards.addEventListener('dragover', event => { event.preventDefault(); cards.classList.add('drag-over'); event.dataTransfer.dropEffect = 'move'; });
    cards.addEventListener('dragleave', event => { if (!cards.contains(event.relatedTarget)) cards.classList.remove('drag-over'); });
    cards.addEventListener('drop', event => {
      event.preventDefault();
      cards.classList.remove('drag-over');
      const project = projects.find(item => item.id === event.dataTransfer.getData('text/plain'));
      if (!project || project.folderId === folder.id) return;
      project.folderId = folder.id;
      persist();
    });
    if (!inFolder.length) {
      const empty = document.createElement('div');
      empty.className = 'folder-empty';
      empty.textContent = 'Drop project cards here';
      cards.append(empty);
    } else inFolder.forEach(project => cards.append(createCard(project, projects.indexOf(project))));
    section.append(heading, cards);
    board.append(section);
  });
}

function setBoardData(data) {
  if (!Array.isArray(data?.projects) || !Array.isArray(data?.folders)) throw new Error('The saved board has an unexpected format.');
  applyingCloud = true;
  projects = data.projects;
  folders = data.folders;
  if (!folders.some(folder => folder.id === 'unfiled')) folders.unshift({id:'unfiled',name:'Unfiled'});
  projects.forEach(project => { project.id ||= makeId(); project.folderId ||= 'unfiled'; });
  localSave();
  render();
  applyingCloud = false;
}

async function startCloudSync(user) {
  if (!configured || !user || !boardPage || boardPage.hidden || cloudLoadStarted) return;
  cloudLoadStarted = true;
  syncStatus.textContent = 'Loading your board from the cloud…';
  saveLabel.textContent = 'Loading…';
  const ref = doc(db, 'users', user.uid, 'boards', 'main');
  try {
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      setBoardData(snapshot.data());
      syncStatus.textContent = 'Board loaded. Changes sync automatically across your devices.';
      saveLabel.textContent = 'Synced';
    } else {
      syncStatus.textContent = 'Starting your cloud board with the projects on this computer…';
      await setDoc(ref, {folders, projects, updatedAt:serverTimestamp()});
      syncStatus.textContent = 'Board saved. Changes sync automatically across your devices.';
      saveLabel.textContent = 'Saved to cloud';
    }
    stopListening = onSnapshot(ref, snapshotUpdate => {
      if (!snapshotUpdate.exists() || snapshotUpdate.metadata.hasPendingWrites) return;
      const data = snapshotUpdate.data();
      if (JSON.stringify({folders,projects}) !== JSON.stringify({folders:data.folders,projects:data.projects})) {
        setBoardData(data);
        syncStatus.textContent = 'Board updated from another device.';
        saveLabel.textContent = 'Synced';
      }
    }, error => {
      console.error('CurrentDrew cloud listener error:', error);
      syncStatus.textContent = 'Could not listen for cloud updates. Your local copy is still available.';
    });
  } catch (error) {
    console.error('Could not load CurrentDrew board:', error);
    syncStatus.textContent = 'Cloud sync could not load. Check Firebase setup and Firestore security rules.';
    saveLabel.textContent = 'Sync unavailable';
    cloudLoadStarted = false;
  }
}

function updateAuthControls(user) {
  currentUser = user;
  syncConnect.hidden = Boolean(user);
  syncDisconnect.hidden = !user;
  if (user) {
    syncStatus.textContent = `Signed in as ${user.displayName || user.email || 'your GitHub account'}.`;
    startCloudSync(user);
  } else {
    if (stopListening) stopListening();
    stopListening = null;
    cloudLoadStarted = false;
    syncStatus.textContent = configured ? 'Sign in with your GitHub account to keep this board in sync across your computers.' : 'Cloud sync needs one-time Firebase setup. See the setup guide in this folder.';
    saveLabel.textContent = 'Changes save in this browser';
  }
}

gateForm.addEventListener('submit', async event => {
  event.preventDefault();
  const submit = gateForm.querySelector('button[type="submit"]');
  submit.disabled = true;
  gateError.textContent = '';
  try {
    const passphraseKey = await crypto.subtle.importKey('raw', new TextEncoder().encode(document.querySelector('#passphrase').value), 'PBKDF2', false, ['deriveBits']);
    const salt = Uint8Array.from(passphraseSalt.match(/.{2}/g), byte => parseInt(byte, 16));
    const derived = await crypto.subtle.deriveBits({name:'PBKDF2', hash:'SHA-256', salt, iterations:600000}, passphraseKey, 256);
    if (hex(derived) !== passphraseHash) {
      gateError.textContent = 'That passphrase did not match. Try again.';
      document.querySelector('#passphrase').select();
      return;
    }
    gate.hidden = true;
    boardPage.hidden = false;
    sessionStorage.setItem('currentdrew-unlocked','1');
    if (currentUser) startCloudSync(currentUser);
  } catch {
    gateError.textContent = 'Your browser could not verify the passphrase. Try a current browser.';
  } finally { submit.disabled = false; }
});

if (sessionStorage.getItem('currentdrew-unlocked') === '1') {
  gate.hidden = true;
  boardPage.hidden = false;
}

syncConnect.addEventListener('click', async () => {
  if (!configured) {
    syncStatus.textContent = 'Cloud sync needs one-time Firebase setup. Follow public/CurrentDrew/SETUP.md.';
    return;
  }
  try { await signInWithPopup(auth, new GithubAuthProvider()); }
  catch (error) {
    console.error('GitHub sign-in failed:', error);
    syncStatus.textContent = error.code === 'auth/unauthorized-domain' ? 'Add drewphi.github.io to Firebase Authentication’s authorized domains.' : 'GitHub sign-in did not finish. Check the Firebase GitHub provider setup and try again.';
  }
});

syncDisconnect.addEventListener('click', async () => {
  try {
    if (currentUser && db) {
      clearTimeout(saveTimer);
      await setDoc(doc(db, 'users', currentUser.uid, 'boards', 'main'), {folders, projects, updatedAt:serverTimestamp()});
    }
    await signOut(auth);
  } catch (error) {
    console.error('Sign out failed:', error);
    syncStatus.textContent = 'Could not save the latest changes or sign out. Check your connection and try again.';
  }
});

document.querySelector('#add-folder').addEventListener('click', () => {
  const name = window.prompt('Name your new folder:')?.trim();
  if (!name) return;
  if (folders.some(folder => folder.name.toLowerCase() === name.toLowerCase())) { window.alert('A folder with that name already exists.'); return; }
  folders.push({id:makeId(),name});
  persist();
});
document.querySelector('#add').addEventListener('click', () => {
  projects.unshift({id:makeId(),folderId:'unfiled',title:'',goals:[],steps:[],deadline:'',status:'In progress'});
  persist();
  board.querySelector('.title')?.focus();
});
document.querySelector('#export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({version:1,folders,projects}, null, 2)], {type:'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'currentdrew-projects.json';
  link.click();
  URL.revokeObjectURL(link.href);
});

if (!localStorage.getItem('currentdrew-website-improvements-seeded-v1') && !projects.some(project => project.title === 'Website improvements')) {
  projects.push({id:makeId(),folderId:'unfiled',title:'Website improvements',goals:[],steps:[],deadline:'',status:'Next up'});
  localStorage.setItem('currentdrew-website-improvements-seeded-v1','1');
}
render();
localSave();

if (configured) {
  syncConnect.disabled = true;
  syncStatus.textContent = 'Starting secure cloud sync…';
  (async () => {
    try {
      const [appSdk, authSdk, firestoreSdk] = await Promise.all([
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js'),
      ]);
      const {initializeApp} = appSdk;
      const {getAuth, GithubAuthProvider: GithubProvider, onAuthStateChanged, signInWithPopup: signIn, signOut: signOutUser} = authSdk;
      const {getFirestore} = firestoreSdk;
      ({doc, getDoc, onSnapshot, setDoc, serverTimestamp} = firestoreSdk);
      GithubAuthProvider = GithubProvider;
      signInWithPopup = signIn;
      signOut = signOutUser;
      const app = initializeApp(firebaseConfig);
      auth = getAuth(app);
      db = getFirestore(app);
      syncConnect.disabled = false;
      onAuthStateChanged(auth, updateAuthControls);
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      syncStatus.textContent = 'Firebase could not start. Check the config and your connection.';
      syncConnect.disabled = false;
    }
  })();
} else {
  updateAuthControls(null);
}
