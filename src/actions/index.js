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

const setTiles = () => ({
  type: ScrabbleActionTypes.SET_TILES
});

const executeTurn = (points) => ({
  type: ScrabbleActionTypes.EXECUTE_TURN,
  points: points
});

const onPlayWord = () => (dispatch, getState) => {
  try {
    let state = getState();
    let validTiles = API.validateTilePlacement(
      state.boardState.board,
      state.gameState.firstTurn
    );
    if (validTiles) {
      let [words, points] = API.generateWordsAndPoints(state.boardState.board);
      console.log(words + ', points: ' + points);

      let validWords = API.validateWords(words);
      if (validWords) {
        // Set words on board, give points to player, replenish player's hand, switch turn
        dispatch(setTiles());
        dispatch(executeTurn(points));
      }
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
