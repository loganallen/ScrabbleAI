import _ from 'underscore';
import ScrabbleActionTypes from '../actions/ActionTypes';
import { scrabbleLetters, botLevels } from '../utils';

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

  let players = [
    { hand: [], score: 0 },
    { hand: [], score: 0 }
  ];
  for (let i=0; i<7; i++) {
    players[0].hand.push(tiles.pop());
    players[1].hand.push(tiles.pop());
  }

  return {
    playerNames: ['', ''],
    playingBot: true,
    botLevel: botLevels[1],
    tiles,
    players,
    turn: 0,
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
  case ScrabbleActionTypes.ON_START_GAME:
    return {
      ...state,
      playerNames: action.data.playerNames,
      playingBot: action.data.playingBot,
      botLevel: botLevels[action.data.botLevelIdx]
    };
  case ScrabbleActionTypes.REMOVE_TILE_FROM_HAND: {
    let players = [...state.players];
    players[state.turn].hand[action.index].onBoard = true;

    return {
      ...state,
      players: players
    };
  }
  case ScrabbleActionTypes.ON_REFRESH_HAND: {
    let players = [...state.players];
    players[action.playerId].hand.forEach(tile => {
      tile.onBoard = false;
    });

    return {
      ...state,
      players: players
    };
  }
  case ScrabbleActionTypes.ON_SHUFFLE_HAND: {
    let players = [...state.players];
    let hand = players[action.playerId].hand;
    players[action.playerId].hand = _.shuffle(hand);

    return {
      ...state,
      players: players
    };
  }
  case ScrabbleActionTypes.EXECUTE_TURN: {
    let tiles = [...state.tiles];
    let players = [...state.players];
    let player = players[state.turn];

    player.score += action.points;
    player.hand = (action.hand ? action.hand : player.hand);
    player.hand = player.hand.filter(tile => !tile.onBoard);

    while (player.hand.length < 7 && tiles.length > 0) {
      let tile = tiles.pop();
      player.hand.push(tile);
    }

    let opponent = state.turn === 0 ? 1 : 0;

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
      firstTurn: state.firstTurn ? (action.points === 0) : false,
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
