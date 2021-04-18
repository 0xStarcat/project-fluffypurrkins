import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from '../PageHeader'
import ProjectItem from './ProjectItem'

import { fetchProjects } from '../../Actions'
import { pathify } from '@utilities'

class Projects extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeProject: -1
    }

    this.setActive = this.setActive.bind(this)
    this.closeActive = this.closeActive.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects())
  }

  componentDidUpdate() {
    // set the active project based on the hash
    this.props.projects.forEach((project, index) => {
      if (
        this.state.activeProject !== index &&
        this.props.location.hash === `#${pathify(project.title)}`
      ) {
        this.setState({ activeProject: index })
      }
    })
  }

  setActive(index) {
    this.props.history.push(
      `${this.props.location.pathname}#${pathify(this.props.projects[index].title)}`
    )
    this.setState({
      activeProject: index
    })
  }

  closeActive() {
    this.props.history.push(this.props.location.pathname)
    this.setState({
      activeProject: -1
    })
  }

  render() {
    if (!this.props.projects) return null
    return (
      <div id="projects">
        <PageHeader />
        <div className="page">
          {this.props.projects
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((project, index) => {
              return (
                <ProjectItem
                  active={this.state.activeProject === index}
                  closeActive={this.closeActive}
                  index={index}
                  key={`Project-${index}`}
                  last={index === this.props.projects.length - 1}
                  project={project}
                  setActive={this.setActive}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

Projects.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(Projects)
