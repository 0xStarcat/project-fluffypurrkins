import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { fadeAsciiRandomly, fadeAsciiTopToBottom, fadeAsciiBottomToTop} from './lib/faders.react'
import { onMobileSize, onDesktopSize, onDesktop } from './lib/windowSizeHelpers.react'
import AsciiFormatter from './AsciiFormatter.react'
import { startPlayback } from '../Actions'
import './Style/asciiFaces.scss'
export default class AsciiFaces extends Component {
  constructor(props) {
    super(props)

    this.assignEventListener = this.assignEventListener.bind(this)
    //Add sentence letters to AsciiFace
    this.preparedSentence = this.preparedSentence.bind(this)
    this.wrapSentenceChars = this.wrapSentenceChars.bind(this)
    this.fadeAscii = this.fadeAscii.bind(this)

    //Make letters move
    this.moveLetters = this.moveLetters.bind(this)
    this.mobileMoveLetters = this.mobileMoveLetters.bind(this)

    //end animations
    this.clearFace = this.clearFace.bind(this)
    this.endLetterTransition = this.endLetterTransition.bind(this)
    this.appendLettersToWrapper = this.appendLettersToWrapper.bind(this)
  }

  componentDidMount() {
    if (this.props.play) {
      this.assignEventListener()
      this.props.assignCoordinatesToLetters()

    } else {
      this.clearFace()
    }

  }

  componentDidUpdate() {
    if (this.props.play) {
      this.assignEventListener()
      this.props.assignCoordinatesToLetters()

    } else {
      this.clearFace()
    }
  }

  assignEventListener() {
    if (this.props.play) {
      if (onMobileSize()) this.wrapSentenceChars()
      let deviceEvent = onDesktop() ? 'mouseover' : 'touchend'
      let deviceElement = onDesktop() ? document.querySelector('code') : document.body
      deviceElement.addEventListener(deviceEvent, this.fadeAscii)
      this.props.assignCoordinatesToLetters()
    }
  }

  wrapSentenceChars() {
    let sentence = this.props.sentence
    let newSentence = ''
    for (let i = 0; i < (sentence.length); i++) { newSentence += `<span class='sentence-letter'>${sentence[i]}</span>` }
    document.querySelector('.text-wrapper').innerHTML = newSentence
  }

  preparedSentence() {
    let sentence = this.props.sentence
    let newSentence = ''
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i].match(/[^\s\w]|\d|[ ]/)) { newSentence += `\`${sentence[i]}` }
      else { newSentence+=sentence[i] }
    }
    return newSentence
  }

  clearFace() {
    ReactDOM.findDOMNode(this.refs.formatter).style.display = 'none'
  }

  fadeAscii() {
    let oldDeviceEvent = onDesktop() ? 'mouseover' : 'touchend'
    let deviceEvent = onDesktop() ? 'click' : 'touchend'
    let deviceElement = onDesktop() ? document.querySelector('code') : document.body
    deviceElement.removeEventListener(oldDeviceEvent, this.fadeAscii)
    ReactDOM.findDOMNode(this.refs.formatter).addEventListener(deviceEvent, this.props.endAnimations)

    let randomFadeMethod = Math.floor(Math.random() * 3)
    let moveLettersMethod = onDesktopSize() ? this.moveLetters : this.mobileMoveLetters
    switch (randomFadeMethod) {
      case 0:
      fadeAsciiRandomly(moveLettersMethod)
      break
      case 1:
      fadeAsciiTopToBottom(moveLettersMethod)
      break
      case 2:
      fadeAsciiBottomToTop(moveLettersMethod)
      break
    }
  }
  moveLetters() {
    this.refs.formatter.refs.codeElement.style.textShadow = ''
    let letters = document.getElementsByClassName('ascii-letter')
    let textWrapper = document.querySelector('.text-wrapper')
    let sentenceLeft = textWrapper.offsetLeft
    let duration = 1250
    let fadeInDuration = 2000

    for (let i = 0; i < letters.length; i++) {
      let degrees = 360 * ((Math.random() * 5) + 3)
      letters[i].style.transition = `all ${duration}ms ease-in-out, opacity ${duration*2}ms ease-in-out`
      letters[i].style.position = 'absolute'
      letters[i].style.top = textWrapper.offsetTop + 17 //why 17px? (25px(font-size) * 1.5 (line-height 150%))... still don't really know
      letters[i].style.left = sentenceLeft + 'px'
      letters[i].style.fontSize = '25px'
      letters[i].addEventListener('transitionend', this.endLetterTransition)
      sentenceLeft += 15 //why 15px? it's the width of every letter + letter-spacing in .text-wrapper
      duration += 75;
    }
  }

  endLetterTransition(event) {
    let degrees = (1500 - (1500 * (parseInt(event.target.getAttribute('number')))) / this.props.sentence.split('').length-1 ) + 540
    let spinDuration = 2000;
    if (parseInt(event.target.getAttribute('number')) == this.props.sentence.split('').length - 1) { degrees = 360 }
    event.target.removeEventListener('transitionend', this.endLetterTransition)
    event.target.style.transition = `all ${spinDuration}ms ease-in-out, opacity ${spinDuration}ms ease-in-out`
    event.target.style.opacity = 0
    event.target.style.transform = `rotateY(${degrees}deg)`
    event.target.style.webkitTransform = `rotateY(${degrees}deg)`
    setTimeout(this.appendLettersToWrapper, spinDuration, event.target)
  }

  appendLettersToWrapper(letter) {
    let duration = 150 * (1 + parseInt(letter.getAttribute('number')))
    letter.removeEventListener('transitionend', this.appendLettersToWrapper)
    letter.style.transition = `opacity ${duration}ms ease-in-out`
    letter.style.transform = 'rotateY(0deg)'
    letter.style.webkitTransform = 'rotateY(0deg)'
    letter.style.opacity = 1
    if (parseInt(letter.getAttribute('number')) == this.props.sentence.split('').length - 1) {
      setTimeout(this.props.endAnimations, duration / 2.5)
    }
  }

  mobileMoveLetters() {
    this.refs.formatter.refs.codeElement.style.textShadow = ''
    let letters = document.getElementsByClassName('ascii-letter')
    let sentenceLetters = document.getElementsByClassName('sentence-letter')
    let textWrapper = document.querySelector('.text-wrapper')
    let sentenceLeft = window.innerWidth * 0.05
    let duration = 1500
    for (let i = 0; i < letters.length; i++) {
      letters[i].style.transition = `all ${duration}ms linear`
      letters[i].style.position = 'absolute'
      letters[i].style.fontSize = '10rem'
      letters[i].style.top = '-100%'
      letters[i].style.left = sentenceLeft + 'px'
      letters[i].addEventListener('transitionend', () => {
        letters[i].style.transition = 'all 800ms ease-in-out, opacity 750ms linear'
        letters[i].style.top = '200%'
        letters[i].style.fontSize = '10rem'
        sentenceLetters[i].style.transition = 'opacity 3000ms ease-in-out'
        sentenceLetters[i].style.opacity = 1
        if (i === letters.length - 1) {
          setTimeout( this.props.endAnimations, 3000)
        }
      })
      sentenceLeft += 15
      duration += 200;
    }
  }

  render() {
    return (
      <div>
        <AsciiFormatter
          ref='formatter'
          asciiText={this.props.asciiText}
          sentence={this.preparedSentence()}
        />
      </div>
    )
  }
}
