import ScrabbleActionTypes from './ActionTypes';

const onTilePick = (tile, index) => ({
  type: ScrabbleActionTypes.ON_TILE_PICK,
  data: {
    tile,
    index
  }
});

const onDropTile = (tile, location) => ({
  type: ScrabbleActionTypes.ON_DROP_TILE,
  data: {
    tile: tile.tile,
    handIndex: tile.handIndex,
    location: location
  }
});

const onBoardSpaceClick = (location, tile) => (dispatch, getState) => {
  const state = getState();
  console.log('Board space click', state);
};

export default {
  onDropTile,
  onTilePick
};
