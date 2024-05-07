"use client"
import React, { useState, useEffect, useRef } from 'react';

const Frame = () => {
  const [rows, setRows] = useState([
    { name: 'top', index: 0, direction: 'ltr', isRunning: true, imageUrl: '/playgotchi-top.png' },
    { name: 'center', index: 1, direction: 'rtl', isRunning: true, imageUrl: '/playgotchi-center.png' },
    { name: 'bottom', index: 2, direction: 'ltr', isRunning: true, imageUrl: '/playgotchi-bottom.png' },
  ]);
  const [prize, setPrize] = useState('none');
  const [clickCount, setClickCount] = useState(0);

  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRefRTL = useRef<number | null>(null);

  useEffect(() => {
    const handleEvent = () => {
      if (clickCount < 3) {
        setRows((prevRows) =>
          prevRows.map((row, i) => (i === clickCount ? { ...row, isRunning: false } : row))
        );
        setClickCount(clickCount + 1);
      } else {
        setRows((prevRows) => prevRows.map((row) => ({ ...row, isRunning: true })));
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
  }, [clickCount]);

  useEffect(() => {
    if (rows.every((row) => !row.isRunning)) {
      const allMatch = rows.every((row) => row.imageUrl === rows[0].imageUrl);
      setPrize(allMatch ? 'You win!' : 'No prize won');
    }
  }, [rows]);

  useEffect(() => {
    const scrollAnimationsRTL = () => {
      rowRefs.current.forEach((rowEl, index) => {
        if (rowEl && rows[index] && rows[index].direction === 'rtl' && rows[index].isRunning) {
          const scrollWidth = rowEl.scrollWidth - rowEl.clientWidth;

          rowEl.scrollLeft -= 1;
          if (rowEl.scrollLeft <= 0) {
            rowEl.scrollLeft = scrollWidth;
          }
        }
      });

      animationFrameRefRTL.current = requestAnimationFrame(scrollAnimationsRTL);
    };

    animationFrameRefRTL.current = requestAnimationFrame(scrollAnimationsRTL);

    return () => {
      if (animationFrameRefRTL.current) {
        cancelAnimationFrame(animationFrameRefRTL.current);
      }
    };
  }, [rows]);

  const rowRef = (el: HTMLDivElement | null) => {
    if (el) {
      rowRefs.current.push(el);
    }
  };

  return (
    <div className="frame overflow-hidden bg-[#C0C0C0] border-8 border-[#4FFF14]">
      {rows.map((row) => (
        <div key={row.index} className={`row ${row.direction}`} ref={rowRef}>
          <img src={row.imageUrl} alt={row.name} style={{ animationPlayState: row.isRunning ? 'running' : 'paused' }} />
          <img src={row.imageUrl} alt={row.name} style={{ animationPlayState: row.isRunning ? 'running' : 'paused' }} />
          <img src={row.imageUrl} alt={row.name} style={{ animationPlayState: row.isRunning ? 'running' : 'paused' }} />
        </div>
      ))}
      <div className="prize-display">Prize: {prize}</div>
    </div>
  );
};

export default Frame;