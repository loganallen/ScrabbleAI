import React from 'react';
import {
  Grid,
  Button
} from 'semantic-ui-react';

import BoardSpace from './BoardSpace';
import {boardSpaceMap} from '../models';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tiles: []
    };
  }

  getGameBoard(): Array {
    let board = [];
    for (let i=0; i<15; i++) {
      board[i] = [];
    }
    Object.keys(boardSpaceMap).forEach(key => {
      let locs = boardSpaceMap[key];
      locs.forEach(loc => {
        let spots = loc.split(',');
        board[spots[0]-1][spots[1]-1] = key;
      });
    });
    for (let r=0; r<15; r++) {
      for (let c=0; c<15; c++) {
        if (board[r][c]) continue;
        board[r][c] = 'DEFAULT';
      }
    }
    return board;
  }

  _gameBoard = (): Grid => {
    let board = this.getGameBoard();

    let rows = [];
    for (let r=0; r<15; r++) {
      let spaces = [];
      for (let c=0; c<15; c++) {
        spaces.push(
          <BoardSpace key={[r,c].join('_')} spaceType={board[r][c]} />
        );
      }
      rows.push(
        <div style={styles.row}>
          {spaces}
        </div>
      );
    }

    return (
      <Grid>
        {rows}
      </Grid>
    );
  }

  render() {
    return (
      <div style={styles.board}>
        <h2>Game Board</h2>
        {this._gameBoard()}
      </div>
    );
  }
}

const styles = {
  board: {
    margin: '25px auto',
    width: '525px'
  },
  row: {

  },
  test: {
    backgroundColor: 'red',
    margin: '1px',
    width: '28px',
    height: '28px',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'white',
    display: 'inline-block'
  }
}

export default GameBoard;
