import React from 'react'

import { startHoverEffect, hoverShadow, mirroredHoverShadow, hideShadow } from './lib/hover.react'

import MenuLink from './MenuLink'

export default class LinksRow extends React.Component {
  render() {
    return (
      <div className="links-wrapper">
        <MenuLink
          href="/about"
          startHoverEffect={startHoverEffect}
          mirroredHoverShadow={mirroredHoverShadow}
          hideShadow={hideShadow}
          linkText="About"
        />
        <span className="divider">{' | '}</span>
        <MenuLink
          href="/projects"
          startHoverEffect={startHoverEffect}
          mirroredHoverShadow={mirroredHoverShadow}
          hideShadow={hideShadow}
          linkText="Projects"
        />
        <span className="divider">{' | '}</span>
        <a href={'https://catxmachina.xyz/'} target="_blank">
          {'Blog'}
          <span
            className="hiddenText mirrored"
            onMouseOver={startHoverEffect}
            onMouseMove={mirroredHoverShadow}
            onMouseOut={hideShadow}
          >
            {'Blog'}
          </span>
        </a>
        <span className="divider">{' | '}</span>
        <MenuLink
          href="/cv"
          startHoverEffect={startHoverEffect}
          mirroredHoverShadow={mirroredHoverShadow}
          hideShadow={hideShadow}
          linkText="C.V."
        />
        <span className="divider">{' | '}</span>
        <MenuLink
          href="/contact"
          startHoverEffect={startHoverEffect}
          mirroredHoverShadow={mirroredHoverShadow}
          hideShadow={hideShadow}
          linkText="Contact"
        />
      </div>
    )
  }
}
