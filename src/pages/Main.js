import React from "react"
import Login from "./Login"
import AdminIndex from "./AdminIndex"

import {BrowserRouter as Router,Route} from 'react-router-dom'

function Main(){
  return(
    <Router>
      <Route path='/' exact component={Login}></Route>
      <Route path='/index/' component={AdminIndex}></Route>
    </Router>
  )
}

export default Main