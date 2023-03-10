import React, { useState } from 'react'
import { postData } from "../apicalls"
import "../Form/Form.css"

const Form = () => {

  const getDate = new Date()
  let day = getDate.getDate()
  let month = ("0" + (getDate.getMonth() + 1)).slice(-2)
  let year = getDate.getFullYear()
  let currentDate = `${year}-${month}-${day}`

  const [contentData, setContent] = useState("")
  const [columnData, setColumn] = useState("column-1")
  const [dateData, setDate] = useState(currentDate)

  const clearInputs = () => {
    setContent("")
    setColumn("column-1")
    setDate(currentDate)
  }

  const submitTodo = event => {
    event.preventDefault()
    const newTodo = {
      id: String(Date.now()),
      content: contentData || "No title",
      date: dateData,
      status: columnData,
      destination: { droppableId: columnData, index: 25 }
    }

    // data.push(newTodo)
    // console.log("FORM",data)
    // makeDNDObject(data)
    // setData(Date.now())

    postData(newTodo, "https://api-todos.vercel.app/todos")
      .then(() => window.location.reload(true))
    clearInputs()
  }

  return (
    <form className="Form-container">

      <input
        className="contentInput"
        placeholder="Make a todo..."
        type="text"
        name="content"
        value={contentData}
        onChange={event => setContent(event.target.value)}
      ></input>

      <input
        className="dateInput"
        type="date"
        name="date"
        value={dateData}
        onChange={event => setDate(event.target.value)}
        min={currentDate}
        data-date-format="YYYY-MMMM-DD"
      ></input>

      <select
        className="columnInput"
        name="column"
        id="column"
        value={columnData}
        onChange={event => setColumn(event.target.value)}
      >
        <option value="column-1">Backlog</option>
        <option value="column-2">On deck</option>
        <option value="column-3">In progress</option>
        <option value="column-4">Done</option>
      </select>

      <button
        className="addButton"
        onClick={event => submitTodo(event)}
      >Add</button>

    </form>
  )
}

export default Form