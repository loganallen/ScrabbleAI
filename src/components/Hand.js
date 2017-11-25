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

  _hand(): Array {
    const tiles = this.props.hand.map((tile, idx) => (
      <Tile
        key={idx}
        letter={tile.letter}
        value={tile.value}
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
