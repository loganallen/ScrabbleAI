import axios from 'axios';
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

const updateBoard = (board) => ({
  type: ScrabbleActionTypes.UPDATE_BOARD,
  board: board
});

const removeTileFromHand = (index) => ({
  type: ScrabbleActionTypes.REMOVE_TILE_FROM_HAND,
  index: index
});

const updatePointsForHand = (points) => ({
  type: ScrabbleActionTypes.UPDATE_HAND_POINTS,
  points: points
});

const onDropTile = (tile, location) => (dispatch, getState) => {
  let board = [...getState().boardState.board];
  let [r,c] = location;
  board[r][c].tile = tile.tile;
  dispatch(updateBoard(board));
  dispatch(removeTileFromHand(tile.handIndex));
  let [words, points] = API.generateWordsAndPoints(board);
  console.log(words + ', points: ' + points);
  // dispatch(updatePointsForHand(points));
};

const setTiles = (board) => ({
  type: ScrabbleActionTypes.SET_TILES,
  board: board
});

const executeTurn = (points, hand?) => ({
  type: ScrabbleActionTypes.EXECUTE_TURN,
  points: points,
  hand: hand
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

      axios.post('/validateWords', {
        words: words
      }).then(res => {
        if (res.data.valid) {
          // Set words on board, give points to player, replenish player's hand, switch turn
          dispatch(setTiles(state.boardState.board));
          dispatch(executeTurn(points));
        } else {
          console.log('Invalid words', res.data.invalidWords);
        }
      }).catch(err => {
        console.log(err);
      });
    }
  } catch (e) {
    console.log('ERROR: ' + e.message);
  } finally {

  }
}

const findBestWord = (hand) => (dispatch, getState) => {
  console.log('Finding best word...');
  let state = getState();
  axios.post('/findBestWord', {
    board: state.boardState.board,
    hand: hand
  }).then(res => {
    // TODO: Error detection from backend
    // Set words on board, give points to player, replenish player's hand, switch turn
    dispatch(setTiles(res.data.board));
    dispatch(executeTurn(res.data.points, res.data.hand));
  }).catch(err => {
    console.log(err);
  });
}

export default {
  onDropTile,
  onTilePick,
  onRefreshHand,
  onPlayWord,
  findBestWord
};
