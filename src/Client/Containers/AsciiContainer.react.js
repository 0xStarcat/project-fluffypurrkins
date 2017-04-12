import { connect } from 'react-redux'
import { stopPlayback, startPlayback } from '../Actions/index.js'
import WindowSizer from '../AsciiFace/WindowSizer.react'

const mapStateToProps = (state) => ({
  play: state.play
})

const mapDispatchToProps = {
  stopPlayback: stopPlayback,
  startPlayback: startPlayback
}

const AsciiContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowSizer)

export default AsciiContainer
