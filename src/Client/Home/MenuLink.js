import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const MenuLink = props => {
  return <Link to={props.href}>
    {props.linkText}
    <span
      className='hiddenText mirrored'
      onMouseOver={props.startHoverEffect}
      onMouseMove={props.mirroredHoverShadow}
      onMouseOut={props.hideShadow}>
      {props.linkText}
    </span>
  </Link>
}

MenuLink.propTypes = {
  href: PropTypes.string,
  startHoverEffect: PropTypes.func,
  mirroredHoverShadow: PropTypes.func,
  hideShadow: PropTypes.func,
  linkText: PropTypes.string
}

export default MenuLink
