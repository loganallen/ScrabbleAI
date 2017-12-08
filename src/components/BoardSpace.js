import React from 'react';
import {  } from 'semantic-ui-react';
import { BoardSpaceTypes } from '../utils';

type Props = {
  location: Array,
  type: string,
  tile?: Object,
  isSet: boolean,
  onClick: (Object) => void
}

class BoardSpace extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  abbreviateSpaceType(spaceType: string) {
    if (spaceType === BoardSpaceTypes.DEFAULT) return '__';
    if (spaceType === BoardSpaceTypes.START) return '★';
    return spaceType.split('_').reduce((acc, el) => acc + el.charAt(0), '');
  }

  render() {
    const bonus = this.abbreviateSpaceType(this.props.type);
    return (
      <div
        style={{
          ...styles.space,
          ...styles[this.props.type]
        }}
        onClick={this.props.onClick}
      >
        <p style={this.props.type === BoardSpaceTypes.DEFAULT ? styles.noBonus : {}}>
          {bonus}
        </p>
        {this.props.tile && (
          <div style={styles.tile}>
            {this.props.tile.letter}
            <div style={styles.tileValue}>
              {this.props.tile.value}
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
    color: '#cccccc'
  },
  DOUBLE_WORD: {
    backgroundColor: '#990000'
  },
  TRIPLE_WORD: {
    backgroundColor: '#ffad33'
  },
  DOUBLE_LETTER: {
    backgroundColor: '#0073e6'
  },
  TRIPLE_LETTER: {
    backgroundColor: '#39ac39'
  },
  START: {
    backgroundColor: '#4d0026'
  },
  DEFAULT: {
    backgroundColor: '#cccccc',
  },
  tile: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    backgroundColor: '#ff9933',
    opacity: '0.93',
    paddingTop: '8px',
    width: '100%',
    height: '100%',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    display: 'inline-block'
  },
  tileValue: {
    position: 'absolute',
    top: '0px',
    right: '3px',
    fontSize: '10px',
    fontWeight: 'normal',
    color: 'black'
  }
};

export default BoardSpace;
