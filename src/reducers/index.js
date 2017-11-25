import { combineReducers } from 'redux';
import scrabbleReducer from './ScrabbleReducer';
import boardReducer from './BoardReducer';

const reducer = combineReducers({
  scrabble: scrabbleReducer,
  board: boardReducer
});

export default reducer;
