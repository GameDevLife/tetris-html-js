const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const moves = {
  [KEY.LEFT]:  (p) => ({ ...p, x: p.x - 1 }),  
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),  
  [KEY.DOWN]:  (p) => ({ ...p, y: p.y + 1 })  
};
/**
 * Calculate size of canvas from constants
 */
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

/**
 * Scale blocks
 */
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

function play() {
  board = new Board(ctx);
  console.table(board.grid);
  draw();
  addEventListener();
}

function draw() {
  const {width, height} = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  board.piece.draw();
}

function addEventListener() {
  document.removeEventListener('keydown', handleKeyPress);
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
  /** 
   * Stop the event from bubbling.
  */   
  event.preventDefault();

  if(moves[event.keyCode]) {
    /** 
    * Get new state of piece
    */ 
    let p = moves[event.keyCode](board.piece);
    board.piece.move(p);
    draw();
  }
}