import React from 'react'
import { Router, Route } from 'react-router-dom'
import AsciiContainer from './Containers/AsciiContainer.react'
import About from './Pages/About.react'
import Contact from './Pages/Contact.react'
import CV from './Pages/CV.react'
import Analytics from './Pages/Analytics.react'
import Canary from './Pages/Canary.react'
import Projects from './Pages/Projects'
import WorkDescriptions from './Pages/WorkDescriptions'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'

export default function Routes() {
  const history = createBrowserHistory()

  history.listen(location => {
    // console.log('!!!', location, process.env.ENVIRONMENT)
    ReactGA.initialize(process.env.REACT_GA_CODE, {
      debug: process.env.ENVIRONMENT === 'development'
    })
    ReactGA.set({ page: location.pathname }) // Update the user's current page
    ReactGA.pageview(location.pathname) // Record a pageview for the given page
  })

  return (
    <Router history={history}>
      <div>
        <Route exact={true} path="/" component={AsciiContainer} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/cv" component={CV} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/canary" component={Canary} />
        <Route path="/projects" component={Projects} />
        <Route path="/work" component={WorkDescriptions} />
      </div>
    </Router>
  )
}
