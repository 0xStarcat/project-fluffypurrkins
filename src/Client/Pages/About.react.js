import React, {Component} from 'react'
import PageHeader from './PageHeader'

import './Style/page.scss'
export default class About extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div>
        <PageHeader/>
        <div className ='page'>
          <section>
            <h2 className='section-header'>Hi,</h2>
            <div className='sub-section text-body'>
              <p>My name is Jeff. I'm based in Brooklyn, NY. Some things I like are information security, an internet that respects all people, cultural diversity, open and consensual communities, art, games, and music.</p>
              <br />
              <p>I currently work as a software engineer for <a href="https://everplans.com" target="_blank" className="linky">Everplans</a> and enjoy doing projects that help activist communities. Before this, I worked as an emergency room nurse and I have a B.A. in political science.</p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
