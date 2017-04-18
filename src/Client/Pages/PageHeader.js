import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import './Style/pageHeader.scss'

export default class PageHeader extends Component {

  render() {
    return(
      <div className='page-header'>
        <Link to='/' className='header-link-name'>Jeff Ahking</Link>
        <div className='small-links-row'>
          <nav>
           <input type="checkbox" id="css-toggle-menu" name="css-toggle-menu" defaultChecked />
           <ul className="main">
             <li className={(window.location.pathname == '/about') ? 'active header-link' : 'header-link'}><Link to='/about' >About</Link></li>
             <li className='header-link'><a href='https://0xstarcat.github.io/' target='_blank'>Blog</a></li>
             <li className={(window.location.pathname == '/cv') ? 'active header-link' : 'header-link'}><Link to='/cv'>C.V.</Link></li>
             <li className={(window.location.pathname == '/contact') ? 'active header-link' : 'header-link'}><Link to='/contact'>Contact</Link></li>
           </ul>
           <label htmlFor="css-toggle-menu" id="css-toggle-menu"></label>
          </nav>
        </div>
      </div>
    )
  }
}
