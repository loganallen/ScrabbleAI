import React from 'react';
import {

} from 'semantic-ui-react';

type Props = {
  tile?: Object,
  spaceType: string
}

class BoardSpace extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  abbreviateSpaceType(spaceType: string) {
    if (spaceType == 'DEFAULT' || spaceType == 'START') return '';
    return spaceType.split('_').reduce((acc, el) => acc + el.charAt(0), '');
  }

  render() {
    return (
      <div style={{
        ...styles.space,
        ...styles[this.props.spaceType]
      }}>
        {this.abbreviateSpaceType(this.props.spaceType)}
      </div>
    );
  }
}

const styles = {
  space: {
    height: '45px',
    paddingTop: '12px',
    borderRadius: '4px',
    textAlign: 'center',
    color: 'white'
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
