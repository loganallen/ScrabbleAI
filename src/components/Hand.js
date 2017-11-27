import React from 'react';
import { connect } from 'react-redux';
import {
  Segment,
  Button
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

  onRefreshHand = () => {
    console.log('Refresh hand');

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
    console.log(this.props);
    return (
      <Segment>
        {this._hand()}
        <Button
          icon='undo'
          onClick={this.onRefreshHand}
        />
      </Segment>
    );
  }
}

export default Hand;
