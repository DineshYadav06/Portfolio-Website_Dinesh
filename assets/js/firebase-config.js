/**
 * Paste your Firebase web app config here.
 * Firebase Console → Project settings → Your apps → SDK setup and configuration
 *
 * Until this is filled, the site loads data from local JSON files.
 * Contact form still needs Firebase to store messages in the `contacts` collection.
 */
window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

window.isFirebaseEnabled = function () {
  const c = window.FIREBASE_CONFIG || {};
  return Boolean(c.apiKey && c.projectId);
};
