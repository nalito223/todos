import React from "react"
import "../Error/Error.css"
import { NavLink } from "react-router-dom"

const Error = () => {
  return (
    <div className="Error-container">
      <h1 className="Error-header">404: Page not found</h1>
      <NavLink to="/">
        <button className="Error-button">Return home</button>
      </NavLink>
    </div>
  )
}

export default Error