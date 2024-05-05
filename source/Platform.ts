import { Snake } from "./Snake.js";
import { Apple } from "./Apple.js";

export type Coordinates = {
  x: number;
  y: number;
}

export class Platform {
  blockSize: number;
  widthBlocks: number;
  heightBlocks: number;
  backgroundColour: string;
  snake: Snake;
  apple: Apple;

  constructor() {
    this.blockSize = 30;
    this.widthBlocks = 25;
    this.heightBlocks = 25;
    this.backgroundColour = 'lightgreen';
    this.snake = new Snake(this);
    this.apple = new Apple(this);
  }

  stepGame(): void {
    if (!this.snake.crashed()) {
      this.snake.move();
    } else {
      this.snake.setBestScore();
    }
  }

  getCentrePosition(): Coordinates {
    return {
      x: Math.floor(this.widthBlocks / 2),
      y: Math.floor(this.heightBlocks / 2)
    }
  }

  getHeightInPx() {
    return (this.heightBlocks * this.blockSize).toString();
  }

  getWidthInPx() {
    return (this.widthBlocks * this.blockSize).toString();
  }
}
