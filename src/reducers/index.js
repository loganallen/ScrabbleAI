import { combineReducers } from 'redux';
import scrabbleReducer from './ScrabbleReducer';
import boardReducer from './BoardReducer';

const reducer = combineReducers({
  gameState: scrabbleReducer,
  boardState: boardReducer
});

export default reducer;
