import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { fadeAsciiRandomly, fadeAsciiTopToBottom, fadeAsciiBottomToTop} from './lib/faders.react'
import { onMobileSize, onDesktopSize, onDesktop } from './lib/windowSizeHelpers.react'
import { asciiText } from './lib/asciiText.react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import './Style/asciiFaces.scss'
export default class AsciiFaces extends Component {
  constructor() {
    super()
    this.state = {
      sentence: 'About | Blog | C.V. | Code'
    }

    this.asciiFace = this.asciiFace.bind(this)

    //Add HTML tags to ascii face
    this.parseAsciiText = this.parseAsciiText.bind(this)
    this.wrapChars = this.wrapChars.bind(this)
    this.randomSpot = this.randomSpot.bind(this)

    //Add sentence letters to AsciiFace
    this.codifySentence = this.codifySentence.bind(this)
    this.parseSentence = this.parseSentence.bind(this)
    this.fadeAscii = this.fadeAscii.bind(this)

    //Make letters move
    // this.assignCoordinatesToLetters = this.assignCoordinatesToLetters.bind(this)
    this.moveLetters = this.moveLetters.bind(this)
    this.mobileMoveLetters = this.mobileMoveLetters.bind(this)

    //end animations
    this.endLetterTransition = this.endLetterTransition.bind(this)
    this.appendLettersToWrapper = this.appendLettersToWrapper.bind(this)
    this.createLinks = this.createLinks.bind(this)
    this.cueName = this.cueName.bind(this)
    this.skipToEnd = this.skipToEnd.bind(this)
  }

  componentDidMount() {

    this.parseAsciiText()
    if (onMobileSize()) this.parseSentence()
    let deviceEvent = onDesktop() ? 'mouseover' : 'click'
    document.querySelector('code').addEventListener(deviceEvent, this.fadeAscii)

  }

