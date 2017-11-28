import React from 'react';
import {
  Segment,
  Button
} from 'semantic-ui-react';

import Tile from './Tile';

type Props = {
  hand: Array,
  score: number,
  currentTurn: boolean,
  onTilePick: (Object, number) => void,
  onRefreshHand: () => void,
  onPlayWord: () => void
}

class Hand extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

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
    let tilesOnBoard = this.props.hand.reduce((acc, el) =>
      acc || el.onBoard
    , false);
    if (tilesOnBoard) {
      this.props.onPlayWord();
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
      <Segment>
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
