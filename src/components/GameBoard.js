import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Button
} from 'semantic-ui-react';
import ScrabbleActions from '../actions';

import BoardSpace from './BoardSpace';

type Props = {
  board: Array,
  selectedTile?: Object,
  onDropTile: (Object, Array) => void
};

class GameBoard extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  handleBoardSpaceClick = (boardSpace) => {
    if (this.props.selectedTile && !boardSpace.tile) {
      console.log('Dropping tile...');
      this.props.onDropTile(this.props.selectedTile, boardSpace.location);
    }
  }

  _gameBoard = (): Grid => {
    let rows = [];
    for (let r=0; r<15; r++) {
      let spaces = [];
      for (let c=0; c<15; c++) {
        spaces.push(
          <BoardSpace
            {...this.props.board[r][c]}
            onClick={ () => this.handleBoardSpaceClick(this.props.board[r][c]) }
          />
        );
      }
      rows.push(
        <div key={r}>{spaces}</div>
      );
    }

    return (
      <Grid>{rows}</Grid>
    );
  }

  render() {
    return (
      <div style={styles.board}>
        {this._gameBoard()}
      </div>
    );
  }
}

const styles = {
  board: {
    padding: '25px',
    width: '575px'
  }
};

const mapState = (store) => {
  return {
    ...store.board
  };
};

const mapDispatch = (dispatch) => {
  return {
    onDropTile: (tile, loc) => dispatch(ScrabbleActions.onDropTile(tile, loc))
  };
};

export default connect(mapState, mapDispatch)(GameBoard);
