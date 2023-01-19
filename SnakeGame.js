import { Apple } from './Apple.js';
import { Platform } from './Platform.js';
import { Snake } from './Snake.js';

/**
 * Snake Game
 * Contains the Snake game elements
 */
class SnakeGame {
  /**
   * Constructs the game
   * @param {string} gameCanvasID canvas ID in the HTML
   */
  constructor(gameCanvasID) {
    this.platform = new Platform();
    this.gameCanvas = document.getElementById(gameCanvasID);
    this.gameCanvas.setAttribute('width', this.platform.getWidthInPx());
    this.gameCanvas.setAttribute('height', this.platform.getHeightInPx());
    this.gameCanvas.style.backgroundColor = this.platform.backgroundColour;
    this.context = this.gameCanvas.getContext('2d');
    this.runGame();
  }

  bindKeys() {
    window.addEventListener('keydown', (e) => {
      if (e.code == 'ArrowUp') {
        this.platform.snake.setNextMoveDirection('UP');
      } else if (e.code == 'ArrowDown') {
        this.platform.snake.setNextMoveDirection('DOWN');
      } else if (e.code == 'ArrowLeft') {
        this.platform.snake.setNextMoveDirection('LEFT');
      } else if (e.code == 'ArrowRight') {
        this.platform.snake.setNextMoveDirection('RIGHT');
      }
    });
  }

  /**
   * 
   */
  runGame() {
    this.drawCanvas();
    var self = this;
    var dur = 1000;
    var last = 0;
    var speed = 60/dur;
    var lastTimeStamp = 0;
    
    this.bindKeys();

    function frame(timestamp) {
      let timeInSecond = timestamp / dur;
      if (timeInSecond - last >= speed) {
        self.platform.stepGame();
        last = timeInSecond
      }
      self.drawCanvas();
      window.requestAnimationFrame(frame);
    }
    frame();
  }

  drawSnake(delta) {
    this.platform.snake.segments.forEach((segment, index) => {
      if (index === 0) {
        this.context.fillStyle = "darkgreen";
      } else {
        this.context.fillStyle = this.platform.snake.colour;
      }
      this.context.fillRect(
        segment.x * this.platform.blockSize,
        segment.y * this.platform.blockSize,
        this.platform.blockSize,
        this.platform.blockSize
      );
    });
  }

  drawApple() {
    this.context.fillStyle = this.platform.apple.colour;
    this.context.fillRect(
      this.platform.apple.x * this.platform.blockSize,
      this.platform.apple.y * this.platform.blockSize,
      this.platform.blockSize,
      this.platform.blockSize
    );
  }

  drawCheckeredBackground() {
    const colour1 = 'gray';
    const colour2 = 'blue';
    var currentColour = 1;
    var currentXposition = 0;
    var currentYposition = 0;
    while (currentXposition <= this.platform.widthBlocks) {
      while (currentYposition <= this.platform.heightBlocks) {
        if (currentColour === 1) {
          var colour = colour1;
          currentColour = 2;
        } else if (currentColour === 2) {
          var colour = colour2;
          currentColour = 1;
        }
        this.context.fillStyle = colour;
        this.context.fillRect(
          this.platform.blockSize * this.currentXposition,
          this.platform.blockSize * this.currentYposition,
          this.blockSize,
          this.blockSize
        )
        currentYposition++;
      }
      currentXposition++;
    }
  }

  clearBoard(delta) {
    this.context.clearRect(
      0,
      0,
      this.gameCanvas.width,
      this.gameCanvas.height
    );
  }

  drawScore() {
    this.context.font = "30px VT323";
    this.context.fillStyle = "black";
    this.context.fillText("Score: " + this.platform.snake.score, 30, 30);
    this.context.fillStyle = "black";
    this.context.fillText("Best Score: " + this.platform.snake.bestScore, 30, 30 * 2);
  }

  drawCanvas(delta) {
    this.clearBoard(delta);
    this.drawApple(delta);
    this.drawSnake(delta);
    this.drawScore(delta);
  }
}

var snakeGame = new SnakeGame('gameCanvas');
console.log(snakeGame);

// let canvas = document.getElementById('gameCanvas');
// canvas.setAttribute("height", "500");
// canvas.setAttribute("width", "500");
// canvas.style.backgroundColor = "lightgray";
// let ctx = canvas.getContext("2d");
// ctx.fillStyle = "red";
// ctx.fillRect(250, 250, 10, 10);