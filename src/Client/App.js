import React, { Component } from 'react';
import Routes from './Routes.react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './Reducers'
const store = createStore(reducer)

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
