import React from 'react';
import {
  Segment,
  Button,
  Statistic,
  Label
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
  onShuffleHand: () => void,
  onPlayWord: () => void,
  onPlayBot?: () => void
};

class Hand extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  handleTileClick = (tile, idx) => {
    if (!this.props.currentTurn) return;
    if (!tile.onBoard) {
      this.props.onTilePick(tile, idx);
    }
  }

  handlePlayClick = () => {
    if (!this.props.currentTurn) return;

    if (this.props.isBot) {
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

  handleEditHand = () => {
    if (this._tilesOnBoard()) {
      this.props.onRefreshHand();
    } else {
      this.props.onShuffleHand();
    }
  }

  _tilesOnBoard = () => {
    return this.props.hand.reduce((acc, tile) => acc || tile.onBoard, false);
  }

  _hand(): Array<Tile> {
    const tiles = this.props.hand.map((tile, idx) => (
      <Tile
        key={idx}
        clickable={this.props.currentTurn}
        hiddenLabel={this.props.isBot}
        {...tile}
        onClick={ () => this.handleTileClick(tile, idx) }
      />
    ));

    return tiles;
  }

  render() {
    return (
      <Segment raised style={styles.segment}>
        <div style={styles.handHeader}>
          <Label ribbon color='teal' size='medium'>
            {this.props.playerName}
          </Label>
          <Statistic floated='right' size='tiny' color='teal'>
            <Statistic.Value>{this.props.score}</Statistic.Value>
            <Statistic.Label>Score</Statistic.Label>
          </Statistic>
        </div>
        {this._hand()}
        {!this.props.isBot &&
          (<Button
            style={styles.buttons}
            icon={this._tilesOnBoard() ? 'undo' : 'random'}
            circular
            onClick={this.handleEditHand}
            disabled={!this.props.currentTurn}
          />)
        }
        <Button
          style={styles.buttons}
          content='Play'
          color='teal'
          basic={!this.props.currentTurn}
          onClick={this.handlePlayClick}
          disabled={!this.props.currentTurn}
        />
      </Segment>
    );
  }
}

const styles = {
  segment: {
    width: '500px'
  },
  handHeader: {
    width: '100%',
    height: '60px'
  },
  buttons: {
    marginLeft: '10px'
  }
};

export default Hand;
