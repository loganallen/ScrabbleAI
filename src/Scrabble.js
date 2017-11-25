import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';

import GameBoard from './components/GameBoard';
import Hand from './components/Hand';

type Props = {
  tiles: Array,
  players: Array,
  turn: string
};

class Scrabble extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Header>Scrabble.ai</Header>
        <div style={styles.gameBoard}>
          <GameBoard />
        </div>
        <div style={styles.playerHands}>
          <Hand {...this.props.players['p1']} />
          <Hand {...this.props.players['p2']} />
        </div>
      </div>
    );
  }
}

const styles = {
  gameBoard: {
    display: 'inline-block',
    border: '1px solid gray'
  },
  playerHands: {
    margin: '25px',
    paddingTop: '50px',
    display: 'inline-block',
    border: '1px solid gray'
  }
}

const mapState = (state) => {
  console.log('Scrabble state', state);
  return {
    ...state.scrabble
  };
};

const mapDispatch = (dispatch) => {
  return {

  };
};

export default connect(mapState, mapDispatch)(Scrabble);
