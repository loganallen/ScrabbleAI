import React from 'react';
import classNames from 'classnames';
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
    let spaceClass = classNames({
      'boardSpace': true,
      [this.props.type]: true
    });

    return (
      <div
        className={spaceClass}
        onClick={this.props.onClick}
      >
        <p className={classNames({ 'DEFAULT': this.props.type === BoardSpaceTypes.DEFAULT })}>
          {bonus}
        </p>
        {this.props.tile && (
          <div className='boardTile'>
            {this.props.tile.letter}
            <div className='tileValue'>
              {this.props.tile.value}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BoardSpace;
