import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [noClicks, setNoClicks] = useState(0)
  const [accepted, setAccepted] = useState(false)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const zoneRef = useRef(null)
  const noButtonRef = useRef(null)

  const noDisabled = noClicks >= 4
  const yesScale = 1 + Math.min(noClicks, 4) * 0.16

  const moveNoButton = () => {
    if (!zoneRef.current || !noButtonRef.current) return

    const zoneRect = zoneRef.current.getBoundingClientRect()
    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const maxX = Math.max(0, zoneRect.width - buttonRect.width)
    const maxY = Math.max(0, zoneRect.height - buttonRect.height)

    const x = Math.random() * maxX
    const y = Math.random() * maxY
    setNoPosition({ x, y })
  }

  useEffect(() => {
    if (noDisabled) {
      moveNoButton()
    }
  }, [noDisabled])

  const handleNoClick = () => {
    if (noDisabled) return
    setNoClicks((prev) => prev + 1)
  }

  return (
    <div className="scene">
      <div className="nebula" aria-hidden="true"></div>
      <div className="grid" aria-hidden="true"></div>
      <div className="orb orb-one" aria-hidden="true"></div>
      <div className="orb orb-two" aria-hidden="true"></div>
      <div className="orb orb-three" aria-hidden="true"></div>

      <main className="holo-card">
        <div className="card-glow" aria-hidden="true"></div>
        <div className="card-frame" aria-hidden="true"></div>

        <header className="card-header">
          <span className="badge">Love Quest // Neon Edition 💘</span>
          <h1>Will you be my Valentine?</h1>
          <p className="subtitle">
            Warning: playful chaos, sparkly energy, and a 100% chance of happy
            hearts.
          </p>
        </header>

        {!accepted ? (
          <section className="question-block">
            <div className="button-zone" ref={zoneRef}>
              <button
                className="btn yes"
                type="button"
                onClick={() => setAccepted(true)}
                style={{ transform: `translateZ(30px) scale(${yesScale})` }}
              >
                Yes, duh 💖
              </button>

              <button
                ref={noButtonRef}
                className={`btn no ${noDisabled ? 'evasive' : ''}`}
                type="button"
                onClick={handleNoClick}
                onMouseEnter={noDisabled ? moveNoButton : undefined}
                onMouseMove={noDisabled ? moveNoButton : undefined}
                onTouchStart={noDisabled ? moveNoButton : undefined}
                aria-disabled={noDisabled}
                style={
                  noDisabled
                    ? {
                        left: 0,
                        top: 0,
                        transform: `translate(${noPosition.x}px, ${noPosition.y}px)`
                      }
                    : undefined
                }
              >
                No, try me 😜
              </button>
            </div>

            <div className="status">
              <h2 className="question-text">Pick wisely.</h2>
              <p className="hint">
                {noDisabled
                  ? 'No button is now in stealth mode. 🕶️'
                  : `No presses: ${noClicks} / 4`}
              </p>
            </div>

            <div className="emoji-row" aria-hidden="true">
              💞 ✨ 🌹 💫 💓
            </div>
          </section>
        ) : (
          <section className="yes-block">
            <h2>Mission complete. You said yes! 💍</h2>
            <p className="subtitle">
              Thank you for making my heart go full neon fireworks. You are my
              favorite person, my best laugh, and my forever Valentine.
            </p>

            <div className="gif-grid">
              <div className="gif-card">
                <img src="/gifs/love-1.gif" alt="Cute hearts gif" />
              </div>
              <div className="gif-card">
                <img src="/gifs/love-2.gif" alt="Happy hug gif" />
              </div>
              <div className="gif-card">
                <img src="/gifs/love-3.gif" alt="Sparkly love gif" />
              </div>
            </div>

            <div className="emoji-row" aria-hidden="true">
              💖 💘 💝 🥰 😘 🌸
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
