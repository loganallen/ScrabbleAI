import React from 'react';
import { connect } from 'react-redux';
import {
  Segment
} from 'semantic-ui-react';

import ScrabbleActions from '../actions';
import Tile from './Tile';

type Props = {
  hand: Array,
  score: number,
  onTilePick: (Object, number) => void
}

class Hand extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      hand: props.hand
    };
  }

  handleTileClick = (tile, idx) => {
    console.log('Clicked', tile);
    this.props.onTilePick(tile, idx);
  }

  _hand(): Array {
    const tiles = this.props.hand.map((tile, idx) => (
      <Tile
        key={idx}
        letter={tile.letter}
        value={tile.value}
        onClick={ () => this.handleTileClick(tile, idx) }
      />
    ));
    return tiles;
  }

  render() {
    console.log(this.props);
    return (
      <Segment>
        {this._hand()}
      </Segment>
    );
  }
}

export default Hand;
