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
  playerNames: Array,
  playingBot: boolean,
  tiles: Array,
  players: Array,
  turn: string,
  possiblePoints: number,
  message: Object,
  gameOver: boolean,
  onTilePick: (Object, number) => void,
  onRefreshHand: () => void,
  onShuffleHand: () => void,
  onPlayWord: () => void,
  onSkipTurn: () => void,
  onPlayBot: (Array) => void
};

class Scrabble extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  _message(): Message {
    let color;
    switch (this.props.message.status) {
      case 'success':
        color = 'green';
        break;
      case 'error':
        color = 'red';
        break;
      default:
        color = 'yellow';
    }

    return (
      <Message color={color}>
        <Message.Header>{this.props.message.text}</Message.Header>
      </Message>
    )
  }

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.gameBoard}>
          <GameBoard />
        </div>
        <div style={styles.playerHands}>
          <Label tag>
            {`${this.props.tiles.length} tiles left`}
          </Label>
          <Hand
            playerName={this.props.playerNames[0]}
            isBot={false}
            {...this.props.players[0]}
            currentTurn={this.props.turn === 0 && !this.props.gameOver}
            onTilePick={this.props.onTilePick}
            onRefreshHand={this.props.onRefreshHand}
            onShuffleHand={this.props.onShuffleHand}
            onPlayWord={this.props.onPlayWord}
            onSkipTurn={this.props.onSkipTurn}
            onPlayBot={this.props.onPlayBot}
          />
          <Hand
            playerName={this.props.playerNames[1]}
            isBot={this.props.playingBot}
            {...this.props.players[1]}
            currentTurn={this.props.turn === 1 && !this.props.gameOver}
            onTilePick={this.props.onTilePick}
            onRefreshHand={this.props.onRefreshHand}
            onShuffleHand={this.props.onShuffleHand}
            onPlayWord={this.props.onPlayWord}
            onSkipTurn={this.props.onSkipTurn}
            onPlayBot={this.props.onPlayBot}
          />
          {this.props.message && this._message()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    margin: 'auto',
    maxWidth: '1260px'
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
    onRefreshHand: () => dispatch(ScrabbleActions.onRefreshHand()),
    onShuffleHand: () => dispatch(ScrabbleActions.onShuffleHand()),
    onPlayWord: () => dispatch(ScrabbleActions.onPlayWord()),
    onSkipTurn: () => dispatch(ScrabbleActions.onSkipTurn()),
    onPlayBot: (hand) => dispatch(ScrabbleActions.findBestWord(hand))
  };
};

export default connect(mapState, mapDispatch)(Scrabble);
