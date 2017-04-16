import React, {Component} from 'react'
import PageHeader from './PageHeader'

export default class About extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div>
        <PageHeader/>
        <h1>About Page</h1>
      </div>
    )
  }
}
