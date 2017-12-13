import keyMirror from 'keymirror';

const ScrabbleActionTypes = keyMirror({
  ON_TILE_PICK: null,
  ON_REFRESH_HAND: null,
  ON_SHUFFLE_HAND: null,
  UPDATE_BOARD: null,
  REMOVE_TILE_FROM_HAND: null,
  SET_TILES: null,
  EXECUTE_TURN: null,
  UPDATE_MESSAGE: null,
  SET_POSSIBLE_POINTS: null
});

export default ScrabbleActionTypes;
