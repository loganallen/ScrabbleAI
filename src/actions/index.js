import ScrabbleActionTypes from './ActionTypes';

const onTilePick = (tile, index) => ({
  type: ScrabbleActionTypes.ON_TILE_PICK,
  data: {
    tile,
    index
  }
});

const onRefreshHand = (playerId) => ({
  type: ScrabbleActionTypes.ON_REFRESH_HAND,
  playerId: playerId
});

const onDropTile = (tile, location) => ({
  type: ScrabbleActionTypes.ON_DROP_TILE,
  data: {
    tile: tile.tile,
    handIndex: tile.handIndex,
    location: location
  }
});

export default {
  onDropTile,
  onTilePick,
  onRefreshHand
};
