import React from "react"
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd"
import { getData, postData, deleteData, putData, } from "../apicalls"

const Container = styled.div`
border: 1px solid lightgrey;
padding: 8px;
border-radius: 2px;
margin-bottom: 8px;
background-color: white;
`
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
        <p>{task.date}</p>
        <button onClick={(event) => deleteTodo()}>Delete</button>
        </Container>
      )}
    </Draggable>
  )
}

export default Task