import React, { useState } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  const cards = [
    {
      title: "Our First Date",
      image: "/path/to/image1.jpg"
    },
    {
      title: "Our Favorite Memory",
      image: "/path/to/image2.jpg"
    },
    // Add more cards as needed
  ]

  const handleSwipe = () => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      if (currentCard === cards.length - 1) {
        setTimeout(() => {
          setShowFinal(true)
        }, 500)
      }
      setCurrentCard(prev => prev + 1)
      setIsTransitioning(false)
    }, 300)
  }

  if (showFinal) {
    return (
      <div className="final-screen">
        <h1>I Love You! ❤️</h1>
        <img src="/path/to/final-image.jpg" alt="Final" />
        <p>Happy Valentine's Day!</p>
      </div>
    )
  }

  if (currentCard >= cards.length) {
    return null // Show nothing during the delay
  }

  return (
    !isTransitioning && (
      <Card
        title={cards[currentCard].title}
        image={cards[currentCard].image}
        onSwipe={handleSwipe}
      />
    )
  )
}

export default App
