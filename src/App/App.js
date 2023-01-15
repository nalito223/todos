
import './App.css'
import { Route, Routes, NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getData, postData, deleteData, putData, } from "../apicalls"
// import boardObject from "../Board/Board"
import boardObject from "../initial-data"
import Column from "../Column/Column"
import '@atlaskit/css-reset'
import styled from "styled-components"
import { DragDropContext } from 'react-beautiful-dnd'
import Form from "../Form/Form"

const Container = styled.div`
  display: flex;
  height: 75vh;
  width: 90vw;
`

function App() {

  // const [run, setRun] = useState(false)
  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState(boardObject)
  const [randomState, setRandomState] = useState()
  // const [newTask, setNewTask] = useState({})

  const reset = async (newTodo) => {
    // setData([])
    // setInitialData(boardObject)

    window.location.reload(true)
    // try {
    //   const response = await getData("http://localhost:3001/todos")
    //   setData(response)
    //   makeDNDObject(response)
    // }
    // catch (error) {
    //   console.log(error)
    // }
    // initApp()
    // let id = newTodo.id
    // let newInitialData = {...initialData}
    // initialData.tasks.newTodo = newTodo
    // newInitialData.tasks[id] = newTodo
    // console.log("initialData", newInitialData)
    // setInitialData(newInitialData)
    // setData(newInitialData.tasks)
    // makeDNDObject(newInitialData.tasks)
    // return initialData
  }

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
      // XX
      // boardObject.tasks[String(task.id)] = task
      initialData.tasks[String(task.id)] = task

    })
    // forceUpdate()
    // XX
    // setInitialData(initialData)
  }


  const initApp = async () => {
    try {
      const response = await getData("http://localhost:3001/todos")
      setData(response)
      // setInitialData(boardObject)
      makeDNDObject(response)
      // postData(body, "http://localhost:3001/todos").then((response) => console.log("POST RESPONSE", response))

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
      //unclear if the + 1 is needed. Added to solve indexes of -1 in the server. Didn't add to other conditional.
      Object.keys(object.tasks).forEach((key) => {
        object.tasks[key].destination.index = object.columns[destination.droppableId].taskIds.indexOf(object.tasks[key].id) + 1
      })

      // console.log("LOOK HERE 2", object.tasks)
      Object.keys(object.tasks).forEach((key) => {
        let newPost = object.tasks[key]
        // console.log("newPost 2", newPost)
        putData(newPost, `http://localhost:3001/todos/${object.tasks[key].id}`)
        // console.log("new post 2 AFTER", newPost)
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
    // console.log("NEW FINISH", newFinish)
    // console.log("DESTINATION", destination)
    // console.log("SOURCE", source)
    // console.log("DRAGGABLE ID", draggableId)
    // console.log("NEW STATE", newState)

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
      // console.log("LOOK HERE 1", newPost)
      putData(newPost, `http://localhost:3001/todos/${object.tasks[key].id}`)
      // .then((response) => console.log("PUT RESPONSE",response))

    })
    setInitialData(newState)

  }

  return (
    <main className="App-container">
      {/* <h1 className="App-header">Todos</h1>
      <Form initApp={initApp} initialData={initialData} setInitialData={setInitialData} makeDNDObject={makeDNDObject} setData={setData} reset={reset} /> */}
      <Routes>
        <Route
          path="/todos"
          element={
            <DragDropContext onDragEnd={onDragEnd}>
              <h1 className="App-header">Todos</h1>
              <Form initApp={initApp} initialData={initialData} setInitialData={setInitialData} makeDNDObject={makeDNDObject} setData={setData} reset={reset} />
              <Container>
                {initialData.columnOrder.map(columnId => {
                  const column = initialData.columns[columnId]
                  const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
                  return <Column key={column.id} column={column} tasks={tasks} />
                })}
              </Container>
            </DragDropContext>}
        />



      </Routes>
    </main>
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
