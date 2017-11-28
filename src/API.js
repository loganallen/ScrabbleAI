// API calls
import { BoardSpaceTypes } from './models';

/*
board[r][c] : {
  location: [r,c],
  type: boardSpaceType,
  tile: Tile,
  isSet: boolean
};

Tile: {
  letter: string,
  value: number,
  onBoard: boolean
}
*/

const _getRowsAndColumns = (board) => {
  let rows = new Set();
  let cols = new Set();
  board.forEach((row, r) => {
    row.forEach((space, c) => {
      if (space.tile && !space.isSet) {
        rows.add(r);
        cols.add(c);
      }
    });
  });

  rows = [...rows].sort();
  cols = [...cols].sort();
  return [rows, cols];
}

const validateTilePlacement = (board, firstTurn) => {
  console.log('Validating tile placement...');
  // Fail if no tile in starting space for the first turn
  if (firstTurn && !board[7][7].tile) {
    throw new Error('Word must pass through starting space');
  }

  // Fail if tiles not all in same row or column
  let [rows, cols] = _getRowsAndColumns(board);
  if (rows.length > 1 && cols.length > 1) {
    throw new Error('Invalid tile placements');
  }

  // Fail if tiles don't make contiguous word
  if (rows.length === 1) {
    for (let c=cols[0]; c<=cols[cols.length-1]; c++) {
      if (!board[rows[0]][c].tile) {
        throw new Error('Invalid tile placements');
      }
    }
  } else {
    for (let r=rows[0]; r<=rows[rows.length-1]; r++) {
      if (!board[r][cols[0]].tile) {
        throw new Error('Invalid tile placements');
      }
    }
  }

  return true;
}

// Recursively builds horizontal word with points and keeps track of word bonuses
const _recHorizontalSearch = (board, _r, c, expandLeft) => {
  // Return if out of bounds
  if (c < 0 || c > 14) return ['', 0, []];

  // Return if space has no tile
  let space = board[_r][c];
  if (!space.tile) return ['', 0, []];

  // Get the proper value of the tile
  let value = 0;
  let bonus = [];
  if (space.isSet) {
    value = space.tile.value;
  } else {
    switch (space.type) {
      case BoardSpaceTypes.DOUBLE_LETTER:
        value = space.tile.value * 2;
        break;
      case BoardSpaceTypes.TRIPLE_LETTER:
        value = space.tile.value * 3;
        break;
      case BoardSpaceTypes.DOUBLE_WORD:
      case BoardSpaceTypes.TRIPLE_WORD:
        bonus.push(space.type);
      default:
        value = space.tile.value;
    }
  }

  // Recusively expand horizontally
  let word = '';
  if (expandLeft) {
    let [lWord, lVal, lBonus] = _recHorizontalSearch(board, _r, c-1, expandLeft);
    word = lWord + space.tile.letter;
    value += lVal;
    bonus = [...bonus, ...lBonus];
  } else {
    let [rWord, rVal, rBonus] = _recHorizontalSearch(board, _r, c+1, expandLeft);
    word = space.tile.letter + rWord;
    value += rVal;
    bonus = [...bonus, ...rBonus];
  }

  return [word, value, bonus];
}

// Horizontal word search
const _horizontalSearch = (board, _r, c) => {
  let [lWord, lVal, lBonus] = _recHorizontalSearch(board, _r, c, true);
  let [rWord, rVal, rBonus] = _recHorizontalSearch(board, _r, c+1, false);

  let word = lWord + rWord;
  let points = lVal + rVal;
  lBonus.concat(rBonus).forEach(bonus => {
    if (bonus === BoardSpaceTypes.DOUBLE_WORD) { points *= 2; }
    else if (bonus === BoardSpaceTypes.TRIPLE_WORD) { points *= 3; }
  });

  return [word, points];
};

// Recursively builds vertical word with points and keeps track of word bonuses
const _recVerticalSearch = (board, r, _c, expandUp) => {
  // Return if out of bounds
  if (r < 0 || r > 14) return ['', 0, []];

  // Return if space has no tile
  let space = board[r][_c];
  if (!space.tile) return ['', 0, []];

  // Get the proper value of the tile
  let value = 0;
  let bonus = [];
  if (space.isSet) {
    value = space.tile.value;
  } else {
    switch (space.type) {
      case BoardSpaceTypes.DOUBLE_LETTER:
        value = space.tile.value * 2;
        break;
      case BoardSpaceTypes.TRIPLE_LETTER:
        value = space.tile.value * 3;
        break;
      case BoardSpaceTypes.DOUBLE_WORD:
      case BoardSpaceTypes.TRIPLE_WORD:
        bonus.push(space.type);
      default:
        value = space.tile.value;
    }
  }

  // Recusively expand horizontally
  let word = '';
  if (expandUp) {
    let [tWord, tVal, tBonus] = _recVerticalSearch(board, r-1, _c, expandUp);
    word = tWord + space.tile.letter;
    value += tVal;
    bonus = [...bonus, ...tBonus];
  } else {
    let [bWord, bVal, bBonus] = _recVerticalSearch(board, r+1, _c, expandUp);
    word = space.tile.letter + bWord;
    value += bVal;
    bonus = [...bonus, ...bBonus];
  }

  return [word, value, bonus];
}

// Vertical word search
const _verticalSearch = (board, r, _c) => {
  let [tWord, tVal, tBonus] = _recVerticalSearch(board, r, _c, true);
  let [bWord, bVal, bBonus] = _recVerticalSearch(board, r+1, _c, false);

  let word = tWord + bWord;
  let points = tVal + bVal;
  tBonus.concat(bBonus).forEach(bonus => {
    if (bonus === BoardSpaceTypes.DOUBLE_WORD) { points *= 2; }
    else if (bonus === BoardSpaceTypes.TRIPLE_WORD) { points *= 3; }
  });

  return [word, points];
};


const validateBoardWords = (board) => {
  console.log('Validation board words...');
  let [rows, cols] = _getRowsAndColumns(board);
  let words = [];
  let totalValue = 0;

  if (rows.length === 1) {
    // One horizontal search
    let [word, points] = _horizontalSearch(board, rows[0], cols[0]);
    console.log(word, points);
    // cols.size many vertical searches
  } else {
    // One vertical search
    let [word, points] = _verticalSearch(board, rows[0], cols[0]);
    console.log(word, points);
    // rows.size many horizontal searches
  }
};

export default {
  validateTilePlacement,
  validateBoardWords
};
