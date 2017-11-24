import React from 'react';

import GameBoard from './components/GameBoard';

class Scrabble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Scrabble did mount');
    // Initialize the game board
  }

  render() {
    return (
      <div>
        <GameBoard />
      </div>
    );
  }
}

export default Scrabble;
