import React, { Component } from 'react'
import PageHeader from './PageHeader'
import Resume from '@images/jade-ahking-resume.pdf'
import './Style/cv.scss'
import './Style/page.scss'
export default class CV extends Component {
  render() {
    return (
      <div>
        <PageHeader />
        <main id="maincontent" className="cv page">
          <section className="section">
            <a className="cv__download" href={Resume} target="_blank">
              Open Resume PDF
            </a>
            <embed src={Resume} type="application/pdf" />
          </section>
        </main>
      </div>
    )
  }
}
