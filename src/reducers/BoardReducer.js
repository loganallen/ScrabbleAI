import ScrabbleActionTypes from '../actions/ActionTypes';
import { boardSpaceMap } from '../models';

const initiateGameBoard = () => {
  let board = [];
  for (let i=0; i<15; i++) {
    board[i] = [];
  }
  Object.keys(boardSpaceMap).forEach(key => {
    let locs = boardSpaceMap[key];
    locs.forEach(loc => {
      let spots = loc.split(',');
      let [x,y] = spots.map(e => e-1);
      board[x][y] = {
        location: [x,y],
        type: key,
        tile: null
      };
    });
  });
  for (let r=0; r<15; r++) {
    for (let c=0; c<15; c++) {
      if (board[r][c]) continue;
      board[r][c] = {
        location: [r,c],
        type: 'DEFAULT',
        tile: null
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
    console.log('Tile picked', action);
    return {
      ...state,
      selectedTile: {
        tile: action.data.tile,
        handIndex: action.data.index
      }
    };
  case ScrabbleActionTypes.ON_DROP_TILE:
    console.log('Dropped tile...', action);
    let [x,y] = action.data.location;
    let updatedBoard = Object.assign({}, state.board);
    updatedBoard[x][y].tile = action.data.tile;
    return {
      ...state,
      board: updatedBoard,
      selectedTile: null
    };
  default:
    return state;
  }
};

export default boardReducer;
