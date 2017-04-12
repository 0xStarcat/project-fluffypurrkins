import React, {Component} from 'react'

export default class TitleName extends Component {

  componentDidUpdate() {
  }

  render() {
    return (
      <span id='myName' onClick={this.props.restartPlayback}>Jeff Ahking</span>
    )
  }
}
