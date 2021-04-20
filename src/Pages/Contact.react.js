import React, { Component } from 'react'
import PageHeader from './PageHeader'
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
                <a href="https://github.com/0xStarcat" target="_blank" rel="noopener noreferrer">
                  Github
                </a>
              </p>
            </div>
            <div className="sub-section text-body">
              <p className="sub-header linky large-text">
                <a href="mailto:jadeahking@gmail.com" target="_top">
                  jadeahking@gmail.com
                </a>
              </p>
            </div>
            <div className="sub-section text-body">
              <p className="sub-header large-text">
                <a
                  href="https://www.linkedin.com/in/ahking-j/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
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
