import React from 'react';
import {
  Segment,
  Button,
  Header
} from 'semantic-ui-react';

import Tile from './Tile';

type Props = {
  playerName: string,
  isBot: boolean,
  hand: Array,
  score: number,
  currentTurn: boolean,
  onTilePick: (Object, number) => void,
  onRefreshHand: () => void,
  onPlayWord: () => void,
  onPlayBot?: () => void
}

class Hand extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isBot: props.isBot
    };
  }

  handleTileClick = (tile, idx) => {
    if (!this.props.currentTurn) return;
    if (!tile.onBoard) {
      this.props.onTilePick(tile, idx);
    }
  }

  onShuffleHand = () => {
    // TODO: Shuffle tiles in hand
  }

  handlePlayClick = () => {
    if (!this.props.currentTurn) return;

    if (this.state.isBot) {
      this.props.onPlayBot(this.props.hand);
    } else {
      let tilesOnBoard = this.props.hand.reduce((acc, el) => {
        return acc || el.onBoard;
      }, false);
      
      if (tilesOnBoard) {
        this.props.onPlayWord();
      }
    }
  }

  _hand(): Array {
    const tiles = this.props.hand.map((tile, idx) => (
      <Tile
        key={idx}
        {...tile}
        onClick={ () => this.handleTileClick(tile, idx) }
      />
    ));
    return tiles;
  }

  render() {
    return (
      <Segment raised>
        <Header size='small'>
          {`${this.props.playerName} | Points: ${this.props.score}`}
        </Header>
        {this._hand()}
        {/* <Button
          icon='random'
          onClick={this.onShuffleHand}
        /> */}
        <Button
          icon='undo'
          onClick={this.props.onRefreshHand}
        />
        <Button
          content='Play'
          onClick={this.handlePlayClick}
        />
      </Segment>
    );
  }
}

export default Hand;
