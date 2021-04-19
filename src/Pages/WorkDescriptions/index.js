import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from '../PageHeader'
import WorkDescriptionItem from './WorkDescriptionItem'

import { fetchWorkDescriptions } from '../../Actions'
import { pathify } from '@utilities'
import { stringify } from 'postcss'

class WorkDescriptions extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeIndex: -1
    }

    this.setActive = this.setActive.bind(this)
    this.closeActive = this.closeActive.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchWorkDescriptions())
  }

  componentDidUpdate() {
    // set the active project based on the hash
    this.props.workDescriptions.forEach((work, index) => {
      if (
        this.state.activeIndex !== index &&
        this.props.location.hash === `#${pathify(work.title)}`
      ) {
        this.setState({ activeIndex: index })
      }
    })
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
        <div className="page">
          <p>* = Freelance</p>
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
        </div>
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
