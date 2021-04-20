import React, { useState } from 'react'
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
import { trackProjectOpen } from './utilities'
import ReactGA from 'react-ga'
import { Helmet } from 'react-helmet'
import favicon from '@images/favicon.png'
import selfie from '@images/selfie.jpg'

export default function Routes() {
  const [prevPath, setPrevPath] = useState(null)
  const history = createBrowserHistory()

  history.listen(location => {
    if (location.pathname !== prevPath) {
      // only trigger when changing paths / pages
      ReactGA.set({ page: location.pathname }) // Update the user's current page
      ReactGA.pageview(location.pathname) // Record a pageview for the given page
    } else {
      trackProjectOpen(location)
    }
    setPrevPath(location.pathname)
  })

  return (
    <div>
      <Helmet>
        <title>
          {`Jade's portfolio - ${location.pathname.toLowerCase().replace(/[^a-z]/gi, '') ||
            'home'}`}
        </title>
        <meta property="og:image" content={selfie} />
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      <Router history={history}>
        <div>
          <Route exact={true} path="/" component={AsciiContainer} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/cv" component={CV} />
          <Route path="/projects" component={Projects} />
          <Route path="/work" component={WorkDescriptions} />
        </div>
      </Router>
    </div>
  )
}
