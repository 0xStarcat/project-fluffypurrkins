export const STOP_PLAYBACK = 'STOP_PLAYBACK'
export const START_PLAYBACK = 'START_PLAYBACK'
export const DISABLE_SHADOW = 'DISABLE_SHADOW'
export const ENABLE_SHADOW = 'ENABLE_SHADOW'

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
