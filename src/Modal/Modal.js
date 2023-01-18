import React, { useState, useEffect } from 'react'

import "../Modal/Modal.css"

import { NavLink } from "react-router-dom"
import ReactPlayer from 'react-player'

const Modal = ({ task, toggleModal }) => {
  console.log("Made it to modal!", task)
  const [modal, setModal] = useState(false)
  // const toggleModal = () => {
  //   setModal(!modal)
  // }
  return (
    <div>
      {/* <button
        className="btn-modal"
        onClick={toggleModal}
      >Open
      </button> */}
      {/* {modal && */}
        <div className="modal">
          <div className='overlay' onClick={toggleModal}> </div>
          <div className='modal-content'>
            <p>Title:
             
                {task.content}
            
            </p>
            <p>
              Date:
            
               
                {task.date}

              
            </p>
            <NavLink to="/todos">
            <button
              className='close-modal'
              onClick={toggleModal}>
              Close
            </button>
            </NavLink>
          </div>
        </div>
{/* } */}

    </div>
  )
}

export default Modal