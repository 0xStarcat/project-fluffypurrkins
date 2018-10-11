import React, { Component } from 'react'
import PageHeader from './PageHeader'
import './Style/cv.scss'
import './Style/page.scss'
export default class CV extends Component {
  render() {
    return (
      <div>
        <PageHeader />
        <div className="cv page">
          <section>
            <h2 className="section-header">Work Experience</h2>
            <div className="sub-section">
              <h4 className="title-header">
                Data Automatica, LLC
                <span className="sub-header"> - current</span>
              </h4>
              <p className="sub-header">Independent tech consultant</p>
            </div>
            <div className="sub-section">
              <h4 className="title-header">
                Everplans
                <span className="sub-header" />
              </h4>
              <p className="sub-header">Software Engineer</p>
            </div>
            <div className="sub-section">
              <h4 className="title-header">Hartford Hospital</h4>
              <p className="sub-header">Emergency Room R.N.</p>
            </div>

            <hr />
          </section>

          <section>
            <h2 className="section-header">Code/Tech Stuff</h2>
            <div className="sub-section">
              <h4 className="title-header">Markup | Scripting | Programming Languages</h4>
              <div className="skill-lists">
                <ul>
                  <li>HTML</li>
                  <li>Markdown</li>
                  <li>CSS/SASS</li>
                </ul>
                <ul>
                  <li>Javascript / ES6</li>
                  <li>Ruby</li>
                  <li>Python</li>
                </ul>
              </div>
            </div>
            <div className="sub-section">
              <h4 className="title-header">Frameworks | Libraries</h4>
              <div className="skill-lists">
                <ul>
                  <li>React.js</li>
                  <li>Ruby on Rails</li>
                  <li>Node.js</li>
                </ul>
                <ul>
                  <li>Flask</li>
                </ul>
              </div>
            </div>
            <div className="sub-section">
              <h4 className="title-header">DevOps | Architecture | Databases</h4>
              <div className="skill-lists">
                <ul>
                  <li>Git / Github / version control</li>
                  <li>Travis & continuous Integration</li>
                  <li>Docker</li>
                  <li>Linux system administration</li>
                </ul>
                <ul>
                  <li>Amazon Web Services</li>
                  <li>Heroku</li>
                  <li>SQL databases</li>
                  <li>MongoDB</li>
                </ul>
              </div>
            </div>
            <div className="sub-section">
              <h4 className="title-header">Specialties</h4>
              <div className="skill-lists">
                <ul>
                  <li>APIs</li>
                  <li>Data security & encryption</li>
                  <li>Regression testing and TDD</li>
                  <li>Data scraping</li>
                  <li>Data visualization & maps</li>
                </ul>
                <ul>
                  <li>CMS & static-site generators</li>
                  <li>Product/UX design and research</li>
                  <li>Project life-cycle planning</li>
                  <li>Consentful, inclusive, accessible products</li>
                </ul>
              </div>
            </div>
            <hr />
          </section>
          <section>
            <h2 className="section-header">Recent clients</h2>
            <div className="sub-section">
              <p className="sub-header">Please inquire for specifics.</p>
            </div>
          </section>
          <section>
            <h2 className="section-header">Education</h2>
            <div className="sub-section">
              <p className="sub-header">B.A. Political Science</p>
              <p className="sub-header">B.S. Nursing</p>
              <p className="sub-header">General Assembly Web Development Immsersive</p>
            </div>
            <hr />
          </section>
        </div>
      </div>
    )
  }
}
