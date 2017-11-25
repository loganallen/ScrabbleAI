import React from 'react';
import {
  Segment
} from 'semantic-ui-react';

import Tile from './Tile';

type Props = {
  hand: Array,
  score: number
}

class Hand extends React.Component {
  constructor(props: Props) {
    super(props);
    console.log(props);
    this.state = {
      hand: props.hand,
      selectedTile: null
    };
  }

  onSelectTile = ()

  _hand(): Array {
    const tiles = this.props.hand.map(tile => (
      <Tile
        letter={tile.letter}
        value={tile.value}
        available={}
        onClick={}
      />
    ));
    return tiles;
  }

  render() {
    return (
      <Segment>
        {this._hand()}
      </Segment>
    );
  }
}

export default Hand;
