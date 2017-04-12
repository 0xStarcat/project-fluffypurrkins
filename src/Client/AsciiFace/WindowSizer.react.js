import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, } from 'react-router-dom'

import AsciiFaces from './AsciiFaces.react'
import LinksRow from './LinksRow.react'
import TitleName from './TitleName.react'

import { asciiText } from './AsciiText.react'

import { onMobileSize, onDesktopSize, onDesktop } from './lib/windowSizeHelpers.react'

import './style/asciiFaceSizeWrapper.scss'

export default class WindowSizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sentence: 'About | Blog | C.V. | Code'
    }
    this.randomKey = this.randomKey.bind(this)
    this.assignCoordinatesToLetters = this.assignCoordinatesToLetters.bind(this)
    this.appendLinks = this.appendLinks.bind(this)
    this.clearAnimations = this.clearAnimations.bind(this)
    this.skipToEnd = this.skipToEnd.bind(this)
    this.restartPlayback = this.restartPlayback.bind(this)
    this.resetStyles = this.resetStyles.bind(this)

  }

  assignCoordinatesToLetters() {
    let letters = document.getElementsByClassName('ascii-letter')
    for (let i = 0; i < letters.length; i++) {
      var rect = letters[i].getBoundingClientRect()
      letters[i].style.top = letters[i].offsetTop
      letters[i].style.left = letters[i].offsetLeft
    }
  }
  componentWillUpdate() {
    if (this.props.play) this.resetStyles()
  }
  componentDidMount() {
      this.assignCoordinatesToLetters()
      window.addEventListener("resize", this.assignCoordinatesToLetters);
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.assignCoordinatesToLetters);
  }

  appendLinks() {
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    textWrapper.appendChild(ReactDOM.findDOMNode(this.refs.linksWrapper))
    ReactDOM.findDOMNode(this.refs.linksWrapper).style.display = 'block'
    this.cueName()
  }

  cueName() {
    let myName = ReactDOM.findDOMNode(this.refs.titleName)
    myName.style.opacity = 1
    myName.addEventListener('transitionend', () => { myName.style.borderBottom = '8px solid black' })
  }

  clearAnimations() {
    let textWrapper = document.querySelector('.text-wrapper')
    textWrapper.innerHTML = ''
    document.querySelector('pre').style.display = 'none'
    this.props.stopPlayback()
    this.appendLinks()
  }

  skipToEnd() {
    let oldDeviceEvent = onDesktop() ? 'click' : 'touchend'
    document.body.removeEventListener(oldDeviceEvent, this.skipToEnd)
    this.clearAnimations()
  }

  restartPlayback() {
    this.props.startPlayback()

    this.resetStyles()
  }

  resetStyles() {
    let pre = ReactDOM.findDOMNode(this.refs.face.refs.preElement)
    pre.style = ''

    ReactDOM.findDOMNode(this.refs.titleName).style = '';
    ReactDOM.findDOMNode(this.refs.textWrapperElement).innerHTML = ''

    let spans = pre.children[0].children
    for (let i = 0; i < spans.length; i++) {
      spans[i].style = ''
    }
  }

  randomKey() {
    var i, random;
    var uuid = '';
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) { uuid += '-'; }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  }

  render() {
    return (
      <div className='mainWrapper'>
        <div className = 'text-wrapper' ref='textWrapperElement'/>
        <LinksRow
          ref='linksWrapper'
        />
        <AsciiFaces
          ref='face'
          asciiText={asciiText}
          sentence={this.state.sentence}
          assignCoordinatesToLetters={this.assignCoordinatesToLetters}
          appendLinks={this.appendLinks}
          clearAnimations={this.clearAnimations}
          skipToEnd={this.skipToEnd}
          play={this.props.play}
        />
        <TitleName
          ref='titleName'
          restartPlayback={this.restartPlayback}
        />
      </div>
    )
  }
}
