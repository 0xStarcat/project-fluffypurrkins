import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const MenuLink = props => {
  return (
    <Link tabindex="0" to={props.href}>
      <h2>{props.linkText}</h2>
      <span
        aria-hidden="true"
        className="hiddenText mirrored"
        onMouseOver={props.startHoverEffect}
        onMouseMove={props.mirroredHoverShadow}
        onMouseOut={props.hideShadow}
      >
        {props.linkText}
      </span>
    </Link>
  )
}

MenuLink.propTypes = {
  href: PropTypes.string,
  startHoverEffect: PropTypes.func,
  mirroredHoverShadow: PropTypes.func,
  hideShadow: PropTypes.func,
  linkText: PropTypes.string
}

export default MenuLink
