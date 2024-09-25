import { useState, useEffect } from 'react';
import MainPreview from './MainPreview';
import ShowCard from './ShowCard';
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {db} from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';


const Ourmemories = () => {
    const [shows, setShows] = useState([]);
    const showsPerPage = 4; // Number of shows to display per page
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedShow, setSelectedShow] = useState(shows[0]); // Initially select the first show
    

    useEffect(() => {
        const fetchShows = async () => {
            const querySnapshot = await getDocs(collection(db, "show"));  // Fetch data from Firestore
            const fetchedShows = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setShows(fetchedShows);
            console.log(fetchedShows);
            setSelectedShow(fetchedShows[0]); // Initially select the first show
        };

        fetchShows();
    }, []);
    // Calculate the indexes for the current page's shows
    const indexOfLastShow = currentPage * showsPerPage;
    const indexOfFirstShow = indexOfLastShow - showsPerPage;
    const currentShows = shows.slice(indexOfFirstShow, indexOfLastShow);

    // Handler for the Next button
    const handleNext = () => {
        if (currentPage < Math.ceil(shows.length / showsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Handler for the Previous button
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle clicking on a show
    const handleShowClick = (show) => {
        setSelectedShow(show); // Update the selected show
    };

    return (
        <div className='ourmemories'>
        <Link to={"/"}>
        <span className="backbtn"><IoArrowBackCircle /></span></Link>
            <MainPreview selectedShow={selectedShow} />
            <div className="shows-list">
                <div className="pagination-side">
                    <button onClick={handlePrevious} disabled={currentPage === 1}>
                        {'<'}
                    </button>
                </div>
                <div className="shows-container">
                    {currentShows.map((show) => (
                        <ShowCard
                            key={show.id}
                            image={show.image}
                            title={show.title}
                            onClick={() => handleShowClick(show)}
                        />
                    ))}
                </div>
                <div className="pagination-side">
                    <button onClick={handleNext} disabled={currentPage === Math.ceil(shows.length / showsPerPage)}>
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ourmemories;
