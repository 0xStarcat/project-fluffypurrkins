import * as actions from '../Actions'

const initialState = {
  play: true,
  shadow: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.STOP_PLAYBACK: {
      return {
        ...state,
        play: false
      }
    }

    case actions.START_PLAYBACK: {
      return {
        ...state,
        play: true
      }
    }

    case actions.DISABLE_SHADOW: {
      return {
        ...state,
        shadow: false
      }
    }

    case actions.ENABLE_SHADOW: {
      return {
        ...state,
        shadow: true
      }
    }

    default: {
      return state
    }
  }
}
