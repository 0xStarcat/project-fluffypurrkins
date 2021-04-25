import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from '../PageHeader'
import WorkDescriptionItem from './WorkDescriptionItem'

import { fetchWorkDescriptions } from '../../Actions'
import { pathify } from '@utilities'

class WorkDescriptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: null
    }

    this.setActive = this.setActive.bind(this)
    this.closeActive = this.closeActive.bind(this)
    this.setActiveFromHash = this.setActiveFromHash.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchWorkDescriptions())

    this.unlisten = this.props.history.listen((location, action) => {
      this.setActiveFromHash(location.hash)
    })
  }

  componentWillUnmount() {
    this.unlisten()
  }

  componentDidUpdate() {
    // set the active project based on the hash on load
    if (this.props.location.hash && this.state.activeIndex === null) {
      this.setActiveFromHash(this.props.location.hash)
    }
  }

  setActiveFromHash(hash) {
    if (hash) {
      this.props.workDescriptions.forEach((work, index) => {
        if (this.state.activeIndex !== index && hash === `#${pathify(work.title)}`) {
          this.setState({ activeIndex: index })
        }
      })
    } else {
      this.setState({
        activeIndex: -1
      })
    }
  }

  setActive(index) {
    this.props.history.push(
      `${this.props.location.pathname}#${pathify(this.props.workDescriptions[index].title)}`
    )
    this.setState({
      activeIndex: index
    })
  }

  closeActive() {
    this.props.history.push(this.props.location.pathname)
    this.setState({
      activeIndex: -1
    })
  }

  render() {
    if (!this.props.workDescriptions) return null
    return (
      <div id="work-descriptions">
        <PageHeader />
        <main id="maincontent" className="page">
          <section aria-label="Work" role="list">
            <p aria-hidden="true">* = Freelance</p>
            {this.props.workDescriptions
              .sort((a, b) => {
                if (a.present && b.present) {
                  return new Date(b.date) - new Date(a.date)
                } else {
                  return (
                    new Date(b.present ? new Date() : b.date) -
                    new Date(a.present ? new Date() : a.date)
                  )
                }
              })
              .map((work, index) => {
                return (
                  <WorkDescriptionItem
                    active={this.state.activeIndex === index}
                    closeActive={this.closeActive}
                    index={index}
                    key={`Work-${index}`}
                    last={index === this.props.workDescriptions.length - 1}
                    work={work}
                    setActive={this.setActive}
                  />
                )
              })}
          </section>

          <a href="#nav" className="sr-link">
            Skip to navigation
          </a>
        </main>
      </div>
    )
  }
}

WorkDescriptions.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    workDescriptions: state.workDescriptions
  }
}

export default connect(mapStateToProps)(WorkDescriptions)
