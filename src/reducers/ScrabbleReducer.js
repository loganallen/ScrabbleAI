import _ from 'underscore';
import ScrabbleActionTypes from '../actions/ActionTypes';
import { scrabbleLetters } from '../utils';

const initiategameState = () => {
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
    turn: 'p1',
    possiblePoints: 0,
    firstTurn: true,
    message: null,
    gameOver: false
  };
}

const initialState = {
  ...initiategameState()
};

const scrabbleReducer = (state = initialState, action) => {
  switch (action.type) {
  case ScrabbleActionTypes.REMOVE_TILE_FROM_HAND: {
    let players = Object.assign({}, state.players);
    players[state.turn].hand[action.index].onBoard = true;
    return {
      ...state,
      players: players
    };
  }
  case ScrabbleActionTypes.ON_REFRESH_HAND: {
    let players = Object.assign({}, state.players);
    players[action.playerId].hand.forEach(tile => {
      tile.onBoard = false;
    });
    return {
      ...state,
      players: players
    };
  }
  case ScrabbleActionTypes.EXECUTE_TURN: {
    let tiles = [...state.tiles];
    let players = Object.assign({}, state.players);
    let player = players[state.turn];

    player.score += action.points;
    player.hand = (action.hand ? action.hand : player.hand);
    player.hand = player.hand.filter(tile => !tile.onBoard);

    while (player.hand.length < 7 && tiles.length > 0) {
      let tile = tiles.pop();
      player.hand.push(tile);
    }

    let opponent = state.turn === 'p1' ? 'p2' : 'p1';

    // Add 2x the points leftover in the opponent's hand
    if (player.hand.length === 0) {
      let oppHand = players[opponent].hand;
      let leftoverPoints = oppHand.reduce((acc, tile) => acc + tile.value, 0);
      player.score += 2*leftoverPoints;
    }

    return {
      ...state,
      tiles: _.shuffle(tiles),
      players: players,
      turn: opponent,
      firstTurn: false,
      gameOver: player.hand.length === 0
    }
  }
  case ScrabbleActionTypes.UPDATE_MESSAGE:
    return {
      ...state,
      message: action.message
    };
  case ScrabbleActionTypes.SET_POSSIBLE_POINTS:
    return {
      ...state,
      possiblePoints: action.points
    };
  default:
    return state;
  }
};

export default scrabbleReducer;
