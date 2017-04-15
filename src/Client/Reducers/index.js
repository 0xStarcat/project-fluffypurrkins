export default (state = {play: true, shadow: false}, action) => {
  switch (action.type) {
    case 'STOP_PLAYBACK':
      return Object.assign({}, state, { play: false })

    case 'START_PLAYBACK':
      return Object.assign({}, state, { play: true })

    case 'DISABLE_SHADOW':
      return Object.assign({}, state, { shadow: false })

    case 'ENABLE_SHADOW':
      return Object.assign({}, state, { shadow: true })
      
    default:
      return state
  }
}
