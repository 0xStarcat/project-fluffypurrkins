import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ProjectItem = props => {
  return (
    <div className="project-item">
      <div className="border-container">
        <div className={`list-border top-border`} />
        {props.last ? null : <div className="list-border bottom-border" />}
      </div>
      {props.project.title}
    </div>
  )
}

ProjectItem.propTypes = { project: PropTypes.object }

export default ProjectItem
