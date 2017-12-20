import React from 'react';
import classNames from 'classnames';

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
    let tileClass = classNames({
      'handTile': true,
      'clickable': this.props.clickable,
      'onBoard': this.props.onBoard
    });

    return (
      <div
        className={tileClass}
        onClick={this.props.onClick}
      >
        {this.props.hiddenLabel ? '?' : this.props.letter}
        <div className='tileValue'>
          {this.props.hiddenLabel ? '' : this.props.value}
        </div>
      </div>
    );
  }
}

export default Tile;
