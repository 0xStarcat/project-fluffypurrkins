import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Style/pageHeader.scss'

export default class PageHeader extends Component {
  render() {
    return (
      <div className="page-header">
        <Link to="/" className="header-link-name">
          {window.location.pathname.replace('/', '')}
        </Link>
        <div className="small-links-row">
          <nav>
            <input
              type="checkbox"
              id="css-toggle-menu"
              name="css-toggle-menu"
              defaultChecked="defaultChecked"
            />
            <ul className="main">
              <li
                className={
                  window.location.pathname == '/about' ? 'active header-link' : 'header-link'
                }
              >
                <Link to="/about">About</Link>
              </li>
              <li
                className={
                  window.location.pathname == '/projects' ? 'active header-link' : 'header-link'
                }
              >
                <Link to="/projects">Projects</Link>
              </li>
              {/* <li className="header-link">
                <a href="https://catxmachina.xyz/" target="_blank">
                  Blog
                </a>
              </li> */}
              <li
                className={window.location.pathname == '/cv' ? 'active header-link' : 'header-link'}
              >
                <Link to="/cv">C.V.</Link>
              </li>
              <li
                className={
                  window.location.pathname == '/contact' ? 'active header-link' : 'header-link'
                }
              >
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <label htmlFor="css-toggle-menu" id="css-toggle-menu">
              <svg width="100%" height="100%" viewBox="0 0 24 24">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </label>
          </nav>
        </div>
      </div>
    )
  }
}
