
import './App.css'
import { Route, Routes, NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getData, postData, deleteData, putData } from "../apicalls"
// import boardObject from "../Board/Board"
import boardObject from "../initial-data"
import Column from "../Column/Column"
import '@atlaskit/css-reset'
import styled from "styled-components"
import { DragDropContext } from 'react-beautiful-dnd'

const Container = styled.div`
  display: flex;
  height: 75vh;
  width: 90vw;
`

function App() {
  const body =
    { content: 'Do thing 5', date: '2018-07-22', status: 'on deck', }


  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState(boardObject)

  const makeDNDObject = (response) => {
    console.log("data", data)
    response.forEach((task) => {
      if (task.status.toLowerCase() === "backlog") {
        initialData.columns["column-1"].taskIds.push(String(task.id))
      } else if (task.status.toLowerCase() === "on deck") {
        initialData.columns["column-2"].taskIds.push(String(task.id))
      } else if (task.status.toLowerCase() === "in progress") {
        initialData.columns["column-3"].taskIds.push(String(task.id))
      } else if (task.status.toLowerCase() === "done") {
        initialData.columns["column-4"].taskIds.push(String(task.id))
      }
      boardObject.tasks[String(task.id)] = task
    })
    console.log("boardObject", boardObject)
    setInitialData(boardObject)
  }

  // useEffect(() => {
  //   // setInitialData(initialData1)
  //   getData("http://localhost:3001/todos").then((response) => setData(response))
  //   postData(body, "http://localhost:3001/todos").then((response) => console.log("POST", response))
  //   makeDNDObject()
  //   // putData(bodyPut, "http://localhost:3001/todos/1").then((response) => console.log("PUT",response))
  // }, [])

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
    console.log("data has loaded!", data)
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
    setInitialData(newState)
  }

  return (
    <div className="App-container">
      {console.log("data in return",data)}
      <h1 className="App-header">Todos</h1>
      <form>
        <input placeholder="Type a todo..."></input>
        <input type="date"></input>
        <select><option>Backlog</option></select>
        <button>Add</button>
      </form>
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <Container>
          {initialData.columnOrder.map(columnId => {
            const column = initialData.columns[columnId]
            console.log("COLUMN.TASKIds",column.taskIds)
            const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>
    </div>
  )
}

export default App


// return (
//   <div className="app-container">
//     <header className="app-header">
//       <h1>App Name</h1>
//       <Board data={data} />
//     </header>
//   </div>
// )
