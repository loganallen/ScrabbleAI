type Tile = {
  letter: string,
  value: number,
  location: {
    x: number,
    y: number
  },
  isSet: boolean
};

type SpaceType = 'START' | 'DEFAULT' | 'DOUBLE_WORD' | 'TRIPLE_WORD'
 | 'DOUBLE_LETTER' | 'TRIPLE_LETTER';

type BoardSpace = {
  location: {
    x: number,
    y: number
  },
  tile?: Tile,
  bonus: SpaceType
};

type Board = {
  spaces: Array<Array<BoardSpace>>,
  tiles: Array<Tile>
};

type Player = {
  id: number,
  name: string,
  hand: Array<Tile>,
  points: number
};

type Game = {
  board: Board,
  players: Array<Player>,
  turn: number,
  gameOver: boolean
};

const boardSpace = function(x, y, bonus) {
  return {
    location: { x: x, y: y },
    tile: null,
    bonus: bonus
  };
};

export const boardSpaceMap = {
  'START':         ['8,8'],
  'DOUBLE_WORD':   ['2,6','2,10','4,8','6,2','6,14','8,4','8,12','10,2','10,14',
                    '12,8','14,6','14,10'],
  'TRIPLE_WORD':   ['1,4','1,12','4,1','4,15','12,1','12,15','15,4','15,12'],
  'DOUBLE_LETTER': ['2,3','2,13','3,2','3,5','3,11','3,14','5,3','5,7','5,9',
                    '5,13','7,5','7,11','9,5','9,11','11,3','11,7','11,9',
                    '11,13','13,2','13,5','13,11','13,14','14,3','14,13'],
  'TRIPLE_LETTER': ['1,7','1,9','4,4','4,12','6,6','6,10','7,1','7,15','9,1',
                    '9,15','10,6','10,10','12,4','12,12','15,7','15,9'],
}

export default {

};
