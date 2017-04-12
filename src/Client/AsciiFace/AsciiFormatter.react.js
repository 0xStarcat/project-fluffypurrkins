import React, {Component} from 'react'

export default class AsciiFormatter extends Component {
  constructor() {
    super()
    this.parseAsciiText = this.parseAsciiText.bind(this)
    this.wrapChars = this.wrapChars.bind(this)
    this.randomSpot = this.randomSpot.bind(this)
    this.insertLetters = this.insertLetters.bind(this)
  }

  componentDidMount() {
    this.parseAsciiText()
  }

  parseAsciiText() {
    let preparedAscii = this.insertLetters(this.props.asciiText, this.props.sentence)
    this.refs.codeElement.innerHTML = this.wrapChars(preparedAscii)
  }
  insertLetters(str, sentence) {
    let newAsciiString = ''
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/[@#]/) && sentence.length > 0 && this.randomSpot(sentence.length === this.props.asciiText.length)) {
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
  randomSpot(checkForEnd) { //needs to improve to account for longer strings and number of @# in ascii maybe?
    let randomNumber = Math.round(Math.random() * 50)
    if (randomNumber === 0 || checkForEnd ) { return true }
    else { return false }
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
      else if (str.charAt(i).match(/\w/g)) { //need to parse this.props.sentence and make special characters into a code, then check for code and render character wrapped in ascii-letter
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

  render() {
    return (
      <pre className='asciiFontSize'>
        <code ref='codeElement'/>
      </pre>
    )
  }
}
