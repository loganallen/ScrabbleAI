import axios from 'axios';
import ScrabbleActionTypes from './ActionTypes';
import { _cloneBoard } from '../utils';

const onStartGame = (playerNames, playingBot, botLevelIdx) => ({
  type: ScrabbleActionTypes.START_GAME,
  data: {
    playerNames,
    playingBot,
    botLevelIdx
  }
});

const onSelectTile = (tile, index?) => ({
  type: ScrabbleActionTypes.SELECT_TILE,
  data: {
    tile,
    index
  }
});

const refreshHand = (playerId) => ({
  type: ScrabbleActionTypes.REFRESH_HAND,
  playerId: playerId
});

const shuffleHand = (playerId) => ({
  type: ScrabbleActionTypes.SHUFFLE_HAND,
  playerId: playerId
});

const onRefreshHand = () => (dispatch, getState) => {
  let playerId = getState().gameState.turn;
  dispatch(refreshHand(playerId));
  dispatch(displayMessage());
};

const onShuffleHand = () => (dispatch, getState) => {
  let playerId = getState().gameState.turn;
  dispatch(shuffleHand(playerId));
};

const removeTileFromHand = (index) => ({
  type: ScrabbleActionTypes.REMOVE_TILE_FROM_HAND,
  index: index
});

const returnTileToHand = (tile) => ({
  type: ScrabbleActionTypes.RETURN_TILE_TO_HAND,
  tile: tile
});

const updateBoard = (board) => ({
  type: ScrabbleActionTypes.UPDATE_BOARD,
  board: board
});

const updateMessage = (message?) => ({
  type: ScrabbleActionTypes.UPDATE_MESSAGE,
  message: message
});

const displayMessage = (message?) => (dispatch, _) => {
  dispatch(updateMessage(message));
  // Message timeout of 5 seconds
  // setTimeout(() => {
  //   dispatch(updateMessage());
  // }, 5000);
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

const onPickupTile = (tile, location) => (dispatch, getState) => {
  let board = _cloneBoard(getState().boardState.board);
  let [r,c] = location;
  board[r][c].tile = null;
  dispatch(updateBoard(board));
  dispatch(returnTileToHand(tile));
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
      let state = getState();
      dispatch(setTiles(state.boardState.board));
      dispatch(executeTurn(points));
      let name = state.gameState.playingBot ?
        'You' : state.gameState.playerNames[state.gameState.turn];
      dispatch(displayMessage({
        status: 'success',
        text: `${name} played ${words.join(', ')} for ${points} points`
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

const onSkipTurn = () => (dispatch, getState) => {
  let state = getState();
  let playerId = state.gameState.turn;
  dispatch(onRefreshHand(playerId));
  dispatch(executeTurn(0));
  let name = state.gameState.playerNames[playerId];
  dispatch(displayMessage({
    status: 'success',
    text: `${name} skipped their turn`
  }));
};

const onPlayBot = (hand) => (dispatch, getState) => {
  let state = getState();
  axios.post('/findBestWord', {
    board: state.boardState.board,
    hand: hand,
    firstTurn: state.gameState.firstTurn,
    isGreedy: false,
    level: state.gameState.botLevel
  }).then(res => {
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

export default {
  onDropTile,
  onPickupTile,
  onSelectTile,
  onRefreshHand,
  onShuffleHand,
  onPlayWord,
  onSkipTurn,
  onPlayBot,
  onStartGame
};
