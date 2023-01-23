import React from "react"
import "../Login/Login.css"
import { NavLink } from "react-router-dom"
import ReactPlayer from 'react-player'

const Login = () => {
  return (
    <div className="Login-container">
      {/* <div className="react-player-container"> */}
        <center><h1 className="Login-header">Get started with Todos</h1></center>
        <ReactPlayer
          // url='https://vimeo.com/789586072'
          url="https://vimeo.com/791727268"
          controls
          className="react-player"
          muted={true}
          playing={true}
          loop={true}
        />
        <NavLink to="/todos" className="Login-button-link">
          <div className="Login-button" >Get started</div>
        </NavLink>
      {/* </div> */}
    </div>
  )
}

export default Login 