import ScrabbleActionTypes from '../actions/ActionTypes';

const initialState = {
  tiles: [],
  board: []
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ScrabbleActionTypes.ON_DROP_TILE:
      console.log('Drop tile...');
      return state;
    default:
      return state;
  }
};

export default boardReducer;
