import React, { Component } from 'react'
import PageHeader from './PageHeader'
import './Style/cv.scss'
import './Style/page.scss'
export default class CV extends Component {
  render() {
    return (
      <div>
        <PageHeader />
        <main id="maincontent" className="cv page">
          <section aria-label="Work Experience" role="list" className="section">
            <h2 tabindex="0" className="section-header">
              Work Experience
            </h2>
            <div role="listitem" className="sub-section">
              <h3 className="title-header">
                <a href="https://data.automatica.love" target="_blank" rel="noopener noreferrer">
                  Data Automatica, LLC
                </a>
              </h3>
              <p className="sub-header">Founder, Software Engineer</p>
              <p className="sub-header">Jan. 2018 - current</p>
            </div>
            <div role="listitem" className="sub-section">
              <h3 className="title-header">
                <a href="https://everplans.com" target="_blank" rel="noopener noreferrer">
                  {' '}
                  Everplans
                </a>
              </h3>
              <p className="sub-header">Software Engineer</p>
              <p className="sub-header">Dec. 2016 - Jan. 2018</p>
            </div>
            <div role="listitem" className="sub-section">
              <h3 className="title-header">
                <a href="https://hartfordhospital.org/" target="_blank" rel="noopener noreferrer">
                  Hartford Hospital
                </a>
              </h3>
              <p className="sub-header">Emergency Room R.N.</p>
              <p className="sub-header">Pre 2016</p>
            </div>

            <hr />
          </section>

          {/* <section className="section">
            <h2 tabindex="0" className="section-header">Code/Tech Keywords</h2>
            <div className="sub-section">
              <h4 className="title-header">Markup | Scripting | Programming Languages</h4>
              <div className="skill-lists">
                <ul>
                  <li>HTML</li>
                  <li>CSS/SASS</li>
                </ul>
                <ul>
                  <li>Javascript / Typescript</li>
                  <li>Ruby</li>
                  <li>Python</li>
                  <li>C#</li>
                </ul>
              </div>
            </div>
            <div className="sub-section">
              <h4 className="title-header">App + Server Frameworks | Libraries</h4>
              <div className="skill-lists">
                <ul>
                  <li>React.js</li>
                  <li>Node.js</li>
                  <li>GatsbyJS</li>
                </ul>
                <ul>
                  <li>Ruby on Rails</li>
                  <li>Django</li>
                  <li>Headless Wordpress</li>
                </ul>
              </div>
            </div>
            <div className="sub-section">
              <h4 className="title-header">DevOps | Architecture | Databases</h4>
              <div className="skill-lists">
                <ul>
                  <li>Git / Github</li>
                  <li>Docker</li>
                  <li>Linux systems</li>
                  <li>Heroku</li>
                </ul>
                <ul>
                  <li>SQL databases</li>
                  <li>MongoDB</li>
                  <li>Redis</li>
                  <li>GraphQL</li>
                </ul>
              </div>
            </div>
            <div className="sub-section">
              <h4 className="title-header">Full Stack Experiences</h4>
              <div className="skill-lists">
                <ul>
                  <h6>Backend</h6>
                  <li>RESTful API implementation</li>
                  <li>Large dataset query & retrieval optimization</li>
                  <li>Geo-information & mapping</li>
                  <li>Public/private key encryption</li>
                  <li>Automated & scheduled tasks</li>
                </ul>
                <ul>
                  <h6>Frontend</h6>
                  <li>Design system and component library creation + implementation</li>
                  <li>Page builder & CMS tools</li>
                  <li>Animation & SVG graphic implemention</li>
                </ul>
                <ul>
                  <h6>Bonus</h6>
                  <li>Automated testing & site reliability</li>
                  <li>Full app lifecycle experience</li>
                </ul>
              </div>
            </div>
            <hr />
          </section> */}
          <section role="list" aria-label="Education" className="section">
            <h2 tabindex="0" className="section-header">
              Education
            </h2>
            <div role="listitem" className="sub-section">
              <h3 className="sub-header">General Assembly Web Development Immsersive</h3>
              <p className="sub-header">2016</p>
            </div>
            <div role="listitem" className="sub-section">
              <h3 className="sub-header">B.S. Nursing</h3>
              <p className="sub-header">2014</p>
            </div>
            <div role="listitem" className="sub-section">
              <h3 className="sub-header">B.A. Political Science</h3>
              <p className="sub-header">2010</p>
            </div>
            <hr />
          </section>
          <a href="#nav" className="sr-link">
            Skip to navigation
          </a>
        </main>
      </div>
    )
  }
}
