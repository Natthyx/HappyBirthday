import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import heartshape from '../assets/heartshape.png';
import { getAuth, signInAnonymously } from "firebase/auth";
import FirestoreContext from '../context/FirestoreContext';
import birthdaywishes from "../birthdaywishes.json";

const Message = () => {
  const { correctAnswer } = useContext(FirestoreContext);
  const [showModal, setShowModal] = useState(false);   // To control modal visibility
  const [selectedRoute, setSelectedRoute] = useState('');  // To store the selected route
  const [answer, setAnswer] = useState('');  // To store the user's answer
  const [error, setError] = useState('');   // To display error messages
  const navigate = useNavigate();  // React Router hook for programmatic navigation
  const auth = getAuth();  // Firebase authentication
  const [randomWish, setRandomWish] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
        const languages = Object.keys(birthdaywishes.wishes);
        const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
        const wish = birthdaywishes.wishes[randomLanguage];
        setRandomWish(wish);
    }, 4000); 

    return () => clearInterval(interval); 
}, []);
// Function to handle modal submission
const handleAnswerSubmit = async () => {
  try {
    if (answer.toLowerCase() === correctAnswer) {
      await signInAnonymously(auth);
      setShowModal(false);
      navigate(selectedRoute);
      setAnswer('');
    } else {
      setError('That\'s not the right answer, try again!');
      setAnswer('');
    }
  } catch (err) {
    setError('Error submitting the answer.', err);
  }
};
  // Function to open modal and set the selected route
  const handleAccess = (route) => {
    setSelectedRoute(route);
    setShowModal(true); // Open the modal when user tries to access a section
  };

  return (
    <div id="Message" className="message">
      <div className="message-container">
        <div className="message-text">
          {randomWish}
        </div>

        {/* Options */}
        <div className="collection-row">
          <div 
            className="collection-col" 
            onClick={() => handleAccess("/note")} // Open modal for "My Notes"
          >
            <img src={heartshape} alt="heart-shape" />
            <h5>My Notes</h5>
          </div>

          <div 
            className="collection-col" 
            onClick={() => handleAccess("/ourmemories")} // Open modal for "Our Memories"
          >
            <img src={heartshape} alt="heart-shape" />
            <h5>Our Memories</h5>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Security Question</h3>
            <p>Q: What is the first date we met?</p>
            <input 
              type="text" 
              placeholder="Type your answer here..." 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)} 
            />
            {error && <p className="error-text">{error}</p>}

            {/* Modal Buttons */}
            <div className="modal-buttons">
              <button className='cancelBtn' onClick={() => {setShowModal(false);setAnswer("");}}>Cancel</button>
              <button className="submitBtn" onClick={handleAnswerSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
