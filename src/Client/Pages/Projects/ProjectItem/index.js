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
      <div className="inline-wrapper">
        <div className="border-container">
          <div className={`list-border top-border`} />
          {props.last ? null : <div className="list-border bottom-border" />}
        </div>
        <div className="project-item-text">{props.project.title}</div>
      </div>
      <div className="project-item-full-wrapper">
        <div className={classnames('project-item-full', { 'no-border': props.last })}>
          <div
            className={classnames('project-item-full-inner-content', { 'no-border': props.last })}
          >
            {props.project.mainImage && (
              <img
                alt="NYC Building Monitor image"
                className="project-image"
                src={`https://cms.starcat.xyz${props.project.mainImage.url}`}
              />
            )}
            <a className="project-content" href={`${props.project.link}`}>
              View this project
            </a>
            {props.project.generalDescription && <p>{props.project.generalDescription}</p>}
          </div>
        </div>
      </div>
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
