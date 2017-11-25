import React from 'react';

type Props = {
  letter: string,
  value: number
};

class Tile extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={styles.tile}>
        {this.props.letter}
      </div>
    );
  }
}

const styles = {
  tile: {
    backgroundColor: 'orange',
    margin: '2px',
    paddingTop: '13px',
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'black',
    display: 'inline-block'
  }
}

export default Tile;
