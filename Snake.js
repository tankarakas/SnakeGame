import { Apple } from "./Apple.js";

/**
 * The snake class, which is a class Snake
 */
export class Snake {
  /**
     * Constructs the snake
     * @param {Platform} platform the game platform
     */
  constructor(platform) {
    this.score = 0;
    this.bestScore = this.getBestScore();
    const centerPosition = platform.getCentrePosition();
    this.segments = [
      {
        x: centerPosition.x,
        y: centerPosition.y,
        s: 10,
      }
    ];
    this.direction = '';
    this.currentMoveDirection = '';
    this.nextMoveDirection = '';
    this.platform = platform;
    this.colour = 'green';
  }

  getBestScore() {
    if (window.localStorage.getItem("Snake_bestScore")){
      window.localStorage.getItem("Snake_bestScore");
    } else {
      window.localStorage.setItem("Snake_bestScore", 0);
    }
    return window.localStorage.getItem("Snake_bestScore");
  }

  setBestScore() {
    if (this.score > this.getBestScore()) {
      window.localStorage.setItem("Snake_bestScore", this.score);
    }
  }

  /**
   * Returns the head segment of the snake
   * @return {object} the head segment
   */
  getHeadSegment() {
    return this.segments[0];
  }

  /**
   * Removes tail segment
   * @return {object} tail segment
   */
  removeTailSegment() {
    return this.segments.pop();
  }

  /**
   * Adds a head segment to the snake
   * @param {object} segment a snake segment
   */
  addHeadSegment(segment) {
    this.segments.unshift(segment);
  }

  /**
   * sets the next direction of the snake
   * @param {string} direction the next direction of the snake
   */
  setNextMoveDirection(direction) {
    if (this.isLegalMove(direction)) {
      this.nextMoveDirection = direction;
    }
  }

  /**
   * Checks if the next move is illegal
   * @param {object} nextSnakeState the next state of the snake
   * @return {boolean} true if next move will be illegal
   */
  nextMoveIsIllegal(nextSnakeState) {
    const nextSnakeStateHead = nextSnakeState[0];
    const crashedSegment = nextSnakeState.find((segment) => {
      nextSnakeStateHead.x === segment.x &&
      nextSnakeStateHead.y === segment.y;
    });
    return typeof crashedSegment !== 'undefined';
  }

  /**
   * moves the snake
   */
  move() {
    switch (this.nextMoveDirection) {
      case 'UP': this.moveUp(); break;
      case 'DOWN': this.moveDown(); break;
      case 'LEFT': this.moveLeft(); break;
      case 'RIGHT': this.moveRight(); break;
    }
  }

  /**
   * Moves the snake to the next segment
   * @param {object} nextSegment where the head location will be
   */
  moveSnakeToNextSegment(nextSegment) {
    this.addHeadSegment(nextSegment);
    if (this.canEat()) {
      this.eat();
    } else {
      this.removeTailSegment();
    }
  }

  /**
     * Moves the snake rightwards
     * @todo
     */
  moveRight() {
    const headSegment = this.getHeadSegment();
    const nextSegment = {
      x: headSegment.x + 1,
      y: headSegment.y,
    };
    if (nextSegment.x > this.platform.widthBlocks - 1) {
      nextSegment.x = 0;
    }
    this.moveSnakeToNextSegment(nextSegment);
  }

  /**
     * Moves the snake leftwards
     * @todo
     */
  moveLeft() {
    const headSegment = this.getHeadSegment();
    const nextSegment = {
      x: headSegment.x - 1,
      y: headSegment.y,
    };
    if (nextSegment.x < 0) {
      nextSegment.x = this.platform.widthBlocks - 1;
    }
    this.moveSnakeToNextSegment(nextSegment);
  }

  /**
     * Moves the snake upwards
     * @todo
     */
  moveUp() {
    const headSegment = this.getHeadSegment();
    const nextSegment = {
      x: headSegment.x,
      y: headSegment.y - 1,
    };
    if (nextSegment.y < 0) {
      nextSegment.y = this.platform.heightBlocks - 1;
    }
    this.moveSnakeToNextSegment(nextSegment);
  }

  /**
     * Moves the snake downwards
     * @todo
     */
  moveDown() {
    const headSegment = this.getHeadSegment();
    const nextSegment = {
      x: headSegment.x,
      y: headSegment.y + 1,
    };
    if (nextSegment.y > this.platform.heightBlocks - 1) {
      nextSegment.y = 0;
    }
    this.moveSnakeToNextSegment(nextSegment);
  }

  /**
   * 
   */
  isLegalMove(key) {
    if (key === 'UP' && this.nextMoveDirection === 'DOWN') {
      return false;
    } else if (key === 'DOWN' && this.nextMoveDirection === 'UP') {
      return false;
    } else if (key === 'LEFT' && this.nextMoveDirection === 'RIGHT') {
      return false;
    } else if (key === 'RIGHT' && this.nextMoveDirection === 'LEFT') {
      return false;
    }
    return true;
  }

  getBody() {
    return this.segments.filter((segments, index, arr) => index !== 0)
  }

  /**
     * Checks if the snake has crashed
     * @param {object} segment the segment of the next snake
     * @return {boolean} true if the snake has crashed
     */
  crashed() {
    const headSegment = this.getHeadSegment();
    const crashedSegment = this.getBody().find((segment) => {
      return headSegment.x === segment.x && headSegment.y === segment.y;
    });
    return this.segments.length > 1 && typeof crashedSegment !== 'undefined';
  }

  canEat() {
    const head = this.getHeadSegment();
    return this.platform.apple.x === head.x && this.platform.apple.y === head.y;
  }

  /**
     * Eats food
     * @todo
     */
  eat() {
    this.score++;
    this.platform.apple = new Apple(this.platform);
  }
}
