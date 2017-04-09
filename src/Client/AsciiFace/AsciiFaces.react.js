import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { fadeAsciiRandomly, fadeAsciiTopToBottom, fadeAsciiBottomToTop} from './lib/faders.react'
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
    this.updateDimensions = this.updateDimensions.bind(this)

    //Add HTML tags to ascii face
    this.parseAsciiText = this.parseAsciiText.bind(this)
    this.wrapChars = this.wrapChars.bind(this)
    this.randomSpot = this.randomSpot.bind(this)

    //Add sentence letters to AsciiFace
    this.codifySentence = this.codifySentence.bind(this)
    this.parseSentence = this.parseSentence.bind(this)
    this.fadeAscii = this.fadeAscii.bind(this)

    //Make letters move
    this.assignCoordinatesToLetters = this.assignCoordinatesToLetters.bind(this)
    this.moveLetters = this.moveLetters.bind(this)
    this.mobileMoveLetters = this.mobileMoveLetters.bind(this)

    //end animations
    this.createLinks = this.createLinks.bind(this)
    this.cueName = this.cueName.bind(this)
    this.skipToEnd = this.skipToEnd.bind(this)
  }

  componentWillMount() { window.addEventListener("resize", this.updateDimensions) }
  componentWillUnmount() { window.removeEventListener("resize", this.updateDimensions) }
  componentDidMount() {
    this.updateDimensions()
    this.parseAsciiText()
    this.parseSentence()
    document.querySelector('code').addEventListener('mouseover', this.fadeAscii)
  }
  updateDimensions() {
    let code = ReactDOM.findDOMNode(this.refs.codeElement)
    let textWrapper = ReactDOM.findDOMNode(this.refs.textWrapperElement)
    let jeffName = ReactDOM.findDOMNode(this.refs.jeffName)
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let windowOffset = window.innerWidth > 768 ? 0.25 : 0.3


    code.style.fontSize = Math.min(windowWidth * 0.01, 11)
    code.style.lineHeight = Math.min(Math.max((windowWidth * 0.005), 3.5), 5.6)+'px'
    code.style.left = (windowWidth - code.offsetWidth) / 2
    code.style.top = (windowHeight - code.offsetHeight) / 2
    textWrapper.style.left = code.style.display !== 'none' ? code.style.left : windowWidth * 0.15
    textWrapper.style.top = code.style.display !== 'none' && window.innerWidth > 768 ?
      parseInt(code.style.top.split('px')[0]) + (code.getBoundingClientRect().height * windowOffset) :
      (windowHeight * windowOffset)

    jeffName.style.left = window.innerWidth > 768 ? '50%' : textWrapper.style.left

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
    this.assignCoordinatesToLetters()
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

  assignCoordinatesToLetters() {
    let letters = document.getElementsByClassName('ascii-letter')
    for (let i = 0; i < (letters.length); i++) {
      var rect = letters[i].getBoundingClientRect()
      letters[i].style.top = letters[i].offsetTop
      letters[i].style.left = letters[i].offsetLeft
    }
  }
  fadeAscii() {
    document.body.addEventListener('click', this.skipToEnd)
    document.querySelector('code').removeEventListener('mouseover', this.fadeAscii)

    let randomFadeMethod = Math.floor(Math.random() * 3)
    let moveLettersMethod = window.innerWidth > 768 ? this.moveLetters : this.mobileMoveLetters
    console.log(window.innerWidth)
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
    let sentenceLeft = 0
    let duration = 1000
    let fadeInDuration = 2000
    let degrees = 1600

    for (let i = 0; i < letters.length; i++) {
      let degrees = (Math.random() * 800) + 800

      letters[i].style.transition = `all ${duration}ms linear`
      letters[i].style.position = 'absolute'
      letters[i].style.fontSize = '2.5rem'
      letters[i].style.top = parseInt(textWrapper.style.top.split('px')[0]) - parseInt(document.querySelector('code').style.top.split('px')[0]) + ((6 * parseFloat(letters[i].style.fontSize.split('rem')[0])))
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
    let jeffName = document.querySelector('#jeffName')
    jeffName.style.opacity = 1
    jeffName.addEventListener('transitionend', () => { jeffName.style.borderBottom = '8px solid black' })
  }

  skipToEnd() {
    document.body.removeEventListener('click', this.skipToEnd)
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
        </div>
        <span id='jeffName' ref='jeffName'>Jeff Ahking</span>
      </div>
    )
  }
}
