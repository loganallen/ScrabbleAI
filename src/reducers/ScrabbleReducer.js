import _ from 'underscore';
import ScrabbleActionTypes from '../actions/ActionTypes';
import { scrabbleLetters } from '../models';

const initiateScrabbleState = () => {
  let tiles = [];
  Object.keys(scrabbleLetters).forEach(value => {
    const letters = scrabbleLetters[value];
    letters.forEach(letter => {
      for (let i=0; i<letter[1]; i++) {
        tiles.push({
          letter: letter[0],
          value: Number(value),
          onBoard: false
        });
      }
    });
  });
  for (let i=0; i<5; i++) {
    tiles = _.shuffle(tiles);
  }

  let players = {
    'p1': { hand: [], score: 0 },
    'p2': { hand: [], score: 0 }
  };
  for (let i=0; i<7; i++) {
    players['p1'].hand.push(tiles.pop());
    players['p2'].hand.push(tiles.pop());
  }

  return {
    tiles,
    players,
    turn: 'p1'
  };
}

const initialState = {
  ...initiateScrabbleState()
};

const scrabbleReducer = (state = initialState, action) => {
  switch (action.type) {
  case ScrabbleActionTypes.ON_DROP_TILE:
    console.log('heeere', action);
    const players = Object.assign({}, state.players);
    players[state.turn].hand[action.data.handIndex].onBoard = true;
    return {
      ...state,
      players: players
    };
  default:
    return state;
  }
};

export default scrabbleReducer;
