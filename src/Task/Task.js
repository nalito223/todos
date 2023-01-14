import React from "react"
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd"
import { getData, postData, deleteData, putData, } from "../apicalls"
import icon from "../images/icon.png"
import "../Task/Task.css"


const Container = styled.div`
border: 2px solid rgba(255, 255, 255, 0.2);
padding: 8px;
margin-bottom: 8px;
border-radius: 7px;
background-color: none;
&:hover {
  border-color: #b393d3;
`
// background-color: rgba(255, 255, 255, 0.05);
const Task = ({ task, index }) => {
  var today = new Date()
  var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000))
  tomorrow.setDate(tomorrow.getDate())
  let dayTomorrow = tomorrow.getDate()
  let monthTomorrow = ("0" + (tomorrow.getMonth() + 1)).slice(-2)
  let yearTomorrow = tomorrow.getFullYear()
  let tomorrowDate = `${yearTomorrow}-${monthTomorrow}-${dayTomorrow}`

  console.log("TOMORROW", tomorrowDate)

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
  console.log("TODAY", currentDate)
  console.log("TASK DATE", task.date)

  const deleteTodo = (event) => {
    console.log("DELETING")
    deleteData(`http://localhost:3001/todos/${task.id}`)
    window.location.reload(true)
  }
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <p>{task.content}</p>
          <p className="content">
            {determineAlert() &&
              <img
                className='icon-container'
                src={icon}
              />}
            {console.log("TEST FUNCTION", determineAlert())}
            {`Due: ${task.date}`}
          </p>
          <button onClick={(event) => deleteTodo()} className="deleteButton">Delete</button>
        </Container>
      )}
    </Draggable>
  )
}

export default Task