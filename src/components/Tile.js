import React from 'react';

type Props = {
  key: string,
  letter: string,
  value: number,
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
      <div style={styles.tile} onClick={this.props.onClick}>
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
    backgroundColor: 'orange',
    margin: '2px',
    paddingTop: '12px',
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'black',
    display: 'inline-block',
    position: 'relative'
  },
  tileValue: {
    position: 'absolute',
    top: '1px',
    right: '3px',
    fontSize: '10px',
    color: 'black'
  }
}

export default Tile;
