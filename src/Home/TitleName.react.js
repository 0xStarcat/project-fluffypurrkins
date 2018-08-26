import React, {Component} from 'react'
import {startHoverEffect, hoverShadow, mirroredHoverShadow, hideShadow } from './lib/hover.react'
export default class TitleName extends Component {
  constructor() {
    super()
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate()
  }

  render() {
    return (
      <div id='myName'>
      <span
        onMouseOver={startHoverEffect}
        onMouseMove={hoverShadow}
        onMouseOut={hideShadow}
        onClick={this.props.restartPlayback}>
        Jade Ahking
      </span>
      <span
        className='hiddenText suppressed'
        onMouseOver={startHoverEffect}
        onMouseMove={hoverShadow}
        onMouseOut={hideShadow}>
      0xStarcat
      </span>
    </div>
    )
  }
}
