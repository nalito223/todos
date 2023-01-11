import './Board.css'
import React, { useState, useEffect } from 'react'

const Board = () => {
  const appendBacklog = (event) => {
    console.log("dragging over container 1!")
    event.preventDefault()
  }
  return (
    <div className="board-container">
      <div className="columns" onDragOver={((event) => appendBacklog(event))}>
        <h2>Backlog</h2>
        <div className="card" draggable="true" onDragStart={() => console.log("dragging!")}>TEST</div>
        <div className="card" draggable="true"></div>
        <div className="card" draggable="true"></div>
        <div className="card" draggable="true"></div>
      </div>
      <div className="columns"  onDragOver={() => console.log("dragging over container 2!")}>
      <h2>On deck</h2>
      <div className="card" draggable="true"></div>
      </div>
      <div className="columns" onDragOver={() => console.log("dragging over container 3!")}>
      <h2>In progress</h2>
      <div className="card" draggable="true"></div>
      </div>
      <div className="columns" onDragOver={() => console.log("dragging over container 4!")}>
      <h2>Complete</h2>
      <div className="card" draggable="true"></div>
      </div>
    </div>
  )
}

export default Board