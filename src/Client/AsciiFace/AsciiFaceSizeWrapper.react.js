import React, {Component} from 'react';
import AsciiFaces from './AsciiFaces.react'

import './style/asciiFaceSizeWrapper.scss'

export default class AsciiFaceSizeWrapper extends Component {
  constructor() {
    super()
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.updateDimensions = this.updateDimensions.bind(this)
  }

    updateDimensions() {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

  render() {
    return(
      <div className='windowSizer'>
        <AsciiFaces/>
      </div>
    )
  }
}
