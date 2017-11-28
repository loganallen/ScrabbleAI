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

  return [
    [...rows].sort(),
    [...cols].sort()
  ];
}

const _isAdjacentToSetTile = (board, r, c) => {
  let valid = false;
  if (r > 0) { valid = valid || board[r-1][c].isSet; }
  if (r < 14) { valid = valid || board[r+1][c].isSet; }
  if (c > 0) { valid = valid || board[r][c-1].isSet; }
  if (c < 14) { valid = valid || board[r][c+1].isSet; }

  return valid;
}

// Validate tile placement on board
const validateTilePlacement = (board, firstTurn) => {
  console.log('Validating tile placement...');
  let [rows, cols] = _getRowsAndColumns(board);

  if (firstTurn) {
    // Fail if no tile in starting space for the first turn
    if (!board[7][7].tile) {
      throw new Error('Word must pass through starting space');
    } else if (rows.length === 1 && cols.length === 1) {
      throw new Error('Word must be longer than 1 letter');
    }
  } else {
    // Fail if tiles don't touch any already set tiles
    let valid = false;
    rows.forEach(r => {
      cols.forEach(c => {
        valid = valid || _isAdjacentToSetTile(board, r, c);
      });
    });
    if (!valid) {
      throw new Error('Word must be adjacent to set tiles');
    }
  }

  // Fail if tiles not all in same row or column
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

// Extract the tile value and bonus for this space
const _extractTileValueAndBonus = (space) => {
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
        value = space.tile.value;
        break;
      default:
        value = space.tile.value;
    }
  }

  return [value, bonus];
}

// Recursively builds horizontal word with points and keeps track of word bonuses
const _recHorizontalSearch = (board, _r, c, expandLeft) => {
  // Return if out of bounds
  if (c < 0 || c > 14) return ['', 0, []];

  // Return if space has no tile
  let space = board[_r][c];
  if (!space.tile) return ['', 0, []];

  // Get the proper value of the tile
  let [value, bonus] = _extractTileValueAndBonus(space);

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
  let points = 0;
  // One letter words don't count
  if (word.length > 1) {
    points = lVal + rVal;
  }

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
  let [value, bonus] = _extractTileValueAndBonus(space);

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
  let points = 0;
  // One letter words don't count
  if (word.length > 1) {
    points = tVal + bVal;
  }

  tBonus.concat(bBonus).forEach(bonus => {
    if (bonus === BoardSpaceTypes.DOUBLE_WORD) { points *= 2; }
    else if (bonus === BoardSpaceTypes.TRIPLE_WORD) { points *= 3; }
  });

  return [word, points];
};

// Validate words on board and generate point totals
const validateBoardWords = (board) => {
  console.log('Validation board words...');
  let [rows, cols] = _getRowsAndColumns(board);
  let words = [];
  let totalPoints = 0;

  if (rows.length === 1) {
    // One horizontal search
    let [word, points] = _horizontalSearch(board, rows[0], cols[0]);
    words.push(word);
    totalPoints += points;

    // cols.length many vertical searches
    cols.forEach(c => {
      let [word, points] = _verticalSearch(board, rows[0], c);
      words.push(word);
      totalPoints += points;
    });
  } else {
    // One vertical search
    let [word, points] = _verticalSearch(board, rows[0], cols[0]);
    words.push(word);
    totalPoints += points;

    // rows.length many horizontal searches
    rows.forEach(r => {
      let [word, points] = _horizontalSearch(board, r, cols[0]);
      words.push(word);
      totalPoints += points;
    });
  }

  // Filter out one letter words
  words = words.filter(word => word.length > 1);
  console.log(words, 'Points:', totalPoints);
  return [words, totalPoints];
};

export default {
  validateTilePlacement,
  validateBoardWords
};
