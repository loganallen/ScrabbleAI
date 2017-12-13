import React, { Component } from 'react';

import './css/index.css';
import Scrabble from './components/Scrabble';

class App extends Component {
  render() {
    return (
      <div>
        <h1 className='scrabbleHeader'>
          Scrabble.ai
        </h1>
        <Scrabble />
      </div>
    );
  }
}



export default App;
