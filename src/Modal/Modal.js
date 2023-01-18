import React, { useState, useEffect } from 'react'
import "../Modal/Modal.css"
import { NavLink } from "react-router-dom"
import ReactPlayer from 'react-player'

const Modal = ({ task, toggleModal }) => {
  return (
    <div>
      <div className="modal">
        <NavLink to="/todos"><div className='overlay' onClick={toggleModal}> </div></NavLink>
        <div className='modal-content'>
          <p>Title: {task.content}</p>
          <p>Date: {task.date}</p>
          <NavLink to="/todos">
            <button
              className='close-modal'
              onClick={toggleModal}>
              Close
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Modal