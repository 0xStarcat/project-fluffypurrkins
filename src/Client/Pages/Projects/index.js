import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from '../PageHeader'
import ProjectItem from './ProjectItem'

import { fetchProjects } from '../../Actions'

class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects())
  }

  render() {
    console.log(this.props)
    if (!this.props.projects) return null
    return (
      <div id="projects" className="page">
        <PageHeader />
        {this.props.projects.map((project, index) => {
          return (
            <ProjectItem
              key={`Project-${index}`}
              last={index === this.props.projects.length - 1}
              project={project}
            />
          )
        })}
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
