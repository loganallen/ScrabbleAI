import keyMirror from 'keymirror';

const ScrabbleActionTypes = keyMirror({
  ON_DROP_TILE: null,
  ON_TILE_PICK: null,
  ON_REFRESH_HAND: null,
  SET_TILES: null,
  EXECUTE_TURN: null
});

export default ScrabbleActionTypes;
