import { useState } from 'react'
import Board from './components/Board'
import './styles/App.css'

function App() {
  return (
    <>
      <h1>Memory Game</h1>
      <h2>Get points by clicking on an image but don't click on any more than once!
      </h2>
      <Board />
    </>
  )
}

export default App
