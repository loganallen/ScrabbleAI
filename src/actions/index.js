import ScrabbleActionTypes from './ActionTypes';
import API from '../API';

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

const onPlayWord = () => (dispatch, getState) => {
  try {
    let state = getState();
    let validTiles = API.validateTilePlacement(
      state.boardState.board,
      state.scrabbleState.firstTurn
    );
    if (validTiles) {
      var points = API.validateBoardWords(state.boardState.board);
    }
  } catch (e) {
    console.log('ERROR: ' + e.message);
  } finally {

  }
}

export default {
  onDropTile,
  onTilePick,
  onRefreshHand,
  onPlayWord
};
