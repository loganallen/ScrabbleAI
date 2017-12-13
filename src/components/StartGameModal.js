import React from 'react';
import {
  Modal,
  Button,
  Input,
  Header,
  Tab
} from 'semantic-ui-react';

type Props = {
  onStartGame: (Array, boolean) => void
};

class StartGameModal extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: true,
      playerNames: ['', ''],
      activeIndex: 0
    };
  }

  handleStartGame = () => {
    this.props.onStartGame(this.state.playerNames, this.state.activeIndex === 0);
    this.setState({
      open: false
    });
  }

  handleInputChange = (value, idx) => {
    let names = this.state.playerNames;
    names[idx] = value;
    this.setState({
      playerNames: names
    });
  }

  handleTabChange = (_, data) => {
    this.setState({
      playerNames: ['', ''],
      activeIndex: data.activeIndex
    });
  }

  _humanVsBotPane() {
    return (
      <div>
        <br/>
        <Input
          fluid
          label='You'
          placeholder='George'
          onChange={ (_,d) => this.handleInputChange(d.value, 0) }
          value={this.state.playerNames[0]}
        />
        <br/><br/>
        <Input
          fluid
          label='AI Bot'
          placeholder='Larry'
          onChange={ (_,d) => this.handleInputChange(d.value, 1) }
          value={this.state.playerNames[1]}
        />
        <br/>
      </div>
    );
  }

  _humanVsHumanPane() {
    return (
      <div>
        <br/>
        <Input
          fluid
          label='Player 1'
          placeholder='George'
          onChange={ (_,d) => this.handleInputChange(d.value, 0) }
          value={this.state.playerNames[0]}
        />
        <br/><br/>
        <Input
          fluid
          label='Player 2'
          placeholder='Martha'
          onChange={ (_,d) => this.handleInputChange(d.value, 1) }
          value={this.state.playerNames[1]}
        />
        <br/>
      </div>
    );
  }

  _tabSection(): Tab {
    let panes = [
      { menuItem: 'Human vs. Bot', render: () => this._humanVsBotPane() },
      { menuItem: 'Human vs. Human', render: () => this._humanVsHumanPane() }
    ];

    return (
      <Tab
        activeIndex={this.state.activeIndex}
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        onTabChange={this.handleTabChange}
      />
    );
  }

  render() {
    let startEnabled = this.state.playerNames.reduce((acc, name) => (
      acc && name !== ''
    ), true);

    return (
      <Modal open={this.state.open} size='small'>
        <Header color='teal' textAlign='center' as='h1'>
          Welcome to Scrabble.ai!
        </Header>
        <Modal.Content>
          {this._tabSection()}
        </Modal.Content>
        <Modal.Actions>
          <Button primary disabled={!startEnabled} onClick={this.handleStartGame}>
            Start Game
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default StartGameModal;
