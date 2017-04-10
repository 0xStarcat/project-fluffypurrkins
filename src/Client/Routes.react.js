import React, {Component} from 'react'
// import { BrowserRouter, Route } from 'react-router-dom'
import {IndexRoute} from 'react-router'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import AsciiFaceSizeWrapper from './AsciiFace/AsciiFaceSizeWrapper.react'
import About from './Pages/About.react'
import Code from './Pages/Code.react'
import CV from './Pages/CV.react'

export default class Routes extends Component {
  constructor() {
    super()
  }

  render() {
    return(
      <Router>
        <div>
          <Route exact path='/' component={AsciiFaceSizeWrapper} />
          <Route path="/about" component={About} />
          <Route path="/code" component={Code} />
          <Route path="/cv" component={CV} />
        </div>
      </Router>
    )
  }
}
