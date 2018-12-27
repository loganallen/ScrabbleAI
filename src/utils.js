import keyMirror from 'keymirror';

export const BoardSpaceTypes = keyMirror({
  'START': null,
  'DEFAULT': null,
  'DOUBLE_WORD': null,
  'TRIPLE_WORD': null,
  'DOUBLE_LETTER': null,
  'TRIPLE_LETTER': null
});

export const boardSpaceMap = {
  'START':         ['8,8'],
  'DOUBLE_WORD':   ['2,6','2,10','4,8','6,2','6,14','8,4','8,12','10,2','10,14',
                    '12,8','14,6','14,10'],
  'TRIPLE_WORD':   ['1,4','1,12','4,1','4,15','12,1','12,15','15,4','15,12'],
  'DOUBLE_LETTER': ['2,3','2,13','3,2','3,5','3,11','3,14','5,3','5,7','5,9',
                    '5,13','7,5','7,11','9,5','9,11','11,3','11,7','11,9',
                    '11,13','13,2','13,5','13,11','13,14','14,3','14,13'],
  'TRIPLE_LETTER': ['1,7','1,9','4,4','4,12','6,6','6,10','7,1','7,15','9,1',
                    '9,15','10,6','10,10','12,4','12,12','15,7','15,9']
};

// TODO: Add 2 blank tiles
export const scrabbleLetters = {
  0: [['',2]],
  1: [['E',12], ['A',9], ['I',9], ['O',8], ['N',6], ['R',6], ['T',6], ['L',4], ['S',4], ['U',4]],
  2: [['D',4], ['G',3]],
  3: [['B',2], ['C',2], ['M',2], ['P',2]],
  4: [['F',2], ['H',2], ['V',2], ['W',2], ['Y',2]],
  5: [['K',1]],
  8: [['J',1], ['X',1]],
  10: [['Q',1], ['Z',1]]
};

export const botLevels = ['Beginner', 'Intermediate', 'Expert'];

export const _cloneBoard = (board) => {
  return board.map(row => row.map(space => ( {...space} )));
};
