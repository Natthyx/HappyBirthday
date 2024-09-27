// FirestoreContext.js
import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, doc, getDoc ,query, orderBy } from 'firebase/firestore';

const FirestoreContext = createContext();

export const FirestoreProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [shows, setShows] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Fetch notes based on 'index' in ascending order
const fetchNotes = async () => {
    try {
      const notesCollection = collection(db, 'notes');  // Get the collection reference
      const q = query(notesCollection, orderBy('index', 'asc'));  // Query to order by 'index' in ascending order
      const notesSnapshot = await getDocs(q);  // Fetch the documents
      const notesData = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);  // Update the state with fetched data
    } catch (error) {
      console.error("Error fetching notes: ", error);
    }
  };

  // Fetch shows
  const fetchShows = async () => {
    const showsCollection = collection(db, 'show');
    const showsSnapshot = await getDocs(showsCollection);
    const showsData = showsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setShows(showsData);
  };

  // Fetch correct answer
  const fetchCorrectAnswer = async () => {
    const answerDoc = await getDoc(doc(db, 'securityQuestions', 'firstMeetingDate'));
    if (answerDoc.exists()) {
      setCorrectAnswer(answerDoc.data().answer);
    } else {
      throw new Error('No such document!');
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchShows();
    fetchCorrectAnswer();
  }, []);

  return (
    <FirestoreContext.Provider value={{ notes, shows, correctAnswer }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContext;
