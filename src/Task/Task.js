import React, { useState } from "react"
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd"
import { deleteData } from "../apicalls"
import icon from "../images/icon.png"
import "../Task/Task.css"
import PropTypes from 'prop-types'
import Modal from "../Modal/Modal"
import { Route, Routes } from 'react-router-dom'
import { NavLink } from "react-router-dom"

const Container = styled.div`
padding: 8px;
margin-bottom: 8px;
border-radius: 7px;
background-color: none;
font-size: 2.75vh;

&:hover {
  border: 2px solid #b393d3;
  `

const Task = ({ task, index, setData, makeDNDObject }) => {

  const [modal, setModal] = useState(false)
  const [modalData, setModalData] = useState(task)

  var today = new Date()
  var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
  tomorrow.setDate(tomorrow.getDate())
  let dayTomorrow = tomorrow.getDate()
  let monthTomorrow = ("0" + (tomorrow.getMonth() + 1)).slice(-2)
  let yearTomorrow = tomorrow.getFullYear()
  let tomorrowDate = `${yearTomorrow}-${monthTomorrow}-${dayTomorrow}`

  const getDate = new Date()
  let day = getDate.getDate()
  let month = ("0" + (getDate.getMonth() + 1)).slice(-2)
  let year = getDate.getFullYear()
  let currentDate = `${year}-${month}-${day}`

  const dateToday = new Date()
  const dateTask = new Date(task.date)


  const determineAlert = () => {
    if (task.date === currentDate) {
      return true
    } else if (task.date === tomorrow) {
      return true
    } else if (dateToday > dateTask) {
      return true
    } else {
      return false
    }
  }

  const deleteTodo = () => {
    deleteData(`https://api-todos-boglmsk6z-nalito223.vercel.app/todos/${task.id}`)
      .then(() => window.location.reload(true))
  }

  const toggleModal = () => {
    setModalData(task)
    setModal(!modal)
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* original NavLink for <p> below to={`edit/${task.id}`} */}
          <div onClick={toggleModal} className="edit-link" >
            <p className="edit-link">{task.content}</p>
          </div>
          <p className="content">
            {determineAlert() &&
              <img
                className='icon-container'
                src={icon}
              />}
            {`Due: ${task.date}`}
          </p>
          <button onClick={(event) => deleteTodo()} className="deleteButton">Delete</button>
          {modal && <Modal task={modalData} toggleModal={toggleModal} />}
        </Container>
      )}
    </Draggable>

  )
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}

export default Task