import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Instructions from "../components/Instructions";
import '../styles/CategorySelection.css';
import EmojiPicker from "../components/EmojiPicker";

const CategorySelection = () => {
    
    const [mode, setMode] = useState(null);
    const navigate = useNavigate();

    return(
       <div className="category-selection-container">
  <h1>Emoji Clash</h1>

  <div className="top-section">
    <div className="mode-select">
      <button onClick={() => setMode('pvp')}>Player vs Player</button>
      <button onClick={() => setMode('ai')}>Player vs AI</button>
    </div>

    {mode && (
      <div className="left-section">
        <h2>Select Categories</h2>
        <EmojiPicker
          mode={mode}
          onStart={(selectedEmojis) => {
            localStorage.setItem('mode', mode);
            localStorage.setItem('playerEmojis', JSON.stringify(selectedEmojis));
            navigate('/game');
          }}
        />
      </div>
    )}
  </div>

  <div className="right-section gradient-bg">
    <Instructions />
  </div>
</div>

    )
}

export default CategorySelection;