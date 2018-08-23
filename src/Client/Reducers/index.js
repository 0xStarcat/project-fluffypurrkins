import * as actions from '../Actions'

const initialState = {
  play: true,
  shadow: false,
  awaitingResponse: false,
  projects: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.STOP_PLAYBACK: {
      return { ...state, play: false }
    }

    case actions.START_PLAYBACK: {
      return { ...state, play: true }
    }

    case actions.DISABLE_SHADOW: {
      return { ...state, shadow: false }
    }

    case actions.ENABLE_SHADOW: {
      return { ...state, shadow: true }
    }

    case actions.AWAITING_RESPONSE: {
      return { ...state, awaitingResponse: true }
    }

    case actions.HANDLE_READ_PROJECTS_DATA: {
      console.log(action.data)
      return { ...state, projects: action.data, awaitingResponse: false }
    }

    default: {
      return state
    }
  }
}
