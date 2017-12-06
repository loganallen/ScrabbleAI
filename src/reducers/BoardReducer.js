import ScrabbleActionTypes from '../actions/ActionTypes';
import { boardSpaceMap } from '../models';
import { BoardSpaceTypes } from '../models'

const initiateGameBoard = () => {
  let board = [];
  for (let i=0; i<15; i++) {
    board[i] = [];
  }
  Object.keys(boardSpaceMap).forEach(spaceType => {
    let locs = boardSpaceMap[spaceType];
    locs.forEach(loc => {
      let spots = loc.split(',');
      let [r,c] = spots.map(e => e-1);
      board[r][c] = {
        location: [r,c],
        type: spaceType,
        tile: null,
        isSet: false
      };
    });
  });
  for (let r=0; r<15; r++) {
    for (let c=0; c<15; c++) {
      if (board[r][c]) continue;
      board[r][c] = {
        location: [r,c],
        type: BoardSpaceTypes.DEFAULT,
        tile: null,
        isSet: false
      };
    }
  }
  return board;
}

const initialState = {
  board: initiateGameBoard(),
  selectedTile: null
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
  case ScrabbleActionTypes.ON_TILE_PICK:
    return {
      ...state,
      selectedTile: {
        tile: action.data.tile,
        handIndex: action.data.index
      }
    };
  case ScrabbleActionTypes.ON_REFRESH_HAND: {
    let board = [...state.board];
    board.forEach(row => {
      row.forEach(space => {
        if (!space.isSet) { space.tile = null; }
      });
    });
    return {
      ...state,
      board: board
    };
  }
  case ScrabbleActionTypes.UPDATE_BOARD: {
    return {
      ...state,
      board: action.board,
      selectedTile: null
    };
  }
  case ScrabbleActionTypes.SET_TILES: {
    let board = action.board;
    board.forEach(row => {
      row.forEach(space => {
        if (space.tile) { space.isSet = true; }
      });
    });
    return {
      ...state,
      board: board
    };
  }
  default:
    return state;
  }
};

export default boardReducer;
