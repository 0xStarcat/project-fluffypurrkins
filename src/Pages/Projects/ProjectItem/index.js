import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import './style.scss'

const ProjectItem = props => {
  const selectItem = e => {
    e.preventDefault()
    if (props.active) {
      props.closeActive()
    } else {
      props.setActive(props.index)
    }
  }

  return (
    <div className={classnames('project-item', { selected: props.active })}>
      <div className="inline-wrapper" onTouchEnd={selectItem} onClick={selectItem}>
        <div className="border-container">
          <div className={classnames('list-border top-border', { 'last-border': props.last })} />
          {props.last ? null : <div className="list-border bottom-border" />}
        </div>
        <div className="project-item-text">{props.project.title}</div>
      </div>
      <div className="project-item-full-wrapper">
        <div className={classnames('project-item-full')}>
          <div className={classnames('project-item-content-wrapper', { 'no-border': props.last })}>
            <div className="project-item-content">
              {props.project.mainImage && (
                <img
                  alt="Project Image"
                  className="project-image project-content-item"
                  src={`https://cms.starcat.xyz${props.project.mainImage.url}`}
                />
              )}
              <a
                className="project-link project-content-item"
                href={`${props.project.link}`}
                target="_blank"
              >
                View this project
              </a>
              {props.project.generalDescription && (
                <ReactMarkdown
                  className="project-content-item"
                  rehypePlugins={[rehypeRaw]}
                  skipHtml={false}
                >
                  {props.project.generalDescription}
                </ReactMarkdown>
              )}

              <h4>Tech Tags</h4>
              {props.project.technicalDescription && <h6>{props.project.technicalDescription}</h6>}
            </div>
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
