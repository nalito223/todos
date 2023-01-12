import React from "react"
import styled from "styled-components"
import Task from "../Task/Task"
import { DragDropContext, Droppable } from "react-beautiful-dnd"

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 122.5%;
  height: 100%

  display: flex;
  flex-direciton: column;
`
const Title = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
padding: 8px;
transition: background0-color 0.2 ease
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')}
flex-grow: 1;
min-height: 100px;
`

const Column = ({ column, tasks }) => {
  return (
    <Container>
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