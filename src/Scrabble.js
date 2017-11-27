import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import ScrabbleActions from './actions';
import GameBoard from './components/GameBoard';
import Hand from './components/Hand';

type Props = {
  tiles: Array,
  players: Array,
  turn: string,
  onTilePick: (Object, number) => void,
  onRefreshHand: (string) => void
};

class Scrabble extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Header>Scrabble.ai</Header>
        <div style={styles.gameBoard}>
          <GameBoard />
        </div>
        <div style={styles.playerHands}>
          <Hand
            {...this.props.players['p1']}
            onTilePick={this.props.onTilePick}
            onRefreshHand={ () => this.props.onRefreshHand('p1') }
          />
          <Hand
            {...this.props.players['p2']}
            onTilePick={this.props.onTilePick}
            onRefreshHand={ () => this.props.onRefreshHand('p2') }
          />
        </div>
      </div>
    );
  }
}

const styles = {
  gameBoard: {
    display: 'inline-block',
    border: '1px solid gray'
  },
  playerHands: {
    margin: '25px',
    paddingTop: '50px',
    display: 'inline-block',
    border: '1px solid gray'
  }
}

const mapState = (state) => {
  console.log('Global state', state);
  return {
    ...state.scrabble
  };
};

const mapDispatch = (dispatch) => {
  return {
    onTilePick: (tile, idx) => dispatch(ScrabbleActions.onTilePick(tile, idx)),
    onRefreshHand: (player) => dispatch(ScrabbleActions.onRefreshHand(player))
  };
};

export default connect(mapState, mapDispatch)(Scrabble);
