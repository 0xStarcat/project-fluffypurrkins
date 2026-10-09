import React from 'react'

import PageHeader from '../PageHeader'
import ProjectItem from './ProjectItem'

import { pathify } from '@utilities'
import projects from '../../data/projects.json'

const sortedProjects = projects.slice().sort((a, b) => new Date(b.date) - new Date(a.date))

class Projects extends React.Component {
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
    // set the active project based on the hash
    if (this.props.location.hash && this.state.activeIndex === null) {
      this.setActiveFromHash(this.props.location.hash)
    }
  }

  setActiveFromHash(hash) {
    if (hash) {
      sortedProjects.forEach((project, index) => {
        if (this.state.activeIndex !== index && hash === `#${pathify(project.title)}`) {
          this.setState({ activeIndex: index })
        }
      })
    } else {
      this.setState({ activeIndex: -1 })
    }
  }

  setActive(index) {
    this.props.history.push(
      `${this.props.location.pathname}#${pathify(sortedProjects[index].title)}`
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
      <div id="projects">
        <PageHeader />
        <main id="maincontent" className="page">
          <section aria-label="Projects" role="list">
            {sortedProjects.map((project, index) => (
              <ProjectItem
                active={this.state.activeIndex === index}
                closeActive={this.closeActive}
                index={index}
                key={`Project-${index}`}
                last={index === sortedProjects.length - 1}
                project={project}
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

export default Projects
