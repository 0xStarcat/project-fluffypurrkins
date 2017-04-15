import React, {Component} from 'react'

export default class AsciiFormatter extends Component {
  constructor() {
    super()
    this.randomColor = this.randomColor.bind(this)
    this.parseAsciiText = this.parseAsciiText.bind(this)
    this.wrapChars = this.wrapChars.bind(this)
    this.randomSpot = this.randomSpot.bind(this)
    this.insertLetters = this.insertLetters.bind(this)
    this.mountAsciiFace = this.mountAsciiFace.bind(this)
  }

  componentDidMount() {
    this.mountAsciiFace()
  }

  mountAsciiFace() {
    this.parseAsciiText()
  }
  parseAsciiText() {

    let preparedAscii = this.insertLetters(this.props.asciiText, this.props.sentence)
    this.refs.codeElement.style.textShadow = `5px 5px 25px ${this.randomColor()}`
    this.refs.codeElement.innerHTML = this.wrapChars(preparedAscii)
  }
  randomColor() {
    let colors = ['aliceblue', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'almond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyandarkblue', 'darkcyan', 'darkgoldenrod', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dodgerblue', 'firebrick', 'forestgreen', 'fuchsia', 'gainsboro', 'gold', 'goldenrod', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightsteelblue', 'lightyellow', 'limelimegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navy', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosy', 'brown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'yellow', 'yellowgreen']
    let randomNumber = Math.floor(Math.random() * colors.length)
    return colors[randomNumber]
  }
  insertLetters(str, sentence) {
    let newAsciiString = ''
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i).match(/[@#]/) && sentence.length > 0 && this.randomSpot(sentence.length >= this.props.asciiText.length)) {
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
  randomSpot(checkForEnd) {
    let randomNumber = Math.round(Math.random() * 40)
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
      else if (str.charAt(i).match(/\w/g)) {
        newString += `<span class="ascii-band">${currentLine}</span>`
        newString += `<span class="ascii-letter" number=${numberOfLetters}>${str.charAt(i)}</span>`
        currentLine = ''
        numberOfLetters++
      }

      if (currentLine.length >= 700 || i >= (str.length -1))
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
