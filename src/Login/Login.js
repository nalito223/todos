import React from "react"
import "../Login/Login.css"
import { NavLink } from "react-router-dom"
import ReactPlayer from 'react-player'

const Login = () => {
  return (
    <div className="Login-container">
      <div className="react-player-container">
        <h1 className="Login-header">Get started with Todos</h1>
        <ReactPlayer
          url='https://vimeo.com/789586072'
          controls
          className="react-player"
          muted={true}
          playing={true}
          loop={true}
        />
        <NavLink to="/todos">
          <button className="Login-button" >Get started</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Login 