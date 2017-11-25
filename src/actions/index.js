import ScrabbleActionTypes from './ActionTypes';

const onDropTile = () => ({
  type: ScrabbleActionTypes.ON_DROP_TILE,
  data: 'test'
});

export default {
  onDropTile
};
