import React, { Component } from 'react';
import logo from './assets/logo.svg';
import './css/App.css';

import Scrabble from './Scrabble';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Scrabble.ai</h1>
        </header>
        <Scrabble />
      </div>
    );
  }
}

export default App;
