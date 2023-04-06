import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  // Replace with your own Firebase configuration object
  apiKey: "AIzaSyAc3FfSt6EbBbvxRKT_-YDdEEnxh9Ci9qY",
  authDomain: "math-s-grade-10-12.firebaseapp.com",
  projectId: "math-s-grade-10-12",
  storageBucket: "math-s-grade-10-12.appspot.com",
  messagingSenderId: "561804839160",
  appId: "1:561804839160:web:5e4572a09c642180ea930d",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

// Function to add a document to the grades collection
export const addGradeDocument = async (grade, filename, term, topic, fileUrl) => {
  try {
    const docRef = await addDoc(collection(firestore, "grades"), {
      grade: grade,
      filename: filename,
      term: term,
      topic: topic,
      fileUrl: fileUrl,
    });
    console.log("Document added successfully with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};

export { firestore, storage, ref, uploadBytes };