import React, { Component } from 'react';

import AsciiFaceSizeWrapper from './AsciiFace/AsciiFaceSizeWrapper.react'

export default class App extends Component {
  constructor() { super() }

  render() {
    return (
    <div className="App">
      <AsciiFaceSizeWrapper />
    </div>
    );
  }
}
