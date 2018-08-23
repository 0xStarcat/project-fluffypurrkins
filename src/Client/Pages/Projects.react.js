import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import PageHeader from './PageHeader'

import { fetchProjects } from '../Actions'

class Projects extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchProjects())
  }

  render() {
    return (<div id="projects"><PageHeader/></div>)
  }

}

Projects.propTypes = {
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  return {
    store: state
  }
}

export default connect(mapStateToProps)(Projects)
