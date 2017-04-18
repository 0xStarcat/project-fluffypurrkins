import React, {Component} from 'react'
import PageHeader from './PageHeader'
import './Style/page.scss'
export default class Contact extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div className='page'>
        <PageHeader/>
        <section>
          <div className='sub-section'>
            <p className='sub-header linky'><a href='https://github.com/0xStarcat' target='_blank'>Github</a></p>
          </div>
          <div className='sub-section'>
            <p className='sub-header linky'><a href='https://twitter.com/0xStarcat' target='_blank'>Twitter</a></p>
          </div>
          <div className='sub-section'>
            <p className='sub-header linky'><a href="mailto:jeffahking@gmail.com" target="_top">jeffahking@gmail.com</a></p>
          </div>
          <div className='sub-section'>
            <p className='sub-header'>PGP</p>
            <p>264D 87F7 C02E 2EC5 079D  ABE0 34CC 90E8 07AF CE6E</p>
          </div>
        </section>
      </div>
    )
  }
}
