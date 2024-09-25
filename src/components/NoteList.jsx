import NoteCard from "./NoteCard";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

const NoteList = () => {
  const [notes, setNotes] = useState([]);  // State for storing notes
  const [loading, setLoading] = useState(true);  // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [notesPerPage, setNotesPerPage] = useState(12); // Notes per page (12 for desktop)

  const messagesCollection = collection(db, "notes");

  // Create a query to order by 'index' field in ascending order
  const q = query(messagesCollection, orderBy("index", "asc"));

  // Fetch notes from Firestore on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(q);  // Fetch notes from Firestore
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

    // Update notesPerPage based on screen size
    const updateNotesPerPage = () => {
      if (window.innerWidth <= 768) {
        setNotesPerPage(2); // For mobile: 1 column with 4 rows
      } else {
        setNotesPerPage(12); // For desktop: 4 columns with 3 rows
      }
    };

    // Check the screen size when the component mounts
    updateNotesPerPage();
    
    // Add event listener to detect screen resize
    window.addEventListener('resize', updateNotesPerPage);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateNotesPerPage);
  }, []);

  // Calculate indices for pagination
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Calculate the total number of pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading notes...</p>;  // Display a loading message while fetching
  }

  return (
    <div className="note-container">
      <Link to={"/"}>
        <span className="go-backbtn"><IoArrowBackCircle /></span>
      </Link>
      <h2>Notes</h2>

      <div className="note-list">
        {currentNotes.map((note, index) => (
          <NoteCard
            key={index}
            id={note.id}
            title={note.title}
            cover={note.cover}
            date={note.date}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
