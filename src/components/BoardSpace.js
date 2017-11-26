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
      </div>
    );
  }
}

const styles = {
  space: {
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
  }
};

export default BoardSpace;
