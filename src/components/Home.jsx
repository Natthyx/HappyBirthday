import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import blueteddybear from '../assets/BlueTeddybear.png';
import { CiHeart } from "react-icons/ci";
import confetti from 'canvas-confetti';
import Footer from './Footer';
import Message from './Message';
import nicknames from '../nicknames.json'

const Home = () => {
    const year = new Date().getFullYear();
    const [showConfetti, setShowConfetti] = useState(true);
    const [randomNickname, setRandomNickname] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const languages = Object.keys(nicknames.nicknames);
            const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
            const nickname = nicknames.nicknames[randomLanguage];
            setRandomNickname(nickname);
        }, 1000); 

        return () => clearInterval(interval); 
    }, []);
    useEffect(() => {
        // Firework Effect
        const fireworkInterval = setInterval(() => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 1000);

        // Stop the fireworks after 5 seconds
        setTimeout(() => {
            clearInterval(fireworkInterval);
            setShowConfetti(false); // Stop confetti
        }, 3000);
    }, []);

    return (
        <>
        <div className="home">
            <h4 className='date'>Sep 26, {year}</h4>
            <h2 className="birthday-text">
                Happy Birthday<br /> 
                <span>{randomNickname}</span>
            </h2>

            <div className="image-container">
                <img className='teddy1' src={blueteddybear} alt="blue-teddybear" />
                <img className='teddy2' src={blueteddybear} alt="blue-teddybear" />
            </div>
            <div className='heart-pointer'>
                <CiHeart />
            </div>

            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
        </div>
        <Message />
        <Footer />
        </>
    );
};

export default Home;
