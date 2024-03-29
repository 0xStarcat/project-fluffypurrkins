import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import ReactGA from 'react-ga'

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
    <div role="listitem" className={classnames('project-item', { selected: props.active })}>
      <button
        aria-expanded={props.active}
        className="inline-wrapper"
        onTouchEnd={selectItem}
        onClick={selectItem}
      >
        <div className="border-container">
          <div className={classnames('list-border top-border', { 'last-border': props.last })} />
          {props.last ? null : <div className="list-border bottom-border" />}
        </div>
        <div className="project-item-text">{props.project.title}</div>
      </button>
      <div className="project-item-full-wrapper" aria-hidden={!props.active}>
        <div className={classnames('project-item-full')}>
          <div className={classnames('project-item-content-wrapper', { 'no-border': props.last })}>
            <div className="project-item-content">
              {props.project.mainImage && (
                <a
                  tabIndex="-1"
                  className="project-image-link"
                  aria-hidden={true}
                  href={`https://cms.ahking.me${props.project.mainImage.url}`}
                  target="_blank"
                >
                  <img
                    alt="Project Image"
                    className="project-image project-content-item"
                    src={`https://cms.ahking.me${props.project.mainImage.url}`}
                  />
                </a>
              )}
              <div className="project-item__text-content">
                <ReactGA.OutboundLink
                  className="project-link project-content-item"
                  eventLabel={props.project.link}
                  to={props.project.link}
                  target="_blank"
                  rel="noopener nofollow"
                >
                  View this project{' '}
                </ReactGA.OutboundLink>
                <div tabIndex="0">
                  {props.project.generalDescription && (
                    <ReactMarkdown
                      className="project-content-item"
                      rehypePlugins={[rehypeRaw]}
                      skipHtml={false}
                    >
                      {props.project.generalDescription}
                    </ReactMarkdown>
                  )}
                </div>
                {props.project.technicalDescription && (
                  <div tabIndex="0">
                    <h4 className="heading-sm">Tech Tags</h4>
                    <h6 className="system-text-sm">{props.project.technicalDescription}</h6>
                  </div>
                )}
              </div>
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
