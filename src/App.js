import React, { Component } from 'react';
import { connect } from 'react-redux';

import './css/index.css';
import Scrabble from './components/Scrabble';
import StartGameModal from './components/StartGameModal';
import ScrabbleActions from './actions';

type Props = {
  onStartGame: (Array, boolean) => void
};

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className='scrabbleHeader'>
          Scrabble.ai
        </h1>
        <StartGameModal
          onStartGame={this.props.onStartGame}
        />
        <Scrabble
          playerNames={this.state.players}
          playingBot={this.state.playingBot}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    onStartGame: (names, bot) => dispatch(ScrabbleActions.onStartGame(names, bot))
  };
};

export default connect(mapState, mapDispatch)(App);
