# Sync Pebble across your Apple devices with iCloud

Pebble can keep your iPhone, iPad and Mac in step through **your own iCloud** (Apple CloudKit).
Apple only allows a web app to use iCloud when it is registered in a developer account, so there is a
one-time setup. It takes about 15 minutes. After that, each device only needs the setup code and your Apple ID.

> Apple changes the wording and layout of its dashboard now and then. If a label below does not match
> exactly, look for the closest one.

## What you need
- An Apple ID with two-factor authentication.
- The **Apple Developer Program** (paid, about US$99 per year): <https://developer.apple.com/programs/>

## One-time setup (about 15 minutes)

1. **Join the Apple Developer Program** with your Apple ID and wait for the confirmation email.
2. Open the **CloudKit Console**: <https://icloud.developer.apple.com/dashboard/> and sign in.
3. Choose **Add Container** (or **+**). Give it a name such as `iCloud.com.yourname.pebble`.
   It must start with `iCloud.`. Write the exact name down; this is your **container ID**.
4. Open your container, then go to **API Access → API Tokens** and choose **New Token**.
   - Name: `Pebble`.
   - Sign-in callback: **postMessage** (the default). If you are asked to limit the domain, use
     `https://stitch0701.github.io`.
   - Save, then **copy the token**.
5. Open **Pebble → ⚙ Settings → iCloud sync (Apple ID)**:
   - paste the **container ID** and the **API token**;
   - leave **Development (start here)** selected;
   - tap **Save and continue**.
6. Pebble restarts. Open ⚙ Settings again and tap the **Sign in with Apple ID** button. Sign in.
   Pebble now syncs. A cloud icon appears at the top of the screen.

### Switching to Production (recommended once it works)
Development is for testing and Apple may reset its data. For everyday use:
1. In the CloudKit Console choose **Schema** and confirm a record type named **PebbleState** exists
   (Pebble creates it the first time it syncs in Development).
2. Choose **Deploy Schema Changes… to Production** and confirm.
3. In Pebble: ⚙ Settings → **Disconnect** (iCloud), then enter the same container ID and token again and
   choose **Production**.

## Adding another device (iPad, Mac)
1. On a device that already works: ⚙ Settings → iCloud sync → **Copy setup code**.
2. On the new device open Pebble → ⚙ Settings → iCloud sync → **Paste setup code**.
   (Universal Clipboard moves the code between your Apple devices automatically. You can also message it to yourself.)
3. Tap **Sign in with Apple ID** using the **same Apple ID**.

The setup code contains your API token. Keep it to yourself. Your tasks are stored in your *private* iCloud
database, so only you (signed in with your Apple ID) can read them. The token is never uploaded with your data.

## How it behaves
- Changes sync when you open Pebble, a few seconds after you edit, and about once a minute while it is open.
- Edits merge item by item. If two devices change the same item, the later change wins.
  Deleting on one device deletes on the others.
- Pebble stores everything in one iCloud record named `state`, which Apple limits to about 1 MB. If you ever
  see a "too much data" message, delete old items or use the Review tab to clear finished ones.
- Google Drive sync can run alongside iCloud sync. Use one or both.

## Troubleshooting
- **"Not signed in"**: tap the Apple ID button in ⚙ Settings. Safari may need pop-ups allowed for the site.
- **A message mentioning authentication or access**: the token or container ID is wrong, or the token was
  created in a different container. Disconnect and enter them again.
- **Works in Development but fails in Production**: the schema was not deployed to Production yet.
- **Nothing appears on the second device**: check both devices use the same Apple ID and the same environment.
