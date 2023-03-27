const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
let time = { start: 0, elapsed: 0, level: 1000 };
let requestId = null;

const moves = {
  [KEY.LEFT]:  (p) => ({ ...p, x: p.x - 1 }),  
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),  
  [KEY.DOWN]:  (p) => ({ ...p, y: p.y + 1 }),
  [KEY.UP]: (p) => board.rotate(p),
  [KEY.SPACE]: (p) => ({ ...p, y: p.y + 1 }),  
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

function addEventListener() {
  document.removeEventListener('keydown', handleKeyPress);
  document.addEventListener('keydown', handleKeyPress);
}
 
function play() {
  board = new Board(ctx);
  addEventListener();
 
  // If we have an old game running then cancel it
  if (requestId) {
    cancelAnimationFrame(requestId);
  }

  time.start = performance.now();
  animate();
}

function draw() {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);   
 
  board.piece.draw();
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

    if(event.keyCode === KEY.SPACE) {
      // Hard drop
      while(board.valid(p)) {
        board.piece.move(p);
        p = moves[KEY.SPACE](board.piece);
      }
    }

    if(board.valid(p)) {
      board.piece.move(p);
    }
  }
}

function drop() {
  let p = moves[KEY.DOWN](board.piece);
  if (board.valid(p)) {
    board.piece.move(p);
  }
}

function animate(now = 0) {
  // Updae elapsed time.
  time.elapsed = now - time.start;

  // If elapsed time has passed the level interval.
  if(time.elapsed > time.level) {
    // Restar counting from now..
    time.start = now;
    drop();
  }
  draw();
  requestId = requestAnimationFrame(animate);
}

