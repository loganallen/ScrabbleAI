import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import ScrabbleActions from '../actions';
import GameBoard from './GameBoard';
import Hand from './Hand';

type Props = {
  tiles: Array,
  players: Array,
  turn: string,
  onTilePick: (Object, number) => void,
  onRefreshHand: (string) => void,
  onPlayWord: () => void,
  onPlayBot: (Array) => void
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
            playerName='p1'
            {...this.props.players['p1']}
            currentTurn={this.props.turn === 'p1'}
            onTilePick={this.props.onTilePick}
            onRefreshHand={ () => this.props.onRefreshHand('p1') }
            onPlayWord={this.props.onPlayWord}
          />
          <Hand
            playerName='bot'
            {...this.props.players['bot']}
            currentTurn={this.props.turn === 'bot'}
            onTilePick={this.props.onTilePick}
            onRefreshHand={ () => this.props.onRefreshHand('bot') }
            onPlayBot={this.props.onPlayBot}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  gameBoard: {
    display: 'inline-block',
    margin: '25px'
  },
  playerHands: {
    margin: '25px',
    float: 'right'
  }
}

const mapState = (state) => {
  return {
    ...state.gameState
  };
};

const mapDispatch = (dispatch) => {
  return {
    onTilePick: (tile, idx) => dispatch(ScrabbleActions.onTilePick(tile, idx)),
    onRefreshHand: (player) => dispatch(ScrabbleActions.onRefreshHand(player)),
    onPlayWord: () => dispatch(ScrabbleActions.onPlayWord()),
    onPlayBot: (hand) => dispatch(ScrabbleActions.findBestWord(hand))
  };
};

export default connect(mapState, mapDispatch)(Scrabble);
