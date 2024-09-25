/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';

const MainPreview = ({ selectedShow }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null); 
    useEffect(() => {
        setIsPlaying(false); // Stop playing video when a new show is selected
    }, [selectedShow]);
    // Handler for play button click
    const handlePlayClick = () => {
        setIsPlaying(true); // Set to true when play button is clicked
    };
    // Add an event listener to detect clicks outside the iframe
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (iframeRef.current && !iframeRef.current.contains(event.target)) {
                setIsPlaying(false); // Turn off the video when clicking outside
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Ensure selectedShow and its properties exist
    if (!selectedShow || !selectedShow.coverImage || !selectedShow.videoUrl) {
        return <div className="main-preview"><div className="loading"><my-precious color="cyan"></my-precious></div></div>; // Show a fallback if data isn't ready
    }

    return (
        <div
            className="main-preview"
            style={{ backgroundImage: `linear-gradient(to left,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)),url(${selectedShow.coverImage})` }} // Update background image dynamically
        >
            {/* Show the video iframe only if the play button is clicked */}
            {isPlaying ? 
                <div className="overlay-video" ref={iframeRef}>
                    <iframe
                        width="100%"
                        height="65%"
                        src={selectedShow.videoUrl}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video Player"
                    ></iframe>
                </div>
        :
        <div className='overlay-text'>
        <h1 className='memoryTitle'>{selectedShow.title}</h1>
            <p className='memoryDesc'>{selectedShow.description}</p>

            <div className="preview-buttons">
                <button className="play-button" onClick={handlePlayClick}>
                    Play
                </button>
                
            </div>
            </div>}
        </div>
    );
};

export default MainPreview;
