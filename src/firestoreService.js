// firestoreService.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

// Fetch the correct answer from Firestore
export const fetchCorrectAnswer = async () => {
  try {
    const answerDoc = await getDoc(doc(db, "securityQuestions", "firstMeetingDate"));
    if (answerDoc.exists()) {
        console.log(answerDoc.data().answer);
      return answerDoc.data().answer;
      
    } else {
      throw new Error("No such document");
    }
  } catch (err) {
    throw err;
  }
};
