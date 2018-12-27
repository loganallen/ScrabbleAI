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
  onSelectTile: (Object, number) => void,
  onRefreshHand: () => void,
  onShuffleHand: () => void,
  onPlayWord: () => void,
  onSkipTurn: () => void,
  onPlayBot?: () => void
};

class Hand extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      playButtonEnabled: props.currentTurn
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      playButtonEnabled: nextProps.currentTurn
    });
  }

  hasTilesOnBoard = () => {
    return this.props.hand.reduce((acc, tile) => acc || tile.onBoard, false);
  }

  handleTileClick = (tile, idx) => {
    if (!this.props.currentTurn) return;
    if (!tile.onBoard) {
      this.props.onSelectTile(tile, idx);
    }
  }

  handlePlayClick = () => {
    if (!this.props.currentTurn) return;

    if (this.props.isBot) {
      this.setState({
        playButtonEnabled: false
      });
      this.props.onPlayBot(this.props.hand);
    } else {
      if (this.hasTilesOnBoard()) {
        this.setState({
          playButtonEnabled: false
        });
        this.props.onPlayWord();
      }
    }
  }

  handlePassClick = () => {
    if (!this.props.currentTurn) return;

    this.props.onSkipTurn();
  }

  handleEditHand = () => {
    if (this.hasTilesOnBoard()) {
      this.props.onRefreshHand();
    } else {
      this.props.onShuffleHand();
    }
  }

  renderHand(): Array<Tile> {
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
      <Segment className='handSegment' raised>
        <div className='handHeader'>
          <Label ribbon color='teal' size='medium'>
            {this.props.playerName}
          </Label>
          <Statistic floated='right' size='tiny' color='teal'>
            <Statistic.Value>{this.props.score}</Statistic.Value>
            <Statistic.Label>Score</Statistic.Label>
          </Statistic>
        </div>
        {this.renderHand()}
        {!this.props.isBot &&
          (<Button
            className='handButton'
            icon={this.hasTilesOnBoard() ? 'undo' : 'random'}
            circular
            onClick={this.handleEditHand}
            disabled={!this.props.currentTurn}
          />)
        }
        <Button
          className='handButton'
          content='Play'
          color='teal'
          basic={!this.props.currentTurn}
          onClick={this.handlePlayClick}
          disabled={!this.state.playButtonEnabled}
        />
        {!this.props.isBot &&
          (<Button
            className='handButton'
            content='Pass'
            basic
            color='teal'
            onClick={this.handlePassClick}
            disabled={!this.props.currentTurn}
          />)
        }
      </Segment>
    );
  }
}

export default Hand;
