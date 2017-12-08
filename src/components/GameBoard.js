import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  Segment
} from 'semantic-ui-react';
import ScrabbleActions from '../actions';

import BoardSpace from './BoardSpace';

type Props = {
  board: Array,
  selectedTile?: Object,
  onDropTile: (Object, Array) => void,
  onMoveTile: (Object, Array) => void
};

class GameBoard extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  handleBoardSpaceClick = (boardSpace) => {
    if (this.props.selectedTile) {
      if (!boardSpace.tile) {
        this.props.onDropTile(this.props.selectedTile, boardSpace.location);
      }
    } else {
      if (boardSpace.tile && !boardSpace.isSet) {
        this.props.onMoveTile(boardSpace.tile, boardSpace.location);
      }
    }
  }

  _gameBoard = (): Grid => {
    let rows = [];
    for (let r=0; r<15; r++) {
      let spaces = [];
      for (let c=0; c<15; c++) {
        spaces.push(
          <BoardSpace
            key={[r,c].join('_')}
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
      <Segment raised>
        <div style={styles.board}>
          {this._gameBoard()}
        </div>
      </Segment>
    );
  }
}

const styles = {
  board: {
    padding: '25px 20px',
    width: '570px'
  }
};

const mapState = (state) => {
  return {
    ...state.boardState
  };
};

const mapDispatch = (dispatch) => {
  return {
    onDropTile: (tile, loc) => dispatch(ScrabbleActions.onDropTile(tile, loc)),
    onMoveTile: (tile, loc) => dispatch(ScrabbleActions.onMoveTile(tile, loc))
  };
};

export default connect(mapState, mapDispatch)(GameBoard);
