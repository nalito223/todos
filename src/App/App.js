
import './App.css'
import { Route, Routes, NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { getData, postData, deleteData, putData } from "../apicalls"
import Board from "../Board/Board"
import initialData1 from "../initial-data"
import Column from "../Column/Column"
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'

function App() {
  const body =
    { title: 'title 1', description: 'This is a description. This is a task that needs to be done', date: '2018-07-22', status: 'backlog', url: 'https://httpstatusdogs.com/img/200.jpg', asignees: ["none"] }

  // const bodyPut =
  // { title: 'PUT WORKED', description: 'This is a description. This is a task that needs to be done', date: '2018-07-22', status: 'backlog', url: 'https://httpstatusdogs.com/img/200.jpg', asignees: ["none"] }

  // const bodyPut = "PUT WORKED"

  const [data, setData] = useState([])
  const [initialData, setInitialData] = useState(initialData1)


  useEffect(() => {
    // setInitialData(initialData1)
    getData("http://localhost:3001/todos").then((response) => setData(response)).then(() => console.log("DATA", data))
    postData(body, "http://localhost:3001/todos").then((response) => console.log("POST", response))
    // putData(bodyPut, "http://localhost:3001/todos/1").then((response) => console.log("PUT",response))
  }, [])

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = initialData.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newColumn.id]: newColumn,
      },
    };

    setInitialData(newState);
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
    >
      {initialData.columnOrder.map(columnId => {
        const column = initialData.columns[columnId]
        const tasks = column.taskIds.map(taskId => initialData.tasks[taskId])
        return <Column key={column.id} column={column} tasks={tasks} />
      })}
    </DragDropContext>
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
