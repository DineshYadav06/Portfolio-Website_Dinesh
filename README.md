## Dinesh Kumar Yadav — Official Portfolio

Personal portfolio for a B.Tech CSE student focused on Machine Learning, Deep Learning, computer vision, Generative AI / RAG, and FastAPI backends.

Live data can be served from **Firebase Firestore**. Until Firebase keys are added in `assets/js/firebase-config.js`, the site reads local JSON (`skills.json`, `projects/projects.json`, `experience/experience.json`).

### Firebase
1. Create a Firebase project and enable **Firestore**.
2. Paste the web app config into `assets/js/firebase-config.js`.
3. Publish `firestore.rules` (public read for portfolio collections, create-only for `contacts`).
4. Temporarily allow writes, open `seed.html`, click **Seed**, then lock writes again.

Contact form stores messages in the `contacts` collection. If Firebase is not configured, it falls back to Outlook mail.
