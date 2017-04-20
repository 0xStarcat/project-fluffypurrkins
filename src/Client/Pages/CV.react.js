import React, {Component} from 'react'
import PageHeader from './PageHeader'
import './Style/cv.scss'
import './Style/page.scss'
export default class CV extends Component {

  render() {
    return(
      <div>
        <PageHeader/>
        <div className='cv page'>
          <section>
            <h2 className='section-header'>Work Experience</h2>
            <div className='sub-section'>
              <h4 className='title-header'>Everplans<span className='sub-header'> - Current</span></h4>
              <p className='sub-header'>Software Engineer</p>
            </div>
            <div className='sub-section'>
              <h4 className='title-header'>Hartford Hospital</h4>
              <p className='sub-header'>Emergency Room R.N.</p>
            </div>

            <hr/>
          </section>

          <section>
            <h2 className='section-header'>Code/Tech Stuff</h2>
            <div className='sub-section'>
              <h4 className='title-header'>Markup | Scripting | Programming Languages</h4>
                <div className='skill-lists'>
                  <ul>
                    <li>HTML</li>
                    <li>Markdown</li>
                    <li>CSS/SASS</li>
                  </ul>
                  <ul>
                    <li>Javascript</li>
                    <li>Ruby</li>
                    <li>C#</li>
                  </ul>
                </div>
            </div>
            <div className='sub-section'>
              <h4 className='title-header'>Libraries | Frameworks</h4>
              <div className='skill-lists'>
                <ul>
                  <li>React.js</li>
                  <li>Ruby on Rails</li>
                  <li>Node.js</li>
                </ul>
              </div>
            </div>
            <div className='sub-section'>
              <h4 className='title-header'>DevOps | Architecture Tools</h4>
              <div className='skill-lists'>
                <ul>
                  <li>Git/Github</li>
                  <li>Travis & Continuous Integration</li>
                  <li>NGINX</li>
                </ul>
                <ul>
                  <li>Amazon Web Services</li>
                  <li>Aptible</li>
                  <li>Heroku</li>
                </ul>
              </div>
            </div>
            <div className='sub-section'>
              <h4 className='title-header'>Skills | Practices</h4>
              <div className='skill-lists'>
                <ul>
                  <li>RESTful API</li>
                  <li>Security-minded development</li>
                  <li>Test-driven development</li>
                </ul>
                <ul>
                  <li>CMS & static-site generators</li>
                  <li>Hosting & HTTPS</li>
                </ul>
              </div>
            </div>
            <hr/>
          </section>
          <section>
            <h2 className='section-header'>Education</h2>
            <div className='sub-section'>
              <p className='sub-header'>B.A. Political Science</p>
              <p className='sub-header'>B.S. Nursing</p>
            </div>
            <hr/>
          </section>
          <section className='speaking'>
            <h2 className='section-header'>Speaking</h2>
              <div className='sub-section'>
                <p>Mar, 2017 - CSFair NYC</p>
                <p>
                  <a className='linky' href='https://github.com/0xStarcat/csfair-presentation' target='_blank'>Digital Privacy: What Do You Look Like?</a>
                </p>
              </div>
              <div className='sub-section'>
                <p>Jan, 2017 - Make A Diff CryptoParty</p>
                <p>
                  <a className='linky' href='https://github.com/0xStarcat/protect-yo-self-browsing' target='_blank'>Protect Yo' Self - Network Privacy & Safe Browsing</a>
                </p>
              </div>
              <div className='sub-section'>
                <p>Dec, 2016 - Mozilla + Tactical Tech</p>
                <p>
                  <a className='linky' href='https://tacticaltech.org/projects/glass-room' target ='_blank'>The Glass Room - Workshops on Metadata / Safe Browsing</a>
                </p>
              </div>
            <hr/>
          </section>
        </div>
      </div>

    )
  }
}
