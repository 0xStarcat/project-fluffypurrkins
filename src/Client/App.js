import React, { Component } from 'react'
import Routes from './Routes.react'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

import { Provider } from 'react-redux'
import reducer from './Reducers'

const initialState = {}

const middleware = [thunk]
const enhancers = []

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(reducer, initialState, composedEnhancers)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}
