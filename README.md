# React Native News App

<img src="https://i.imgur.com/2B17gGF.png">

> Multi language world news app with features such as commenting, saving and many others.

## Technologies

- [x] <b>JavaScript</b> - Language
- [x] <b>React Native</b> - Framework
- [x] <b>Firebase</b> - Database
- [x] <b>Eslint</b> - Linting

## Pre install

Make sure:

- You have the latest stable or LTS version of `node.js` installed.
- Place necessary files for Firebase integration for your android simulator/app.
  - On the Firebase console, add a new Android application and enter your projects details. The "Android package name" must match your local projects package name which can be         found inside of the `manifest` tag within the `/android/app/src/main/AndroidManifest.xml` file within your project.
  - Download the google-services.json file and place it inside of your project at the following location: `/android/app/google-services.json`.

## Start developing

1. `git clone https://github.com/enestatli/react-native-news-app.git`
2. Go inside the project directory `cd react-native-news-app/`
3. Install the necessary dependencies `npm install`
3. Build and start dev server with `npx react-native run-android`
4. Start `npm start`
