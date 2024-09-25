import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import giftbox from '../assets/blue-giftbox.png';

const Footer = () => {
    const [shake, setShake] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate hook
    const year = new Date().getFullYear();

    const handleClick = () => {
        setShake(true);
        setTimeout(() => {
            setShake(false);
            navigate('/flower'); // Navigate to the surprise page after shaking
        }, 1000); // Shake for 1 second, then navigate to the Surprise page
    };

    return (
        <div className="footer">
            <div className="surprise-text">
                I have something for you
            </div>
            <div className='img-holder' onClick={handleClick}>
                <img src={giftbox} alt="gift-box" className={shake ? 'shake' : ''} />
            </div>
            <div className='developer'>
                <p>Developed by <a href="https://github.com/Natthyx.com">Natthyx</a></p>
                <p>Copyright @ {year}</p>
            </div>
        </div>
    );
}

export default Footer;
