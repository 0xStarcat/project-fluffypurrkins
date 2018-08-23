import {connect} from 'react-redux'
import {stopPlayback, startPlayback, disableShadow, enableShadow} from '../Actions/index.js'
import WindowSizer from '../Home/WindowSizer.react'

const mapStateToProps = (state) => {
  return {play: state.play, shadow: state.shadow}
}

const mapDispatchToProps = {
  stopPlayback: stopPlayback,
  startPlayback: startPlayback,
  disableShadow: disableShadow,
  enableShadow: enableShadow
}

const AsciiContainer = connect(mapStateToProps, mapDispatchToProps)(WindowSizer)

export default AsciiContainer
