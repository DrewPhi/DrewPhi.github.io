# CurrentDrew cloud sync setup

The board stays on GitHub Pages. Firebase Authentication signs you in with GitHub, and Cloud Firestore stores your board so it follows your Firebase account across devices. GitHub is only used for sign-in and for the manual JSON backups you export from the board.

Firebase's Spark plan is free, does not require a payment method, and includes one Firestore database with 1 GiB stored data, 50,000 document reads per day, and 20,000 writes per day. This board should use very little of those quotas. Quotas can change; check [Firebase pricing](https://firebase.google.com/pricing) before adding other services.

## One-time setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/) on the no-cost Spark plan. Add a **Web app** to the project.
2. In **Project settings → Your apps**, copy the web app configuration. Put its `apiKey`, `authDomain`, `projectId`, and `appId` into `firebaseConfig` near the top of `firebase-board.js`. These browser config values are public; do not put a service account key or private credential in this file.
3. In **Authentication → Sign-in method**, enable **GitHub**. Create a GitHub OAuth App in GitHub Developer Settings. Set its callback URL to the Firebase callback shown in the GitHub provider settings (it will look like `https://YOUR_PROJECT_ID.firebaseapp.com/__/auth/handler`). Put the GitHub OAuth App's client ID and secret into Firebase's GitHub provider settings, then save.
4. In **Authentication → Settings → Authorized domains**, add `drewphi.github.io`.
5. In **Firestore Database**, create the database. Open **Rules**, replace the starter rules with the rules below, and publish them:

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/boards/{boardId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

These rules isolate each account's board. Someone signed in to a different GitHub account can only access that account's own board, not yours. Keep these rules in place; never use open rules such as `allow read, write: if true`.

6. Build and publish the site. The board's **Sign in with GitHub** button will sign in and load that account's cloud board. The first sign-in uploads the current browser's board if that account has no cloud board yet. Later visits load the cloud copy and edits save automatically. Sign in with the same GitHub account on each computer.

## Backups

Use **Export backup** on the board to download `currentdrew-projects.json`. Add that file to this repository manually whenever you want a GitHub backup. The live board saves directly to Firestore and does not write commits to GitHub.

## Local development

For local testing, add `localhost` under **Authentication → Settings → Authorized domains** if Firebase asks for it. The OAuth popup returns to the current local address. Firebase's web config can be shared with the deployed page, while Firestore rules continue to isolate account data.
