import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Card.css';

const Card = ({ title, image, onSwipe }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlers = useSwipeable({
    onSwiping: (e) => {
      setPosition({
        x: e.deltaX,
        y: e.deltaY
      });
    },
    onSwiped: (e) => {
      if (Math.abs(e.deltaX) > 100) { // Threshold for swipe
        const direction = e.deltaX > 0 ? 1 : -1;
        setPosition({
          x: direction * window.innerWidth,
          y: e.deltaY
        });
        setTimeout(onSwipe, 300);
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    trackMouse: true,
    trackTouch: true,
    preventDefaultTouchmoveEvent: true,
    delta: 10
  });

  const style = {
    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) 
                rotate(${position.x * 0.1}deg)`
  };

  return (
    <div {...handlers} className="card" style={style}>
      <h2>{title}</h2>
      <img src={image} alt={title} />
    </div>
  );
};

export default Card; 