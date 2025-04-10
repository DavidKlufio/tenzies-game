import React from 'react'
import { useState, useRef, useEffect } from 'react'
import './App.css'
import Dice from './components/Dice'
import { nanoid } from 'nanoid/non-secure'
import ReactConfetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6), 
        id: nanoid(),
        isHeld: false
      }))
  }

  const diceElements = dice.map(dieObj => <Dice 
          hold={() => hold(dieObj.id)} 
          id={dieObj.id}
          key={dieObj.id} 
          isHeld={dieObj.isHeld} 
          value={dieObj.value}
  />)

  function handleRoll(event) {
    event.preventDefault
    if(!gameWon) {
      setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)}))
    }else {
      setDice(generateAllNewDice())
    }
  }

  function hold(id) {
      setDice(prevDice => prevDice.map(die => {
        return id === die.id ? {...die, isHeld: !die.isHeld} : die
      }))
  }

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)

  useEffect(() => {
    if(gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  return (
    <>
      <main>
      {gameWon && <ReactConfetti />}
      <div aria-live='polite' className='sr-only'>
        {gameWon && <p>Congratulations! You won! Press "New Game" to restart the game!</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze its current value between rolls.</p>
        <div>
          {diceElements}
        </div>
        <button ref={buttonRef} onClick={handleRoll} className='roll-button'>{gameWon ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
