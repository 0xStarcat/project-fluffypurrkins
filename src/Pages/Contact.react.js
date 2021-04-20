import React, { Component } from 'react'
import PageHeader from './PageHeader'

import ReactGA from 'react-ga'

import './Style/page.scss'
export default class Contact extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <PageHeader />
        <main id="maincontent" className="page">
          <section className="section">
            <div className="sub-section text-body">
              <p className="sub-header linky large-text">
                <ReactGA.OutboundLink
                  eventLabel="Github"
                  to="https://github.com/0xStarcat"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Github
                </ReactGA.OutboundLink>
              </p>
            </div>
            <div className="sub-section text-body">
              <p className="sub-header linky large-text">
                <ReactGA.OutboundLink
                  eventLabel="Mail"
                  to="mailto:jadeahking@gmail.com"
                  rel="noopener noreferrer"
                  target="_top"
                >
                  jadeahking@gmail.com
                </ReactGA.OutboundLink>
              </p>
            </div>
            <div className="sub-section text-body">
              <p className="sub-header large-text">
                <ReactGA.OutboundLink
                  eventLabel="LinkedIn"
                  to="https://www.linkedin.com/in/ahking-j/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </ReactGA.OutboundLink>
              </p>
            </div>
          </section>
          <a href="#nav" className="sr-link">
            Skip to navigation
          </a>
        </main>
      </div>
    )
  }
}
