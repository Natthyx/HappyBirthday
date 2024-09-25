import { useState, useEffect } from 'react';
import scrollImage from '../assets/ancient-scoll.png';
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { doc, getDoc } from "firebase/firestore";  // Firestore imports
import { db } from "../firebase";  // Firestore instance
import rose from '../assets/rose.png';

const LovePage = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);  // State for the note data
    const [loading, setLoading] = useState(true);  // Loading state
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');

    // Fetch the note data from Firestore
    useEffect(() => {
        const fetchNote = async () => {
            try {
                const noteDoc = await getDoc(doc(db, "notes", id));  // Fetch the note from Firestore
                if (noteDoc.exists()) {
                    setNote(noteDoc.data());
                    setLoading(false);
                } else {
                    console.log("No such document!");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching the note: ", error);
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    // Typing effect
    useEffect(() => {
        if (note && note.text) {
            let index = 0;
            const typingInterval = setInterval(() => {
                if (index < note.text.length) {
                    setDisplayText((prev) => prev + note.text[index]);
                    index++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);

            return () => clearInterval(typingInterval);
        }
    }, [note]);

    // Image change every few seconds
    useEffect(() => {
        if (note && note.img) {
            const imageInterval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex < note.img.length - 1 ? prevIndex + 1 : 0
                );
            }, 2000);

            return () => clearInterval(imageInterval);
        }
    }, [note]);

    if (loading) {
        return <p>Loading note...</p>;  // Display a loading message while fetching
    }

    if (!note) {
        return <p>Note not found!</p>;  // Handle case where note is not found
    }

    return (
        <div className="love-page-container">
            <Link to={"/note"}>
                <span className="go-backbtn"><IoArrowBackCircle /></span>
            </Link>
            {/* Rose Animation */}
            <div className="rose-flower">
                <img src={rose} alt='rose' />
            </div>
            <div className="rose-flower1">
                <img src={rose} alt='rose' />
            </div>
            
            {/* Pictures Carousel */}
            <div className="image-carousel">
                <img src={note.img[currentImageIndex]} alt="Love pictures" className="love-images" />
            </div>
            <div className="image-carousel"></div>
            
            {/* Scroll with Text */}
            <div className="scroll-container">
                <img className="scroll-image" src={scrollImage} alt="Ancient Scroll" />
                <p className="scroll-text typing-text">{displayText}</p>
            </div>
        </div>
    );
};

export default LovePage;
