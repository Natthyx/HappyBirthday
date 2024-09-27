import NoteCard from "./NoteCard";
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import FirestoreContext from '../context/FirestoreContext';
import { ring } from 'ldrs'
ring.register('my-precious')

const NoteList = () => {
  const { notes } = useContext(FirestoreContext);  // Use context to get notes
  const [loading, setLoading] = useState(true);  // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [notesPerPage, setNotesPerPage] = useState(12); // Notes per page (12 for desktop)

  // Fetch data from context and set loading state
  useEffect(() => {
    if (notes.length > 0) {
      setLoading(false);
    }
  }, [notes]);

  // Update notesPerPage based on screen size
  useEffect(() => {
    const updateNotesPerPage = () => {
      if (window.innerWidth <= 768) {
        setNotesPerPage(2); // For mobile: 1 column with 4 rows
      } else {
        setNotesPerPage(12); // For desktop: 4 columns with 3 rows
      }
    };

    updateNotesPerPage();
    
    window.addEventListener('resize', updateNotesPerPage);

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
    return <div className="loading"><my-precious color="cyan"></my-precious></div>; 
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
