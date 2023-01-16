import React from "react"
import styled from "styled-components"
import Task from "../Task/Task"
import { Droppable } from "react-beautiful-dnd"
import PropTypes from 'prop-types'

const Container = styled.div`
  margin: 8px;
  border-radius: 7px;
  width: 100%;
  height: 100%
  display: flex;
  flex-direction: column;
  background-color: none
`
const Title = styled.h3`
  padding: 8px;
  font-size: 4.5vh;
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
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 7px;
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

Column.propTypes = {
  column: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired
}

export default Column