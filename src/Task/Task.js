import React from "react"
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd"
import { getData, postData, deleteData, putData, } from "../apicalls"

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
        <p>{`Due: ${task.date}`}</p>
        <button onClick={(event) => deleteTodo()}>Delete</button>
        </Container>
      )}
    </Draggable>
  )
}

export default Task