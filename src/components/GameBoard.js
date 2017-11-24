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
      console.log(key, locs);
      locs.forEach(loc => {
        let spots = loc.split(',');
        board[spots[0]-1][spots[1]-1] = key;
        console.log('board',board);
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
          <Grid.Column style={styles.column}>
            <BoardSpace spaceType={board[r][c]} />
          </Grid.Column>
        );
      }
      rows.push(
        <Grid.Row style={styles.row}>{spaces}</Grid.Row>
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
      <Grid centered textAlign='center'>
        <Grid.Column width={10}>
          <h2>Game Board</h2>
          {this._gameBoard()}
        </Grid.Column>
      </Grid>
    );
  }
}

const styles = {
  row: {
    padding: '1px'
  },
  column: {
    padding: '0px 1px'
  }
}

export default GameBoard;
