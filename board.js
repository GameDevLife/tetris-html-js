class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.getEmptyBoard();
    this.piece = new Piece(ctx);
  }

  getEmptyBoard() {
    return Array.from(
      {length: ROWS}, () => Array(COLS).fill(0)
    );
  }
  
  rotate(piece) {  
    // Clone with JSON
    let p = JSON.parse(JSON.stringify(piece));  
    
    // Transpose matrix, p is the Piece
    for (let y = 0; y < p.shape.length; ++y) {  
      for (let x = 0; x < y; ++x) {  
        [p.shape[x][y], p.shape[y][x]] =   
        [p.shape[y][x], p.shape[x][y]];  
      }  
    }
 
    // Reverse the order of the columns.  
    p.shape.forEach(row => row.reverse());
 
    return p;  
  }
}

