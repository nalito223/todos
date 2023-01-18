import './App.css'
import { NavLink } from "react-router-dom"
import { Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getData, putData, } from "../apicalls"
import boardObject from "../initial-data"
import Column from "../Column/Column"
import '@atlaskit/css-reset'
import styled from "styled-components"
import { DragDropContext } from 'react-beautiful-dnd'
import Form from "../Form/Form"
import Login from "../Login/Login"
import Error from "../Error/Error"
import Modal from "../Modal/Modal"

const Container = styled.div`
  display: flex;
  height: 75vh;
  width: 90vw;
`
function App() {

  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState(boardObject)
  const [randomState, setRandomState] = useState()

  const makeDNDObject = (response) => {
    const sorted = [...response]
    sorted.sort((a, b) => {
      return a.destination.index - b.destination.index
    })
    sorted.forEach((task) => {
      if (task.destination.droppableId === "column-1") {
        initialData.columns["column-1"].taskIds.push(String(task.id))
      } else if (task.destination.droppableId === "column-2") {
        initialData.columns["column-2"].taskIds.push(String(task.id))
      } else if (task.destination.droppableId === "column-3") {
        initialData.columns["column-3"].taskIds.push(String(task.id))
      } else if (task.destination.droppableId === "column-4") {
        initialData.columns["column-4"].taskIds.push(String(task.id))
      } else {
        console.log("ISSUE AT DNDOBJECT()")
      }
      initialData.tasks[String(task.id)] = task
    })
  }

  const initApp = async () => {
    try {
      const response = await getData("http://localhost:3001/todos")
      setData(response)
      makeDNDObject(response)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    initApp()
  }, [])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = initialData.columns[source.droppableId]
    const finish = initialData.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        },

      }
      let object = newState
      object.tasks[draggableId].destination = destination
      Object.keys(object.tasks).forEach((key) => {
        object.tasks[key].destination.index = object.columns[destination.droppableId].taskIds.indexOf(object.tasks[key].id) + 1
      })

      Object.keys(object.tasks).forEach((key) => {
        let newPost = object.tasks[key]
        putData(newPost, `http://localhost:3001/todos/${object.tasks[key].id}`)
      })
      setInitialData(newState)
      return
    }
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    let object = newState
    object.tasks[draggableId].destination = destination

    Object.keys(object.tasks).forEach((key) => {
      Object.keys(object.columns).forEach((columnId) => {
        object.columns[columnId].taskIds.includes(object.tasks[key].id)
        if (object.columns[columnId].taskIds.includes(object.tasks[key].id)) {
          object.tasks[key].destination.index = Number(object.columns[columnId].taskIds.indexOf(String(object.tasks[key].id)))
        }
      })
    })

    Object.keys(object.tasks).forEach((key) => {
      let newPost = object.tasks[key]
      putData(newPost, `http://localhost:3001/todos/${object.tasks[key].id}`)

    })
    setInitialData(newState)
  }

  return (
    <main className="App-container">
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/todos"
          element={
            <DragDropContext onDragEnd={onDragEnd}>
              <NavLink to="/" className="home-link">
                <h1 className="App-header"  >Todos</h1>
              </NavLink>
              <Form />
              <Container>
                {initialData.columnOrder.map(columnId => {
                  const column = initialData.columns[columnId]
                  const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
                  return <Column key={column.id} column={column} tasks={tasks} />
                })}
              </Container>
            </DragDropContext>}
        />
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </main>
  )
}

export default App
{/* <Route path="/modal" element={<Modal/>}/> */}