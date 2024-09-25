import { useState, useEffect } from 'react';
import MainPreview from './MainPreview';
import ShowCard from './ShowCard';
// import thumbnail from '../assets/pic1.jpg'; 
// import thumbnail1 from '../assets/pic2.jpg'; // Placeholder image
// import coverImage1 from '../assets/image.png';  // Placeholder cover image
// import coverImage2 from '../assets/endwithus.png';
// import samplevideo from '../assets/Sample.mp4'  // Another cover image
import { IoArrowBackCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {db} from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
// List of shows with their respective cover images
// const shows = [
//     { id: 1, image: thumbnail, title: 'Show 1', description: 'Description for Show 1 Description for Show 1 Description for Show 1 Description for Show 1 Description for Show 1', coverImage: coverImage1, videoUrl: samplevideo },
//     { id: 2, image: thumbnail1, title: 'Show 2', description: 'Description for Show 2', coverImage: coverImage2, videoUrl: samplevideo },
//     { id: 3, image: thumbnail, title: 'Show 3', description: 'Description for Show 3', coverImage: coverImage1, videoUrl: samplevideo },
//     { id: 4, image: thumbnail, title: 'Show 4', description: 'Description for Show 4', coverImage: coverImage2, videoUrl: samplevideo },
//     { id: 5, image: thumbnail1, title: 'Show 5', description: 'Description for Show 5', coverImage: coverImage1, videoUrl: samplevideo },
//     { id: 6, image: thumbnail, title: 'Show 6', description: 'Description for Show 6', coverImage: coverImage2, videoUrl: samplevideo },
//     { id: 7, image: thumbnail1, title: 'Show 7', description: 'Description for Show 7', coverImage: coverImage1, videoUrl: samplevideo },
//     { id: 8, image: thumbnail, title: 'Show 8', description: 'Description for Show 8', coverImage: coverImage2, videoUrl: samplevideo },
//     // Add more shows as needed
// ];

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
