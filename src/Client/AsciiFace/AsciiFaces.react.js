import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { fadeAsciiRandomly, fadeAsciiTopToBottom, fadeAsciiBottomToTop} from './lib/faders.react'
import { onMobileSize, onDesktopSize } from './lib/windowSizeHelpers.react'
import { asciiText } from './lib/asciiText.react'

import './Style/asciiFaces.scss'
export default class AsciiFaces extends Component {
  constructor() {
    super()
    this.state = {
      left: 0,
      size: 1,
      sentence: 'About | Blog | Resume/CV | Code'
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
    this.createLinks = this.createLinks.bind(this)
    this.cueName = this.cueName.bind(this)
    this.skipToEnd = this.skipToEnd.bind(this)
  }

  componentDidMount() {

    this.parseAsciiText()
    this.parseSentence()
    let deviceEvent = onMobileSize() ? 'click' : 'mouseover'
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
    for (let i = 0; i < str.length; i++) {

      if (str.charAt(i).match(/[`]/g)) {
        newString += `<span class="ascii-band">${currentLine}</span>`
        newString += `<span class="ascii-letter">${str.charAt(i+1)}</span>`
        currentLine = ''
      }
      else if (str.charAt(i).match(/\W/g)) { currentLine += str.charAt(i) }
      else if (str.charAt(i).match(/\w/g)) { //need to parse this.state.sentence and make special characters into a code, then check for code and render character wrapped in ascii-letter
        newString += `<span class="ascii-band">${currentLine}</span>`
        newString += `<span class="ascii-letter">${str.charAt(i)}</span>`
        currentLine = ''
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
    let oldDeviceEvent = onMobileSize() ? 'click' : 'mouseover'
    let deviceEvent = onMobileSize() ? 'touchstart' : 'click'
    document.body.addEventListener(deviceEvent, this.skipToEnd)
    document.querySelector('code').removeEventListener(oldDeviceEvent, this.fadeAscii)

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
    let sentenceLetters = document.getElementsByClassName('sentence-letter')
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    let sentenceLeft = textWrapper.offsetLeft
    let duration = 1000
    let fadeInDuration = 2000
    let degrees = 1600

    for (let i = 0; i < letters.length; i++) {
      let degrees = (Math.random() * 800) + 800

      letters[i].style.transition = `all ${duration}ms linear`
      letters[i].style.position = 'absolute'
      letters[i].style.fontSize = '2.5rem'
      letters[i].style.top = textWrapper.offsetTop + ((6 * parseFloat(letters[i].style.fontSize.split('rem')[0])))
      letters[i].style.left = sentenceLeft + 'px'

      letters[i].addEventListener('transitionend', () => {
        letters[i].style.transition = 'transform 800ms ease-in-out, opacity 750ms linear'
        letters[i].style.opacity = 0
        i != letters.length - 1 ? letters[i].style.transform = `rotateY(${degrees}deg)` : letters[i].style.transform = `rotateY(360deg)`
        i != letters.length - 1 ? sentenceLetters[i].style.transition = `opacity ${fadeInDuration}ms ease-in-out` : sentenceLetters[i].style.transition = `opacity 4000ms ease-in-out`

        sentenceLetters[i].style.opacity = 1
        if (i === letters.length - 1) {
            setTimeout(this.createLinks, 4000)
            this.cueName()
        }
      })
      sentenceLeft += (textWrapper.clientWidth / sentenceLetters.length)
      duration += 150;
    }
  }

  mobileMoveLetters() {
    let letters = document.getElementsByClassName('ascii-letter')
    let sentenceLetters = document.getElementsByClassName('sentence-letter')
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    let sentenceLeft = 0
    let duration = 1000
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
            setTimeout(this.createLinks, 4000)
            this.cueName()
        }
      })
      sentenceLeft += ((window.innerWidth / (sentenceLetters.length - 1)) / 2)
      duration += 150;
    }
  }

  createLinks() {
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    let links = this.state.sentence.split(' | ')
    textWrapper.innerHTML = ''
    document.querySelector('code').style.display = 'none'
    for(let i = 0; i < links.length; i++) {
      let a = document.createElement('a')
      a.innerHTML = links[i];
      a.setAttribute('href', `/${links[i]}`)
      textWrapper.append(a)
      if (i < links.length - 1)
        textWrapper.innerHTML +=' | '
    }
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
          <div className = 'text-wrapper' ref='textWrapperElement' />
          {this.asciiFace()}
          <span id='myName' ref='myName'>Jeff Ahking</span>
        </div>

      </div>
    )
  }
}
