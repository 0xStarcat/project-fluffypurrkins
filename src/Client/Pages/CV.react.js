import React, {Component} from 'react'

import './Style/cv.scss'

export default class CV extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div className='cv'>
        <h1 className='header'>Jeff Ahking</h1>
        <section>
          <h2 className='section-header'>Work Experience</h2>
          <h4 className='title-header'>Everplans</h4>
          <h4 className='title-header'>Hartford Hospital</h4>
          <h4 className='title-header'>Hunter's Ambulance</h4>
        </section>
        <section>
          <h2 className='section-header'>Code/Tech Stuff</h2>
          <h4 className='title-header'>Markup / Scripting Languages</h4>
          <h4 className='title-header'>Libraries / Frameworks</h4>
          <h4 className='title-header'>DevOps / Architecture Tools</h4>
          <h4 className='title-header'>Everplans</h4>
        </section>
        <section>
          <h2 className='section-header'>Speaking Engagements</h2>
        </section>
      </div>

    )
  }
}
