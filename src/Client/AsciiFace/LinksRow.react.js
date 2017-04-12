import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LinksRow extends Component {
  render() {
    return (
      <div className = 'links-wrapper'>
        <Link to='/about'>About</Link><span> | </span>
        <Link to='/blog'>Blog</Link><span> | </span>
        <Link to='/cv'>C.V.</Link><span> | </span>
        <Link to='/code'>Code</Link>
      </div>
    )
  }
}
