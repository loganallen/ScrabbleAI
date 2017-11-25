import React from 'react';
import {
  Header
} from 'semantic-ui-react';
import _ from 'underscore';

import GameBoard from './components/GameBoard';
import Hand from './components/Hand';
import { scrabbleLetters } from './models';

class Scrabble extends React.Component {
  constructor(props) {
    super(props);
    const tiles = this.initiateTiles();
    const players = {
      'p1': {
        hand: [],
        score: 0
      },
      'p2': {
        hand: [],
        score: 0
      }
    };
    for (let i=0; i<7; i++) {
      players['p1'].hand.push(tiles.pop());
      players['p2'].hand.push(tiles.pop());
    }

    this.state = {
      tiles: tiles,
      players: players,
      turn: Object.keys(players)[0]
    };
  }

  componentDidMount() {
    console.log('Scrabble did mount');
    // Initialize the game board
  }

  initiateTiles() {
    let tiles = [];

    Object.keys(scrabbleLetters).forEach(value => {
      const letters = scrabbleLetters[value];
      letters.forEach(letter => {
        for (let i=0; i<letter[1]; i++) {
          tiles.push({
            letter: letter[0],
            value: Number(value)
          });
        }
      });
    });

    for (let i=0; i<5; i++) {
      tiles = _.shuffle(tiles);
    }
    return tiles;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Header>Scrabble.ai</Header>
        <div style={styles.gameBoard}>
          <GameBoard />
        </div>
        <div style={styles.playerHands}>
          <Hand {...this.state.players['p1']} />
          <Hand {...this.state.players['p2']} />
        </div>
      </div>
    );
  }
}

const styles = {
  gameBoard: {
    display: 'inline-block',
    border: '1px solid gray'
  },
  playerHands: {
    margin: '25px',
    paddingTop: '50px',
    display: 'inline-block',
    border: '1px solid gray'
  }
}

export default Scrabble;
