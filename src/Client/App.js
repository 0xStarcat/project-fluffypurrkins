import React, { Component } from 'react';

import WindowContainer from './AsciiFace/WindowContainer.react'

export default class App extends Component {
  constructor() { super() }

  render() {
    return (
    <div className="App">
      <WindowContainer />
    </div>
    );
  }
}
