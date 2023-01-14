import React from "react"
import styled from "styled-components"
import Task from "../Task/Task"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

const Container = styled.div`
  margin: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 7px;
  width: 122.5%;
  height: 100%
  display: flex;
  flex-direction: column;
  background-color: none
`
const Title = styled.h3`
  padding: 8px;
  font-size: 3.5vh;
  font-weight: 600;
  background-image: linear-gradient(to left, #553c9a, #b393d3);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`
const TaskList = styled.div`
padding: 8px;
transition: background0-color 0.2 ease
flex-grow: 1;
min-height: 100px;
&:hover {
  border-color: lightblue;
`
// background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}

const Column = ({ column, tasks }) => {
  return (
    <Container className="test">
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {provided => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  )
}

export default Column