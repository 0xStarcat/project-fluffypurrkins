import React, { Component } from 'react'
import Routes from './Routes.react'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import ReactGA from 'react-ga'

import { Provider } from 'react-redux'
import reducer from './Reducers'
import { trackProjectOpen } from './utilities'

const initialState = {}

const middleware = [thunk]
const enhancers = []

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(reducer, initialState, composedEnhancers)

export default class App extends Component {
  constructor() {
    super()
    ReactGA.initialize(process.env.REACT_GA_CODE, {
      debug: process.env.ENVIRONMENT === 'development'
    })
    ReactGA.pageview(window.location.pathname)

    trackProjectOpen(window.location)
  }
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
