import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import './Card.css';

const Card = ({ title, image, onSwipe }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    if (!isDragging) {
      setIsFlipped(!isFlipped);
    }
  };

  const handlers = useSwipeable({
    onSwiping: (e) => {
      setIsDragging(true);
      setPosition({
        x: e.deltaX,
        y: e.deltaY
      });
    },
    onSwiped: (e) => {
      setIsDragging(false);
      if (Math.abs(e.deltaX) > 100) {
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
    transform: position.x || position.y 
      ? `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) rotate(${position.x * 0.1}deg)`
      : 'translate(-50%, -50%)'
  };

  return (
    <div {...handlers} className="card-container" style={style}>
      <div 
        className={`card-flipper ${isFlipped ? 'is-flipped' : ''}`} 
        onClick={handleClick}
      >
        <div className="card-front">
          <h2>{title}</h2>
          <p>Натисни</p>
        </div>
        <div className="card-back">
          <img src={image} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default Card; 