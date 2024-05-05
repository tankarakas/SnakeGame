import { Apple } from "./Apple.js";
import { Platform } from "./Platform.js";
import { Snake, Direction } from "./Snake.js";

/**
 * Snake Game
 * Contains the Snake game elements
 */
class SnakeGame {
  platform: Platform;
  gameContainer: HTMLElement;
  gameCanvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;


  /**
   * Constructs the game
   */
  constructor(gameCanvasID: string) {
    this.platform = new Platform();
    this.gameContainer = document.createElement("div");
    this.gameContainer.id = gameCanvasID;
    document.body.appendChild(this.gameContainer);
    this.gameCanvas = document.createElement("canvas");
    this.gameCanvas.setAttribute("width", this.platform.getWidthInPx());
    this.gameCanvas.setAttribute("height", this.platform.getHeightInPx());
    this.gameCanvas.style.backgroundColor = this.platform.backgroundColour;
    this.gameContainer.appendChild(this.gameCanvas);
    this.context = <CanvasRenderingContext2D>this.gameCanvas.getContext("2d");
    this.runGame();
  }

  bindKeys(): void {
    window.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowUp": 
          this.platform.snake.setNextMoveDirection(Direction.UP);
          break;
        case "ArrowDown":
          this.platform.snake.setNextMoveDirection(Direction.DOWN);
          break;
        case "ArrowLeft":
          this.platform.snake.setNextMoveDirection(Direction.LEFT);
          break;
        case "ArrowRight":
          this.platform.snake.setNextMoveDirection(Direction.RIGHT);
          break;
      }
    });
  }

  /**
   *
   */
  runGame(): void {
    this.drawCanvas(0);
    const self = this;
    const dur = 1000;
    let last = 0;
    let speed = 60 / dur;
    let lastTimeStamp = 0;

    this.bindKeys();

    function frame(timestamp: number) {
      let timeInSecond = timestamp / dur;
      if (timeInSecond - last >= speed) {
        self.platform.stepGame();
        last = timeInSecond;
      }
      self.drawCanvas(0);
      window.requestAnimationFrame(frame);
    }

    window.requestAnimationFrame(frame);
  }

  drawSnake(delta: number) {
    this.platform.snake.segments.forEach((segment, index) => {
      this.context.fillStyle = this.platform.snake.colour;
      // if (index === 0) {
      //   this.context.arc(segment.x, segment.y, 70, 0, Math.PI, false);
      //   context.closePath();
      //   context.lineWidth = 0;
      //   context.fillStyle = 'red';
      //   context.fill();
      //   context.stroke();
      // } else {
      this.context.fillRect(
        segment.x * this.platform.blockSize,
        segment.y * this.platform.blockSize,
        this.platform.blockSize,
        this.platform.blockSize
      );
      // }
    });
  }

  drawApple(delta: number) {
    this.context.fillStyle = this.platform.apple.colour;
    this.context.fillRect(
      this.platform.apple.x * this.platform.blockSize,
      this.platform.apple.y * this.platform.blockSize,
      this.platform.blockSize,
      this.platform.blockSize
    );
  }

  drawCheckeredBackground(delta: number) {
    const colour1 = "gray";
    const colour2 = "blue";
    let currentColour = "gray";
    let colour = colour1;
    for (
      let currentXposition = 0;
      currentXposition <= this.platform.widthBlocks;
      currentXposition++
    ) {
      for (
        let currentYposition = 0;
        currentYposition <= this.platform.heightBlocks;
        currentYposition++
      ) {
        currentColour = currentColour === colour1 ? colour2 : colour1;
        this.context.fillStyle = colour;
        this.context.fillRect(
          this.platform.blockSize * currentXposition,
          this.platform.blockSize * currentYposition,
          this.platform.blockSize,
          this.platform.blockSize
        );
      }
    }
  }

  clearBoard(delta: number) {
    this.context.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }

  drawScore(delta: number) {
    this.context.font = "30px Arial";
    this.context.fillStyle = "black";
    this.context.fillText("Score: " + this.platform.snake.score, 30, 50);
    this.context.fillStyle = "black";
    this.context.fillText(
      "Best Score: " + this.platform.snake.bestScore,
      30,
      50 * 2
    );
  }

  drawCanvas(delta: number) {
    this.clearBoard(delta);
    this.drawApple(delta);
    this.drawSnake(delta);
    this.drawScore(delta);
  }
}

const snakeGame = new SnakeGame("gameCanvas");
console.log(snakeGame);

// let canvas = document.getElementById('gameCanvas');
// canvas.setAttribute("height", "500");
// canvas.setAttribute("width", "500");
// canvas.style.backgroundColor = "lightgray";
// let ctx = canvas.getContext("2d");
// ctx.fillStyle = "red";
// ctx.fillRect(250, 250, 10, 10);