  codifySentence() {
    let sentence = this.state.sentence
    let newSentence = ''
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i].match(/[^\s\w]|\d|[ ]/)) { newSentence += `\`${sentence[i]}` }
      else { newSentence+=sentence[i] }
    }
    return newSentence
  }
  parseAsciiText() {
    let preparedAscii = this.insertLetters(asciiText(), this.codifySentence())
    document.querySelector('code').innerHTML = this.wrapChars(preparedAscii)

  }
  parseSentence() {
    let sentence = this.state.sentence
    let newSentence = ''
    for (let i = 0; i < (sentence.length); i++) { newSentence += `<span class='sentence-letter'>${sentence[i]}</span>` }
    document.querySelector('.text-wrapper').innerHTML = newSentence
  }
  randomSpot(checkForEnd) { //needs to improve to account for longer strings and number of @# in ascii maybe?
    let randomNumber = Math.round(Math.random() * 50)
    if (randomNumber === 0 || checkForEnd ) { return true }
    else { return false }
  }
  insertLetters(str, codifiedSentence) {
    let sentence = codifiedSentence
    let newAsciiString = ''
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/[@#]/) && sentence.length > 0 && this.randomSpot(sentence.length === asciiText().length)) {
        if (sentence.charAt(0).match(/[`]/)) {
          newAsciiString += sentence.substr(0, 2)
          sentence = sentence.substr(2)
        } else {
          newAsciiString += sentence.charAt(0)
          sentence = sentence.substr(1)
        }
      } else { newAsciiString += str.charAt(i) }
    }
    return newAsciiString
  }
  wrapChars(str) {
    let newString = ''
    let currentLine = ''
    let numberOfLetters = 0;
    for (let i = 0; i < str.length; i++) {

      if (str.charAt(i).match(/[`]/g)) {
        newString += `<span class="ascii-band">${currentLine}</span>`
        newString += `<span class="ascii-letter" number=${numberOfLetters}>${str.charAt(i+1)}</span>`
        currentLine = ''
        numberOfLetters++
      }
      else if (str.charAt(i).match(/\W/g)) { currentLine += str.charAt(i) }
      else if (str.charAt(i).match(/\w/g)) { //need to parse this.state.sentence and make special characters into a code, then check for code and render character wrapped in ascii-letter
        newString += `<span class="ascii-band">${currentLine}</span>`
        newString += `<span class="ascii-letter" number=${numberOfLetters}>${str.charAt(i)}</span>`
        currentLine = ''
        numberOfLetters++
      }

      if (currentLine.length >= 536 || i >= (str.length -1))
      {
        newString += `<span class="ascii-band">${currentLine}</span>`
        currentLine = ''
      }
    }
    return newString
  }

  fadeAscii() {
    let oldDeviceEvent = onDesktop() ? 'mouseover' : 'click'
    let deviceEvent = onDesktop() ? 'click' : 'touchend'
    document.querySelector('code').removeEventListener(oldDeviceEvent, this.fadeAscii)
    document.body.addEventListener(deviceEvent, this.skipToEnd)

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
    let letters = document.getElementsByClassName('ascii-letter')
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    let sentenceLeft = textWrapper.offsetLeft
    let duration = 2000
    let fadeInDuration = 2000

    for (let i = 0; i < letters.length; i++) {
      let degrees = 360 * ((Math.random() * 5) + 3)
      letters[i].style.transition = `all ${duration}ms linear, opacity ${duration*2}ms ease-in-out`
      letters[i].style.position = 'absolute'
      letters[i].style.fontSize = '25px'
      letters[i].style.top = textWrapper.offsetTop + 17 //why 17px? (25px(font-size) * 1.5 (line-height 150%))... still don't really know
      letters[i].style.left = sentenceLeft + 'px'
      letters[i].addEventListener('transitionend', this.endLetterTransition)
      sentenceLeft += 15 //why 15px? it's the width of every letter + letter-spacing in .text-wrapper
      duration += 100;
    }

  }

  endLetterTransition(event) {
    let degrees = 360 * (Math.random() * 3)
    let spinDuration = 1000;

    event.target.removeEventListener('transitionend', this.endLetterTransition)
    event.target.style.transition = `all ${spinDuration}ms ease-in-out, opacity ${spinDuration}ms linear`
    event.target.style.opacity = 0
    event.target.style.transform = `rotateY(${degrees}deg)`
    setTimeout(this.appendLettersToWrapper, spinDuration, event.target)

  }

  appendLettersToWrapper(letter) {
    let duration = 100 * (1 + parseInt(letter.getAttribute('number')))
    letter.removeEventListener('transitionend', this.appendLettersToWrapper)

    letter.style.transition = `all ${duration}ms ease-in-out`
    letter.style.transform = 'rotateY(0deg)'
    letter.style.opacity = 1
    if (parseInt(letter.getAttribute('number')) == this.state.sentence.split('').length - 1) {
      setTimeout(this.createLinks, duration)
    }
  }

  mobileMoveLetters() {
    let letters = document.getElementsByClassName('ascii-letter')
    let sentenceLetters = document.getElementsByClassName('sentence-letter')
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
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
        if (i === letters.length - 1) { setTimeout(this.createLinks, 3000) }
      })
      sentenceLeft += 15
      duration += 200;
    }
  }

  createLinks() {
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    let linksWrapper = ReactDOM.findDOMNode(this.refs.linksWrapper)
    // let links = this.state.sentence.split(' | ')
    textWrapper.innerHTML = ''
    document.querySelector('pre').style.display = 'none'
    linksWrapper.style.display = 'block'
    textWrapper.appendChild(ReactDOM.findDOMNode(this.refs.linksWrapper))
    // for(let i = 0; i < links.length; i++) {
    //   // let a = React.createElement(Link, {to: `/${links[i]}`.match(/[a-zA-Z0-9-]/g).join('').toLowerCase()}, `/${links[i]}`)
    //   // a.innerHTML = links[i];
    //   // a.setAttribute('href', `/${links[i]}`.match(/[a-zA-Z0-9-]/g).join('').toLowerCase())
    //   // textWrapper.append(a)
    //   // ReactDOM.render(a, document.querySelector('.text-wrapper'))
    //   // if (i < links.length - 1) textWrapper.innerHTML +=' | '
    // }
    this.cueName()
  }

  cueName() {
    let myName = document.querySelector('#myName')
    myName.style.opacity = 1
    myName.addEventListener('transitionend', () => { myName.style.borderBottom = '8px solid black' })
  }

  skipToEnd() {
    let oldDeviceEvent = onMobileSize() ? 'touchstart' : 'click'
    document.body.removeEventListener(oldDeviceEvent, this.skipToEnd)
    this.createLinks()
    this.cueName()
  }

  asciiFace() {
    return (
      <pre className='asciiFontSize'>
        <code ref='codeElement'>
          {asciiText()}
        </code>
    </pre>
    )
  }

  render() {
    return (
      <div>
        <div id='faceWrapper'>
          <div className = 'text-wrapper' ref='textWrapperElement'>

          </div>
          <div className = 'links-wrapper' ref='linksWrapper'>
            <Link to='/about'>About</Link><span> | </span>
            <Link to='/blog'>Blog</Link><span> | </span>
            <Link to='/cv'>C.V.</Link><span> | </span>
            <Link to='/code'>Code</Link>
          </div>
          {this.asciiFace()}
          <span id='myName' ref='myName'>Jeff Ahking</span>
        </div>
      </div>
    )
  }
}
