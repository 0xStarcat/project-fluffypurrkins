import React, { Component } from 'react'
import PageHeader from './PageHeader'
import Resume from '@images/jade-ahking-resume.pdf'
import './Style/cv.scss'
import './Style/page.scss'

import ReactGA from 'react-ga'

export default class CV extends Component {
  render() {
    return (
      <div className="full-height">
        <PageHeader />
        <main id="maincontent" className="cv page full-height">
          <section className="section full-height">
            <ReactGA.OutboundLink
              className="cv__download"
              eventLabel="CV Open"
              to={Resume}
              target="_blank"
            >
              Open Resume PDF
            </ReactGA.OutboundLink>
            <embed src={Resume} type="application/pdf" />
          </section>
        </main>
      </div>
    )
  }
}
