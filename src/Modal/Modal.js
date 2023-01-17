import React, { useState, useEffect } from 'react'

import "../Modal/Modal.css"

import { NavLink } from "react-router-dom"
import ReactPlayer from 'react-player'

const Modal = ({ task, index }) => {
  const [modal, setModal] = useState(false)
  const toggleModal = () => {
    setModal(!modal)
  }
  return (
    <div>
      <button
        className="btn-modal"
        onClick={toggleModal}
      >
        Open
      </button>
      {modal &&
        <div className="modal">
          <div
            className='overlay'
            onClick={toggleModal}>
          </div>
          <div className='modal-content'>
            <p>
              Title:
              <input className="Modal-content-input"
                value={task.content}></input>
                  
            </p>
            <p>
            Date: 
            <input className="Modal-content-input"
                value={task.date}></input>

            </p>
            <button
              className='close-modal'
              onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      }

    </div>
  )
}

export default Modal