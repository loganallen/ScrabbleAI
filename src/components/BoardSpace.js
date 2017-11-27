import React from 'react';
import {  } from 'semantic-ui-react';

type Props = {
  location: Array,
  data: Object,
  onClick: (Object) => void
}

class BoardSpace extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  abbreviateSpaceType(spaceType: string) {
    if (spaceType === 'DEFAULT') return '__';
    if (spaceType === 'START') return 'ST';
    return spaceType.split('_').reduce((acc, el) => acc + el.charAt(0), '');
  }

  render() {
    const bonus = this.abbreviateSpaceType(this.props.data.type);
    return (
      <div
        key={this.props.data.location.join('_')}
        style={{
          ...styles.space,
          ...styles[this.props.data.type]
        }}
        onClick={ () => this.props.onClick(this.props.data) }
      >
        <p style={bonus === '__' ? styles.noBonus : {}}>{bonus}</p>
        {this.props.data.tile && (
          <div style={styles.tile}>
            {this.props.data.tile.letter}
            <div style={styles.tileValue}>
              {this.props.data.tile.value}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  space: {
    position: 'relative',
    backgroundColor: 'red',
    margin: '1px',
    paddingTop: '8px',
    width: '33px',
    height: '33px',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'white',
    display: 'inline-block',
    cursor: 'pointer'
  },
  noBonus: {
    color: 'gray'
  },
  DOUBLE_WORD: {
    backgroundColor: 'red'
  },
  TRIPLE_WORD: {
    backgroundColor: 'orange'
  },
  DOUBLE_LETTER: {
    backgroundColor: 'blue'
  },
  TRIPLE_LETTER: {
    backgroundColor: 'green'
  },
  START: {
    backgroundColor: 'yellow'
  },
  DEFAULT: {
    backgroundColor: 'gray',
  },
  tile: {
    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'orange',
    paddingTop: '8px',
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'black',
    display: 'inline-block'
  },
  tileValue: {
    position: 'absolute',
    top: '1px',
    right: '3px',
    fontSize: '10px',
    color: 'black'
  }
};

export default BoardSpace;
