import React from 'react'

import PageHeader from '../PageHeader'
import WorkDescriptionItem from './WorkDescriptionItem'

import { pathify } from '@utilities'
import workDescriptions from '../../data/workdescriptions.json'

const sortedWorkDescriptions = workDescriptions.slice().sort((a, b) => {
  if (a.present && b.present) {
    return new Date(b.date) - new Date(a.date)
  }
  return (
    new Date(b.present ? new Date() : b.date) - new Date(a.present ? new Date() : a.date)
  )
})

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
      sortedWorkDescriptions.forEach((work, index) => {
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
      `${this.props.location.pathname}#${pathify(sortedWorkDescriptions[index].title)}`
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
    return (
      <div id="work-descriptions">
        <PageHeader />
        <main id="maincontent" className="page">
          <section aria-label="Work" role="list">
            <p aria-hidden="true">* = Freelance</p>
            {sortedWorkDescriptions.map((work, index) => (
              <WorkDescriptionItem
                active={this.state.activeIndex === index}
                closeActive={this.closeActive}
                index={index}
                key={`Work-${index}`}
                last={index === sortedWorkDescriptions.length - 1}
                work={work}
                setActive={this.setActive}
              />
            ))}
          </section>

          <a href="#nav" className="sr-link">
            Skip to navigation
          </a>
        </main>
      </div>
    )
  }
}

export default WorkDescriptions
