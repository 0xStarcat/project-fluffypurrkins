export default (state = {play: true}, action) => {
  switch (action.type) {
    case 'STOP_PLAYBACK':
      return {
        play: false
      }
    case 'START_PLAYBACK':
      return {
        play: true
      }
    default:
      return state
  }
}
