import { Snake } from "./Snake.js";
import { Apple } from "./Apple.js";
export class Platform {
    constructor() {
        this.blockSize = 30;
        this.widthBlocks = 25;
        this.heightBlocks = 25;
        this.backgroundColour = 'lightgreen';
        this.snake = new Snake(this);
        this.apple = new Apple(this);
    }
    stepGame() {
        if (!this.snake.crashed()) {
            this.snake.move();
        }
        else {
            this.snake.setBestScore();
        }
    }
    getCentrePosition() {
        return {
            x: Math.floor(this.widthBlocks / 2),
            y: Math.floor(this.heightBlocks / 2)
        };
    }
    getHeightInPx() {
        return (this.heightBlocks * this.blockSize).toString();
    }
    getWidthInPx() {
        return (this.widthBlocks * this.blockSize).toString();
    }
}
