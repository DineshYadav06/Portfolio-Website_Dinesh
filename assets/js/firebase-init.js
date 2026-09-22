(function () {
  if (!(window.isFirebaseEnabled && window.isFirebaseEnabled())) {
    console.info("Firebase config empty — using local JSON data.");
    return;
  }
  if (typeof firebase === "undefined") {
    console.warn("Firebase SDK not loaded.");
    return;
  }
  firebase.initializeApp(window.FIREBASE_CONFIG);
  window.firebaseDb = firebase.firestore();
})();
