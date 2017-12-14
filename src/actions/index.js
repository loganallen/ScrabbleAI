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

const refreshHand = (playerId) => ({
  type: ScrabbleActionTypes.ON_REFRESH_HAND,
  playerId: playerId
});

const onRefreshHand = (playerId) => (dispatch, _) => {
  dispatch(refreshHand(playerId));
  dispatch(displayMessage());
};

const onShuffleHand = (playerId) => ({
  type: ScrabbleActionTypes.ON_SHUFFLE_HAND,
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

const updateMessage = (message?) => ({
  type: ScrabbleActionTypes.UPDATE_MESSAGE,
  message: message
});

const displayMessage = (message?) => (dispatch, _) => {
  dispatch(updateMessage(message));
  // Remove message after 5 seconds
  // setTimeout(() => {
  //   dispatch(updateMessage());
  // }, 5000);
};

const onMoveTile = (tile, location) => (dispatch, getState) => {
  let board = _cloneBoard(getState().boardState.board);
  let [r,c] = location;
  board[r][c].tile = null;
  dispatch(updateBoard(board));
  dispatch(onTilePick(tile));
};

const onDropTile = (tile, location) => (dispatch, getState) => {
  let state = getState();
  let board = _cloneBoard(state.boardState.board);
  let hand = state.gameState.players[state.gameState.turn].hand;

  let [r,c] = location;
  board[r][c].tile = tile.tile;
  dispatch(updateBoard(board));

  if (tile.handIndex != null) {
    dispatch(removeTileFromHand(tile.handIndex));
  }

  axios.post('/analyzeBoardConfiguration', {
    board: board,
    hand: hand
  }).then(res => {
    let [words, points] = [res.data.words, res.data.points];
    let msg = `Play ${words.join(', ')} for ${points} points`;
    dispatch(displayMessage({
      status: 'notification',
      text: msg
    }));
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
      let state = getState();
      dispatch(setTiles(state.boardState.board));
      dispatch(executeTurn(points));
      let name = state.gameState.playingBot ?
        'You' : state.gameState.playerNames[state.gameState.turn];
      dispatch(displayMessage({
        status: 'success',
        text: `${name} played ${words} for ${points} points`
      }));
    } else {
      let invalidWords = res.data.invalidWords.join(', ');
      let msg = `${invalidWords}`;
      if (res.data.invalidWords.length > 1) {
        msg += ' are not valid words';
      } else {
        msg += ' is not a valid word';
      }
      dispatch(displayMessage({
        status: 'error',
        text: msg
      }));
    }
  }).catch(err => {
    console.log(err);
  });
}

const _analyzeBoardConfiguration = (board, hand) => (dispatch, getState) => {
  axios.post('/analyzeBoardConfiguration', {
    board: board,
    hand: hand
  }).then(res => {
    let [words, points] = [res.data.words, res.data.points];
    dispatch(_validateWords(words, points));
  }).catch(err => {
    console.log(err);
  });
};

const onPlayWord = () => (dispatch, getState) => {
  let state = getState();
  let board = state.boardState.board;
  let hand = state.gameState.players[state.gameState.turn].hand;
  axios.post('/validateTilePlacement', {
    board: state.boardState.board,
    firstTurn: state.gameState.firstTurn
  }).then(res => {
    if (res.data.valid) {
      dispatch(_analyzeBoardConfiguration(board, hand));
    } else {
      dispatch(displayMessage({
        status: 'error',
        text: res.data.error
      }));
    }
  }).catch(err => {
    console.log(err);
  });
};

const findBestWord = (hand) => (dispatch, getState) => {
  let state = getState();
  axios.post('/findBestWord', {
    board: state.boardState.board,
    hand: hand,
    firstTurn: state.gameState.firstTurn,
    isGreedy: false,
    level: state.gameState.botLevel
  }).then(res => {
    // TODO: Error detection from backend
    let words = res.data.words.join(', ');
    let botName = state.gameState.playerNames[1];
    dispatch(displayMessage({
      status: 'success',
      text: `${botName} played ${words} for ${res.data.points} points`
    }));
    dispatch(setTiles(res.data.board));
    dispatch(executeTurn(res.data.points, res.data.hand));
  }).catch(err => {
    console.log(err);
  });
};

const onStartGame = (playerNames, playingBot, botLevelIdx) => ({
  type: ScrabbleActionTypes.ON_START_GAME,
  data: {
    playerNames,
    playingBot,
    botLevelIdx
  }
});

export default {
  onDropTile,
  onMoveTile,
  onTilePick,
  onRefreshHand,
  onShuffleHand,
  onPlayWord,
  findBestWord,
  onStartGame
};
