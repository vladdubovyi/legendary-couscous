import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const [currentCard, setCurrentCard] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLastImage, setShowLastImage] = useState(false)
  const [showDrumroll, setShowDrumroll] = useState(false)
  
  useEffect(() => {
    // Add viewport meta tag for better mobile display
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    document.getElementsByTagName('head')[0].appendChild(meta)

    // Add scroll listener for final reveal
    const handleScroll = () => {
      if (showFinal) {
        const scrollPosition = window.scrollY
        const windowHeight = window.innerHeight
        
        // Show drumroll when scrolled halfway
        if (scrollPosition > windowHeight * 0.5) {
          setShowDrumroll(true)
        }
        
        // Show final image when scrolled much further
        if (scrollPosition > windowHeight * 0.9) {
          setShowLastImage(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showFinal])
  
  const cards = [
    {
      title: "Наша перша поїздка",
      image: "./assets/0.jpg"
    },
    {
      title: "Ми красунчики",
      image: "./assets/2.jpg"
    },
    {
      title: "Романтичні гори",
      image: "./assets/3.jpg"
    },
    {
      title: "Побували у місті з шоколаду",
      image: "./assets/4.jpg"
    },
    {
      title: "Бідний дядя клоун",
      image: "./assets/5.jpg"
    },
    {
      title: "Повний балдеж",
      image: "./assets/6.jpg"
    },
    {
      title: "Поїли булочок і самі стали булочками",
      image: "./assets/7.jpg"
    },
    {
      title: "Познайомились з дитиночною",
      image: "./assets/8.jpg"
    }
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
        <div className="final-section first">
          <h3>Ну і як можна забути про наше улюблене?</h3>
          <img src="./assets/f1.jpg" alt="Final 1" />
          <img src="./assets/f2.jpg" alt="Final 2" />
        </div>
        <div className="final-section second">
          {showDrumroll && !showLastImage && (
            <div className="drumroll">
              <h2>🥁 🥁</h2>
            </div>
          )}
          {showLastImage && (
            <div className="last-image">
              <img src="./assets/f.png" alt="Final 3" />
            </div>
          )}
        </div>
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
