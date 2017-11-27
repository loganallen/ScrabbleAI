// API calls

/*
board[r][c] = {
  location: [x,y],
  type: key,
  tile: null,
  isSet: false
};
*/

const validateTilePlacement = (board, firstTurn) => {
  // Fail if no tile in starting space for the first turn
  if (firstTurn && !board[7][7].tile) {
    throw new Error('Word must pass through starting space');
  }

  // Fail if tiles not all in same row or column
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
  if (rows.size > 1 && cols.size > 1) {
    throw new Error('Invalid tile placements');
  }

  // Fail if tiles don't make contiguous word
  rows = [...rows].sort();
  cols = [...cols].sort();
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

export default {
  validateTilePlacement
};
