import Axios from 'axios'

export const STOP_PLAYBACK = 'STOP_PLAYBACK'
export const START_PLAYBACK = 'START_PLAYBACK'
export const DISABLE_SHADOW = 'DISABLE_SHADOW'
export const ENABLE_SHADOW = 'ENABLE_SHADOW'

export const AWAITING_RESPONSE = 'AWAITING_RESPONSE'
export const HANDLE_READ_PROJECTS_DATA = 'HANDLE_READ_PROJECTS_DATA'
export const HANDLE_ERROR_RESPONSE = 'HANDLE_ERROR_RESPONSE'

export const stopPlayback = () => ({
  type: STOP_PLAYBACK
})

export const startPlayback = () => ({
  type: START_PLAYBACK
})

export const disableShadow = () => ({
  type: DISABLE_SHADOW
})

export const enableShadow = () => ({
  type: ENABLE_SHADOW
})

export const awaitingResponse = () => ({
  type: AWAITING_RESPONSE
})

export const handleReadProjectsData = response => ({
  type: HANDLE_READ_PROJECTS_DATA,
  data: response.data
})

export const handleErrorResponse = error => ({
  type: HANDLE_ERROR_RESPONSE,
  data: error
})

export const fetchProjects = () => dispatch => {
  dispatch(awaitingResponse())
  Axios.get('https://cms.starcat.xyz/project')
    .then(response => {
      dispatch(handleReadProjectsData(response))
    })
    .catch(error => {
      dispatch(handleErrorResponse(error))
    })
}
