import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './style.scss'

const ProjectItem = props => {
  const selectItem = e => {
    e.preventDefault()
    props.setActive(props.index)
  }

  return (
    <div
      className={classnames('project-item', { selected: props.active })}
      onTouchStart={selectItem}
      onClick={selectItem}
    >
      <div className="border-container">
        <div className={`list-border top-border`} />
        {props.last ? null : <div className="list-border bottom-border" />}
      </div>
      <div className="project-item-text">{props.project.title}</div>
    </div>
  )
}

ProjectItem.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number,
  last: PropTypes.bool,
  project: PropTypes.object,
  setActive: PropTypes.func
}

export default ProjectItem
