import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import AsciiFaces from './AsciiFaces.react'
import { onMobileSize, onDesktopSize } from './lib/windowSizeHelpers.react'

import './style/asciiFaceSizeWrapper.scss'

export default class AsciiFaceSizeWrapper extends Component {
  constructor() {
    super()
    this.assignCoordinatesToLetters = this.assignCoordinatesToLetters.bind(this)
  }

    assignCoordinatesToLetters() {
      let letters = document.getElementsByClassName('ascii-letter')
      for (let i = 0; i < letters.length; i++) {
        var rect = letters[i].getBoundingClientRect()
        letters[i].style.top = letters[i].offsetTop
        letters[i].style.left = letters[i].offsetLeft
      }
    }
    componentDidMount() {
        this.assignCoordinatesToLetters()
        window.addEventListener("resize", this.assignCoordinatesToLetters);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.assignCoordinatesToLetters);
    }

  render() {
    return(
      <div className='mainWrapper'>
        <AsciiFaces ref='face'/>
      </div>
    )
  }
}
