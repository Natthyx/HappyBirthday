import NoteCard from "./NoteCard"
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { db } from "../firebase"; 
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";

const NoteList = () =>{
    const [notes, setNotes] = useState([]);  // State for storing notes
    const [loading, setLoading] = useState(true);  // Loading state

    // Fetch notes from Firestore on component mount
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "notes"));  // Fetch notes from Firestore
                const notesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id, 
                    ...doc.data()
                }));
                setNotes(notesData);
                setLoading(false);  // Set loading to false after fetching
            } catch (error) {
                console.error("Error fetching notes: ", error);
                setLoading(false);  // In case of an error
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <p>Loading notes...</p>;  // Display a loading message while fetching
    }
    
    return (
        <div className="note-container">
        <Link to={"/"}>
        <span className="go-backbtn"><IoArrowBackCircle /></span></Link>
        <h2>Notes</h2>
        <div className="note-list">
        
        {notes.map((note,index)=>(
            <NoteCard
            key={index}
            id={note.id}
            title={note.title}
            cover={note.cover}
            date={note.date}/>
        ))}
            
            
            

        </div></div>
    )
}

export default NoteList