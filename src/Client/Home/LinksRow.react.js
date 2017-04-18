import React, { Component } from 'react'
import {startHoverEffect, hoverShadow, mirroredHoverShadow, hideShadow } from './lib/hover.react'

import { Link } from 'react-router-dom'

export default class LinksRow extends Component {
  render() {
    return (
      <div className='links-wrapper'>

        <Link to={this.props.shadow ? '/analytics' : '/about'}>
          {this.props.shadow ? 'Analytics' : 'About'}
          <span
            className='hiddenText mirrored'
            onMouseOver={startHoverEffect}
            onMouseMove={mirroredHoverShadow}
            onMouseOut={hideShadow}>
          {this.props.shadow ? 'Analytics' : 'About'}
          </span>
        </Link>
        <span className='divider'>{this.props.shadow ? '' : ' | '}</span>
        <a href={this.props.shadow ? '' : 'https://0xstarcat.github.io/'} target='_blank'>
          {this.props.shadow ? '' : 'Blog'}
          <span
            className='hiddenText mirrored'
            onMouseOver={startHoverEffect}
            onMouseMove={mirroredHoverShadow}
            onMouseOut={hideShadow}>
          {this.props.shadow ? '' : 'Blog'}
          </span>
        </a>
        <span className='divider'>{this.props.shadow ? '' : ' | '}</span>
        <Link to={this.props.shadow ? '' : '/cv'}>
          {this.props.shadow ? '' : 'C.V.'}
          <span
            className='hiddenText mirrored'
            onMouseOver={startHoverEffect}
            onMouseMove={mirroredHoverShadow}
            onMouseOut={hideShadow}>
          {this.props.shadow ? '' : 'C.V.'}
          </span>
        </Link>
        <span className='divider'> | </span>
        <Link to={this.props.shadow ? '#' : '/contact'}>
          {this.props.shadow ? 'Other Blog' : 'Contact'}
          <span
            className='hiddenText mirrored'
            onMouseOver={startHoverEffect}
            onMouseMove={mirroredHoverShadow}
            onMouseOut={hideShadow}>
          {this.props.shadow ? 'Other Blog' : 'Contact'}
          </span>
        </Link>
      </div>
    )
  }
}
