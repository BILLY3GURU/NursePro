# Firebase setup & deployment — Proud Kenya

This document explains how to configure Firebase for local development and deploy Firestore rules and indexes used by the Proud Kenya MVP.

Important: never commit private keys or `.env.local` to source control.

## Prerequisites

- Node.js (v16+ recommended)
- Firebase CLI: install globally

```bash
npm install -g firebase-tools
```

- Login to Firebase:

```bash
firebase login
```

## Project files created

- `firestore.rules` — Cloud Firestore security rules
- `firestore.indexes.json` — Index definitions for Firestore
- `src/lib/firebase.js` — Client Firebase initialization (Firestore, Auth, Storage)
- `src/lib/admin/firebase-admin.ts` — Admin SDK initialization and helpers
- `.env.local` — Local environment template (created, must be filled)

## Environment variables

Fill your project's values in `.env.local` (do NOT commit):

```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=... 
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...

# Admin SDK (from service account)
FIREBASE_ADMIN_PROJECT_ID=...
FIREBASE_ADMIN_CLIENT_EMAIL=...
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Notes:
- The `FIREBASE_ADMIN_PRIVATE_KEY` value must preserve newline characters as `\n` in `.env.local` or use a secrets manager.
- Client values (`NEXT_PUBLIC_...`) are safe for client-side usage.

## Service account (Admin SDK)

1. In Firebase Console → Project Settings → Service accounts.
2. Generate a new private key and save the JSON locally.
3. Copy `client_email`, `project_id` and the `private_key` into `.env.local` as shown above.

Alternative safer approach: use environment/config secrets in your hosting platform (Vercel, Cloud Run) and avoid storing the key locally.

## Install dependencies

From project root:

```bash
npm install
# If you haven't installed firebase-admin yet:
npm install firebase-admin firebase
```

## Deploy Firestore rules and indexes

Make sure you're targeting the correct Firebase project. Set your project with:

```bash
firebase use --add
```

Deploy only the Firestore rules and indexes:

```bash
# deploy rules
firebase deploy --only firestore:rules

# deploy indexes
firebase deploy --only firestore:indexes
```

You can also deploy both at once:

```bash
firebase deploy --only firestore
```

## Local testing

Start the Next.js dev server (requires Node installed):

```bash
npm run dev
```

Use the Firebase emulator for local Firestore/Auth where appropriate:

```bash
# start emulators (after configuring firebase.json)
firebase emulators:start --only firestore,auth
```

## Webhooks and payments

- M-Pesa callbacks should be configured to hit your server endpoints (e.g. `/api/mpesa/callback`).
- For local testing, use a tunneling service (ngrok) and register the ngrok URL with the payment provider.

## Deploying server-side/admin code

When deploying to production (Vercel, Cloud Run, etc):
- Provide the Admin SDK credentials as platform environment variables or secret values (do not commit to repo).
- Ensure the Node environment has `NODE_ENV=production`.

## Troubleshooting

- `permission-denied` errors: confirm rules are deployed and the user performing the action has the required role.
- Missing indexes: Firestore will report the exact index definition in the console—update `firestore.indexes.json` and re-deploy.
- Admin SDK initialization errors: check the `FIREBASE_ADMIN_PRIVATE_KEY` formatting and that `FIREBASE_ADMIN_CLIENT_EMAIL` is correct.

## Next steps (recommended)

- Configure CI/CD secrets for Admin credentials.
- Configure automated rule & index deployment as part of your release pipeline.
- Use Cloud Functions (or Next.js server endpoints with Admin SDK) to handle M-Pesa webhooks and payment verification reliably.

---

If you want, I can also:

- Add a `firebase.json` and emulator configuration
- Wire up example Cloud Function endpoints for M-Pesa webhooks
- Add a small script to validate `.env.local` values before starting the app

Tell me which of these you'd like next.