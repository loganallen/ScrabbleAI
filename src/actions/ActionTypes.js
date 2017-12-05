import keyMirror from 'keymirror';

const ScrabbleActionTypes = keyMirror({
  ON_TILE_PICK: null,
  ON_REFRESH_HAND: null,
  UPDATE_BOARD: null,
  REMOVE_TILE_FROM_HAND: null,
  UPDATE_HAND_POINTS: null,
  SET_TILES: null,
  EXECUTE_TURN: null
});

export default ScrabbleActionTypes;
