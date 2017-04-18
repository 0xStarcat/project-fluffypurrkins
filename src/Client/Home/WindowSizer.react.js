import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import {startHoverEffect, hoverShadow, mirroredHoverShadow, hideShadow } from './lib/hover.react'

import AsciiFaces from './AsciiFaces.react'
import LinksRow from './LinksRow.react'
import TitleName from './TitleName.react'

import { asciiText } from './AsciiText.react'

import { onMobileSize, onDesktopSize, onDesktop } from './lib/windowSizeHelpers.react'

import './Style/asciiFaceSizeWrapper.scss'

export default class WindowSizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sentence: 'About | Blog | C.V. | Contact',
    }
    this.assignCoordinatesToLetters = this.assignCoordinatesToLetters.bind(this)
    this.appendLinks = this.appendLinks.bind(this)
    this.endAnimations = this.endAnimations.bind(this)
    this.restartPlayback = this.restartPlayback.bind(this)
    this.resetStyles = this.resetStyles.bind(this)
    this.shadowMode = this.shadowMode.bind(this)

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
    this.refs.secret.style.cssText =
      `cursor: help;
      position: absolute;
      top: 10%;
      left: 40%;
      font-size: 3rem;
      color: transparent;`

    window.addEventListener("resize", this.assignCoordinatesToLetters);
    if (!this.props.play) { this.endAnimations() }
    if (this.props.shadow) { this.shadowMode() }
  }
  componentDidUpdate() {
    if (!this.props.play) {
      this.endAnimations()
    }
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this.assignCoordinatesToLetters);
  }
  appendLinks() {
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    textWrapper.appendChild(ReactDOM.findDOMNode(this.refs.linksWrapper))
    ReactDOM.findDOMNode(this.refs.linksWrapper).style.display = 'block'

  }

  cueName() {
    let myName = ReactDOM.findDOMNode(this.refs.titleNameElement)
    myName.style.opacity = 1
    myName.style.transition = 'opacity 2000ms ease-in-out'
  }

  endAnimations() {
    this.props.stopPlayback()
    let oldDeviceEvent = onDesktop() ? 'click' : 'touchend'
    document.body.removeEventListener(oldDeviceEvent, this.endAnimations)

    ReactDOM.findDOMNode(this.refs.textWrapperElement).innerHTML = ''
    this.appendLinks()
    this.cueName()

  }

  restartPlayback() {
    if (ReactDOM.findDOMNode(this.refs.titleNameElement).style.opacity == 1) {
      this.resetStyles()
      this.props.startPlayback()
    }
  }

  resetStyles() {
    this.refs.face.refs.formatter.mountAsciiFace()
    let formatter = ReactDOM.findDOMNode(this.refs.face.refs.formatter)
    formatter.style = ''
    ReactDOM.findDOMNode(this.refs.titleNameElement).style = '';
    ReactDOM.findDOMNode(this.refs.textWrapperElement).innerHTML = ''
    let spans = formatter.children[0].children
    for (let i = 0; i < spans.length; i++) {
      spans[i].style = ''
    }
  }

  shadowMode() {
    if (!this.props.shadow) {
      document.body.style.transition = 'all 3000ms ease-in-out';
      document.body.style.backgroundColor = "dimgrey";
      document.body.style.color = "white";
      let suppressed = document.getElementsByClassName('suppressed')
      for (let i = 0; i < suppressed.length; i++) {
        suppressed[i].style.zIndex = 1;
      }
      setTimeout( function() {
        this.props.enableShadow()
        this.forceUpdate()
      }.bind(this), 1750)
    } else {
      document.body.style.transition = 'all 3000ms ease-in-out';
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      let suppressed = document.getElementsByClassName('suppressed')
      for (let i = 0; i < suppressed.length; i++) {
        suppressed[i].style.zIndex = -1;
      }
      setTimeout( function() {
        this.props.disableShadow()
        this.forceUpdate()
      }.bind(this), 1250)
    }

  }

  render() {
    return (
      <div className='mainWrapper'>
        <div className = 'text-wrapper' ref='textWrapperElement'/>
        <LinksRow
          ref='linksWrapper'
          shadow={this.props.shadow}
        />
        <AsciiFaces
          ref='face'
          asciiText={asciiText}
          sentence={this.state.sentence}
          assignCoordinatesToLetters={this.assignCoordinatesToLetters}
          appendLinks={this.appendLinks}
          endAnimations={this.endAnimations}
          play={this.props.play}
        />
        <TitleName
          ref='titleNameElement'
          restartPlayback={!this.props.play ? this.restartPlayback : null}
        />
        <div>
          <div>
            <div>
              <please>
                <clean>
                  <your>
                    <computer>
                      <screen>
                        <secret ref='secret'>
                          <span
                            onMouseOver={startHoverEffect}
                            onMouseMove={this.props.shadow ? hoverShadow : mirroredHoverShadow}
                            onMouseOut={hideShadow}
                            onClick={this.shadowMode}>
                            Hello from the other side.
                          </span>
                          <span
                            className = 'hiddenText mirrored suppressed'
                            onMouseOver={startHoverEffect}
                            onMouseMove={hoverShadow }
                            onMouseOut={hideShadow}
                            onClick={this.shadowMode}>
                            Hello from the other side.
                          </span>
                        </secret>
                      </screen>
                    </computer>
                  </your>
                </clean>
              </please>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
