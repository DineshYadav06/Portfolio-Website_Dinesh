(function () {
  const base = (document.body && document.body.dataset.base) || "./";
  const FALLBACK = {
    skills: base + "skills.json",
    projects: base + "projects/projects.json",
    experience: base + "experience/experience.json"
  };

  async function fromJson(name) {
    const res = await fetch(FALLBACK[name]);
    if (!res.ok) throw new Error("Failed to load " + name);
    const data = await res.json();
    return Array.isArray(data) ? data : data.items || [];
  }

  async function fromFirestore(name) {
    const db = window.firebaseDb;
    const snap = await db.collection(name).orderBy("order").get();
    if (snap.empty) return [];
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  window.PortfolioAPI = {
    async load(name) {
      if (window.isFirebaseEnabled && window.isFirebaseEnabled() && window.firebaseDb) {
        try {
          const rows = await fromFirestore(name);
          if (rows.length) return rows;
        } catch (err) {
          console.warn("Firestore " + name + " fallback to JSON:", err);
        }
      }
      return fromJson(name);
    },

    async sendContact(payload) {
      if (!(window.isFirebaseEnabled && window.isFirebaseEnabled()) || !window.firebaseDb) {
        throw new Error("NOT_CONFIGURED");
      }
      await window.firebaseDb.collection("contacts").add({
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "",
        message: payload.message,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        source: "portfolio"
      });
    },

    async seedIfEmpty() {
      if (!(window.isFirebaseEnabled && window.isFirebaseEnabled()) || !window.firebaseDb) return;
      const collections = ["skills", "projects", "experience"];
      for (const name of collections) {
        const snap = await window.firebaseDb.collection(name).limit(1).get();
        if (!snap.empty) continue;
        const rows = await fromJson(name);
        const batch = window.firebaseDb.batch();
        rows.forEach((row, index) => {
          const ref = window.firebaseDb.collection(name).doc();
          batch.set(ref, { ...row, order: index + 1 });
        });
        await batch.commit();
      }
    }
  };
})();
