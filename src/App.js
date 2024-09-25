import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Flower from './components/Flower.jsx';
import LoveScroll from './components/LoveNote.jsx';
import NoteList from './components/NoteList.jsx';
import OurMemories from './components/OurMemories.jsx';

function App() {
  return (
  
          <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/flower" element={<Flower />} /> 
                    <Route path="/note" element={<NoteList />} /> 
                    <Route path="/note/:id" element={<LoveScroll />} /> 
                    <Route path="/ourmemories" element={<OurMemories />} />
                </Routes>
            </div>
        </Router>

  );
}

export default App;
