import React, { useState, useEffect } from 'react'
import { getData, postData, deleteData, putData, } from "../apicalls"


const Form = (props) => {
  const [content, setContent] = useState('')
  const [column, setColumn] = useState('column-1')
  const [date, setDate] = useState('')

  const clearInputs = () => {
    setContent("")
    setColumn("column-1")
    setDate("")
  }

  const getDate = new Date()
  console.log('NEW DATE', getDate)
  let day = getDate.getDate()
  let month = ("0" + (getDate.getMonth() + 1)).slice(-2)
  let year = getDate.getFullYear()
  let currentDate = `${year}-${month}-${day}`
  console.log("DATE", currentDate)

  const submitTodo = event => {
    event.preventDefault()
    const newTodo = {
      id: String(Date.now()),
      content: content || 'No title',
      date: date || currentDate,
      status: column,
      destination: { droppableId: column, index: 25 }
    }
    console.log("New Todo", newTodo)
    postData(newTodo, "http://localhost:3001/todos")
    window.location.reload(true)
    clearInputs()
  }


  return (
    <form>
      <input
        placeholder="Type a todo..."
        type="text"
        name="content"
        value={content}
        onChange={event => setContent(event.target.value)}
      ></input>

      <input
        type="date"
        name="date"
        value={currentDate}
        onChange={event => setDate(event.target.value)}
        min={currentDate}
        data-date-format="YYYY-MMMM-DD"
      ></input>

      <select
        name="column"
        id="column"
        value={column}
        onChange={event => setColumn(event.target.value)}
      >
        <option value="column-1">Backlog</option>
        <option value="column-2">On deck</option>
        <option value="column-3">In progress</option>
        <option value="column-4">Done</option>
      </select>

      <button
        onClick={event => submitTodo(event)}
      >Add</button>
    </form>
  )
}

export default Form