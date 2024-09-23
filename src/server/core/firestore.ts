import { initializeApp, applicationDefault } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

export const App = initializeApp({
    credential: applicationDefault(),
});

export const firestore = getFirestore(App);