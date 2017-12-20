import keyMirror from 'keymirror';

const ScrabbleActionTypes = keyMirror({
  SELECT_TILE: null,
  REFRESH_HAND: null,
  SHUFFLE_HAND: null,
  UPDATE_BOARD: null,
  REMOVE_TILE_FROM_HAND: null,
  RETURN_TILE_TO_HAND: null,
  SET_TILES: null,
  EXECUTE_TURN: null,
  UPDATE_MESSAGE: null,
  SET_POSSIBLE_POINTS: null,
  START_GAME: null
});

export default ScrabbleActionTypes;
