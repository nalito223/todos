import React, { useState, useEffect } from 'react'
import { getData, postData, deleteData, putData, } from "../apicalls"


const Form = (props) => {
  const [content, setContent] = useState('')
  const [column, setColumn] = useState('column-1')
  const [date, setDate] = useState('2018-07-22')
  
  const clearInputs = () => {
    setContent("")
    setColumn("column-1")
    setDate("")
  }

  const submitTodo = event => {
    event.preventDefault()
    const newTodo = {
      id: String(Date.now()),
      content: content || 'No title',
      date: date || "2018-07-22",
      status: column,
      destination: { droppableId: column, index: 25 }
    }
    console.log("New Todo", newTodo)
    postData(newTodo, "http://localhost:3001/todos")
    props.addTask(newTodo)
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
        value={date}
        onChange={event => setDate(event.target.value)}
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