import React from 'react';

type Props = {
  key: string,
  letter: string,
  value: number,
  onBoard: boolean,
  onClick: () => void
};

class Tile extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  handleTileClick = () => {
    if (!this.props.onBoard) {
      this.props.onClick();
    }
  }

  render() {
    return (
      <div
        key={this.props.key}
        style={{
          ...styles.tile,
          ...(this.props.onBoard ? styles.onBoard : {})
        }}
        onClick={this.handleTileClick}
      >
        {this.props.letter}
        <div style={styles.tileValue}>
          {this.props.value}
        </div>
      </div>
    );
  }
}

const styles = {
  tile: {
    backgroundColor: '#ff9933',
    margin: '2px',
    paddingTop: '12px',
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer'
  },
  onBoard: {
    backgroundColor: '#ffbf80'
  },
  tileValue: {
    position: 'absolute',
    top: '1px',
    right: '3px',
    fontSize: '10px',
    fontWeight: 'normal',
    color: 'black'
  }
}

export default Tile;
