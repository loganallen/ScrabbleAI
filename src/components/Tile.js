import React from 'react';

type Props = {
  clickable: boolean,
  hiddenLabel: boolean,
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

  render() {
    return (
      <div
        style={{
          ...styles.tile,
          ...(this.props.clickable ? styles.clickable : {}),
          ...(this.props.onBoard ? styles.onBoard : {})
        }}
        onClick={this.props.onClick}
      >
        {this.props.hiddenLabel ? '?' : this.props.letter}
        <div style={styles.tileValue}>
          {this.props.hiddenLabel ? '' : this.props.value}
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
    cursor: 'default'
  },
  clickable: {
    cursor: 'pointer'
  },
  onBoard: {
    backgroundColor: '#ffbf80'
  },
  tileValue: {
    position: 'absolute',
    top: '0px',
    right: '3px',
    fontSize: '10px',
    fontWeight: 'normal',
    color: 'black'
  }
}

export default Tile;
