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
  onSelectTile: (Object, number) => void,
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

  renderMessage(): Message {
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
      <div id='scrabbleContainer'>
        <div id='scrabbleBoard'>
          <GameBoard />
        </div>
        <div id='playerHands'>
          <Label tag>
            {`${this.props.tiles.length} tiles left`}
          </Label>
          <Hand
            playerName={this.props.playerNames[0]}
            isBot={false}
            {...this.props.players[0]}
            currentTurn={this.props.turn === 0 && !this.props.gameOver}
            onSelectTile={this.props.onSelectTile}
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
            onSelectTile={this.props.onSelectTile}
            onRefreshHand={this.props.onRefreshHand}
            onShuffleHand={this.props.onShuffleHand}
            onPlayWord={this.props.onPlayWord}
            onSkipTurn={this.props.onSkipTurn}
            onPlayBot={this.props.onPlayBot}
          />
          {this.props.message && this.renderMessage()}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    ...state.gameState
  };
};

const mapDispatch = (dispatch) => {
  return {
    onSelectTile: (tile, idx) => dispatch(ScrabbleActions.onSelectTile(tile, idx)),
    onRefreshHand: () => dispatch(ScrabbleActions.onRefreshHand()),
    onShuffleHand: () => dispatch(ScrabbleActions.onShuffleHand()),
    onPlayWord: () => dispatch(ScrabbleActions.onPlayWord()),
    onSkipTurn: () => dispatch(ScrabbleActions.onSkipTurn()),
    onPlayBot: (hand) => dispatch(ScrabbleActions.onPlayBot(hand))
  };
};

export default connect(mapState, mapDispatch)(Scrabble);
