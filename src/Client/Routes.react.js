import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import AsciiContainer from './Containers/AsciiContainer.react'
import About from './Pages/About.react'
import Contact from './Pages/Contact.react'
import CV from './Pages/CV.react'
import Analytics from './Pages/Analytics.react'
import Canary from './Pages/Canary.react'
import Projects from './Pages/Projects'

export default class Routes extends Component {
  render() {
    return ( <Router>
      <div>
        <Route exact={true} path="/" component={AsciiContainer}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/cv" component={CV}/>
        <Route path="/analytics" component={Analytics}/>
        <Route path="/canary" component={Canary}/>
        <Route path="/projects" component={Projects}/>
      </div>
    </Router> )
  }
}
