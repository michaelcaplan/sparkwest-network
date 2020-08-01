# FIREBASE CLOUD FUNCTIONS
This folder contains cloud functions to be deployed to the Firebase Servers.
______
To write and deploy functions run, first install all dependencies

    npm install

Next, create a folder called `keys` in the base of the `functions` folder.
Go to the Firebase console for the project and under "Settings/Service Accounts/Firebase Admin SDK" press "Generate new private key" to download a JSON file.
Place said file into the `keys` folder and rename it to `serviceAccount.json`

To emulate cloud functions locally install firebase-tools with:

    npm install -g firebase-tools

Then run:

    firebase login

And login to the google account associated with the Firebase project.
Lastly, run:

    firebase emulators:start