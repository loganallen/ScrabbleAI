import React from 'react';
import { connect } from 'react-redux';
import {
  Label,
  Message
} from 'semantic-ui-react';

import ScrabbleActions from '../actions';
import GameBoard from './GameBoard';
import Hand from './Hand';

type Props = {
  tiles: Array,
  players: Array,
  turn: string,
  message: Object,
  gameOver: boolean,
  onTilePick: (Object, number) => void,
  onRefreshHand: (string) => void,
  onPlayWord: () => void,
  onPlayBot: (Array) => void
};

class Scrabble extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.gameBoard}>
          <GameBoard />
        </div>
        <div style={styles.playerHands}>
          <Label tag color='white'>
            {`${this.props.tiles.length} tiles left`}
          </Label>
          <Hand
            playerName='Me'
            isBot={false}
            {...this.props.players['p1']}
            currentTurn={this.props.turn === 'p1' && !this.props.gameOver}
            onTilePick={this.props.onTilePick}
            onRefreshHand={ () => this.props.onRefreshHand('p1') }
            onPlayWord={this.props.onPlayWord}
            onPlayBot={this.props.onPlayBot}
          />
          <Hand
            playerName='Bot'
            isBot={true}
            {...this.props.players['p2']}
            currentTurn={this.props.turn === 'p2' && !this.props.gameOver}
            onTilePick={this.props.onTilePick}
            onRefreshHand={ () => this.props.onRefreshHand('p2') }
            onPlayWord={this.props.onPlayWord}
            onPlayBot={this.props.onPlayBot}
          />
          {this.props.message && (
            <Message
              color={this.props.message.status === 'success' ? 'green' : 'red'}
            >
              <Message.Header>{this.props.message.text}</Message.Header>
            </Message>
          )}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: 'auto',
    maxWidth: '1200px'
  },
  gameBoard: {
    display: 'inline-block',
    margin: '25px'
  },
  playerHands: {
    margin: '25px',
    float: 'right'
  }
};

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
