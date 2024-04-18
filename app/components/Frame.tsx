"use client";

import React, { useState, useEffect } from 'react';

const Frame = () => {
  const [rows, setRows] = useState([
    { name: 'top', index: 0, direction: 'ltr', isRunning: true, imageUrl: '/playgotchi-top.png' },
    { name: 'center', index: 1, direction: 'rtl', isRunning: true, imageUrl: '/playgotchi-center.png' },
    { name: 'bottom', index: 2, direction: 'ltr', isRunning: true, imageUrl: '/playgotchi-bottom.png' },
  ]);
  const [prize, setPrize] = useState('none');
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleEvent = () => {
      if (clickCount < 3) {
        setRows(rows.map((row, i) => i === clickCount ? { ...row, isRunning: false } : row));
        setClickCount(clickCount + 1);
      } else {
        setRows(rows.map(row => ({ ...row, isRunning: true })));
        setClickCount(0);
        setPrize('none');
      }
    };
  
    window.addEventListener('keydown', handleEvent);
    window.addEventListener('touchstart', handleEvent);
  
    return () => {
      window.removeEventListener('keydown', handleEvent);
      window.removeEventListener('touchstart', handleEvent);
    };
  }, [clickCount, rows]);

  useEffect(() => {
    if (rows.every(row => !row.isRunning)) {
      const allMatch = rows.every(row => row.imageUrl === rows[0].imageUrl);
      setPrize(allMatch ? 'You win!' : 'No prize won');
    }
  }, [rows]);

  return (
    <div className="frame overflow-hidden bg-[#C0C0C0] border-8 border-[#4FFF14]">
      {rows.map((row, index) => (
        <div key={row.index} className={`row ${row.direction}`}>
          <img src={row.imageUrl} alt={row.name} style={{ animationPlayState: row.isRunning ? 'running' : 'paused' }} />
          <img src={row.imageUrl} alt={row.name} style={{ animationPlayState: row.isRunning ? 'running' : 'paused' }} />
        </div>
      ))}
      <div className="prize-display">Prize: {prize}</div>
    </div>
  );
};

export default Frame;