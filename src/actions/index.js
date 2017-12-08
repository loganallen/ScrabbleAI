import axios from 'axios';
import ScrabbleActionTypes from './ActionTypes';
import { _cloneBoard } from '../utils';

const onTilePick = (tile, index?) => ({
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

const onMoveTile = (tile, location) => (dispatch, getState) => {
  console.log('moving tile', tile, location);
  let board = _cloneBoard(getState().boardState.board);
  let [r,c] = location;
  board[r][c].tile = null;
  dispatch(updateBoard(board));
  dispatch(onTilePick(tile));
};

const onDropTile = (tile, location) => (dispatch, getState) => {
  console.log('dropping tile', tile, location);
  let board = _cloneBoard(getState().boardState.board);
  let [r,c] = location;
  board[r][c].tile = tile.tile;
  dispatch(updateBoard(board));
  if (tile.handIndex != null) {
    dispatch(removeTileFromHand(tile.handIndex));
  }
  axios.post('/analyzeBoardConfiguration', {
    board: board
  }).then(res => {
    let [words, points] = [res.data.words, res.data.points];
    console.log(words, points);
  }).catch(err => {
    console.log(err);
  });
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

const _validateWords = (words, points) => (dispatch, getState) => {
  axios.post('/validateWords', {
    words: words
  }).then(res => {
    if (res.data.valid) {
      // Set words on board, give points to player, replenish player's hand, switch turn
      dispatch(setTiles(getState().boardState.board));
      dispatch(executeTurn(points));
      console.log(`You played ${words} for ${points} points`);
    } else {
      console.log('Invalid words', res.data.invalidWords);
    }
  }).catch(err => {
    console.log(err);
  });
}

const _analyzeBoardConfiguration = (board) => (dispatch, getState) => {
  axios.post('/analyzeBoardConfiguration', {
    board: board
  }).then(res => {
    let [words, points] = [res.data.words, res.data.points];
    dispatch(_validateWords(words, points));
  }).catch(err => {
    console.log(err);
  });
};

const onPlayWord = () => (dispatch, getState) => {
  let state = getState();
  axios.post('/validateTilePlacement', {
    board: state.boardState.board,
    firstTurn: state.gameState.firstTurn
  }).then(res => {
    if (res.data.valid) {
      dispatch(_analyzeBoardConfiguration(state.boardState.board));
    } else {
      console.log(res.data.error);
    }
  }).catch(err => {
    console.log(err);
  });
};

const findBestWord = (hand) => (dispatch, getState) => {
  console.log('Finding best word...');
  let state = getState();
  axios.post('/findBestWord', {
    board: state.boardState.board,
    hand: hand
  }).then(res => {
    // TODO: Error detection from backend
    // Set words on board, give points to player, replenish player's hand, switch turn
    console.log(`Bot played [${res.data.words}] for ${res.data.points} points`);
    dispatch(setTiles(res.data.board));
    dispatch(executeTurn(res.data.points, res.data.hand));
  }).catch(err => {
    console.log(err);
  });
};

export default {
  onDropTile,
  onMoveTile,
  onTilePick,
  onRefreshHand,
  onPlayWord,
  findBestWord
};
