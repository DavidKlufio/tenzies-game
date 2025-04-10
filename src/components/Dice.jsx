import React from 'react'

export default function Dice(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white"  
  }

  return (
    <>
      <button 
        onClick={props.hold} 
        style={styles} 
        className='dice-button'
        aria-pressed={props.isHeld}
        aria-label={`a die of value ${props.value}, 
        ${props.isHeld ? "Held" : "not held"}`}
      >{props.value} </button>
    </>
  )
}
