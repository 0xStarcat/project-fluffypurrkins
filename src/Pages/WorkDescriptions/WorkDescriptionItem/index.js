import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import ReactGA from 'react-ga'

import '../../Projects/ProjectItem/style.scss'

const WorkDescriptionItem = props => {
  const selectItem = e => {
    e.preventDefault()
    if (props.active) {
      props.closeActive()
    } else {
      props.setActive(props.index)
    }
  }

  const renderDate = (startDate, endDate, present) => {
    let years

    if (new Date(startDate).getFullYear() == new Date(endDate).getFullYear())
      years = <span>{new Date(startDate).getFullYear()}</span>
    else {
      years = (
        <span>
          {new Date(startDate).getFullYear()}-<span className="sr-only"> to </span>
          {present ? 'Present' : new Date(endDate).getFullYear()}
        </span>
      )
    }

    return <span>({years})</span>
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
        <div className="project-item-text">
          {props.work.title} {renderDate(props.work.date, props.work.endDate, props.work.present)}
          {props.work.freelance ? '*' : ''}
          {props.work.freelance ? <span className="sr-only">Freelance</span> : ''}
        </div>
      </button>
      <div className="project-item-full-wrapper">
        <div className={classnames('project-item-full')}>
          <div className={classnames('project-item-content-wrapper', { 'no-border': props.last })}>
            <div className="project-item-content">
              {props.work.mainImage && (
                <a
                  tabIndex="-1"
                  className="project-image-link"
                  aria-hidden={true}
                  href={`https://cms.ahking.me${props.work.mainImage.url}`}
                  target="_blank"
                >
                  <img
                    alt="Project Image"
                    className="project-image project-content-item"
                    src={`https://cms.ahking.me${props.work.mainImage.url}`}
                  />
                </a>
              )}
              <div className="project-item__text-content">
                {props.work.link && (
                  <ReactGA.OutboundLink
                    className="project-link project-content-item"
                    eventLabel={props.work.link}
                    to={props.work.link}
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    View this organization
                  </ReactGA.OutboundLink>
                )}
                <div tabIndex="0">
                  {props.work.description && (
                    <ReactMarkdown
                      className="project-content-item"
                      rehypePlugins={[rehypeRaw]}
                      skipHtml={false}
                    >
                      {props.work.description}
                    </ReactMarkdown>
                  )}
                </div>

                {props.work.techTags && (
                  <div tabIndex="0">
                    <h4 className="heading-sm">Tech Tags</h4>
                    <h6 className="system-text-sm">{props.work.techTags}</h6>
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

WorkDescriptionItem.propTypes = {
  active: PropTypes.bool,
  index: PropTypes.number,
  last: PropTypes.bool,
  work: PropTypes.object,
  setActive: PropTypes.func
}

export default WorkDescriptionItem
