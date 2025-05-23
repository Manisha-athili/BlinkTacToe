import { useState, useEffect } from 'react';

const Instructions = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const content = (
    <ul>
      <li>Game is played on a 3x3 grid.</li>
      <li>Each player chooses an emoji category.</li>
      <li>Players take turns placing random emojis from their category.</li>
      <li>Only 3 emojis per player allowed — oldest one vanishes (FIFO).</li>
      <li>First to align 3 emojis (row, column, diagonal) wins.</li>
      <li>Draws are not possible.</li>
    </ul>
  )

  return (
    <div className="instructions">
      <h2 onClick={() => setShow(!show)} style={{ cursor: isMobile ? 'pointer' : 'default' }}>
        Game Rules {isMobile && <span>{show ? '▲' : '▼'}</span>}
      </h2>
      {!isMobile || show ? content : null}
    </div>
  )
}

export default Instructions