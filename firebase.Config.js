import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAc3FfSt6EbBbvxRKT_-YDdEEnxh9Ci9qY",
    authDomain: "math-s-grade-10-12.firebaseapp.com",
    projectId: "math-s-grade-10-12",
    storageBucket: "math-s-grade-10-12.appspot.com",
    messagingSenderId: "561804839160",
    appId: "1:561804839160:web:5e4572a09c642180ea930d",
    measurementId: "G-0VYKY3TBDK"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { storage, db };