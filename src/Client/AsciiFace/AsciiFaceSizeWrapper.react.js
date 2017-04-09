import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import AsciiFaces from './AsciiFaces.react'
import { onMobileSize, onDesktopSize } from './lib/windowSizeHelpers.react'

import './style/asciiFaceSizeWrapper.scss'

export default class AsciiFaceSizeWrapper extends Component {
  constructor() {
    super()
    this.updateDimensions = this.updateDimensions.bind(this)
    this.assignCoordinatesToLetters = this.assignCoordinatesToLetters.bind(this)
  }

    updateDimensions() {
      let windowHeight = Math.min(window.innerHeight, screen.height)
      let windowWidth = Math.min(window.innerWidth, screen.width)

      let code = ReactDOM.findDOMNode(this.refs.face.refs.codeElement)
      let textWrapper = ReactDOM.findDOMNode(this.refs.face.refs.textWrapperElement)
      let myName = ReactDOM.findDOMNode(this.refs.face.refs.myName)

      code.style.fontSize = Math.min(windowWidth * 0.01, 11)
      code.style.lineHeight = Math.min(Math.max((windowWidth * 0.005), 3.5), 5.6)+'px'

      textWrapper.style.left = windowWidth * 0.15
      textWrapper.style.top = (onMobileSize() ? 30 : 25) +'%'

      myName.style.left = onMobileSize() ? textWrapper.style.left : '50%'

      this.assignCoordinatesToLetters()
    }

    assignCoordinatesToLetters() {
      let letters = document.getElementsByClassName('ascii-letter')
      for (let i = 0; i < (letters.length); i++) {
        var rect = letters[i].getBoundingClientRect()
        letters[i].style.top = letters[i].offsetTop
        letters[i].style.left = letters[i].offsetLeft
      }
    }
    componentDidMount() {
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

  render() {
    return(
      <div className='windowSizer'>
        <AsciiFaces ref='face'/>
      </div>
    )
  }
}
