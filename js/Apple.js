export class Apple {
    constructor(platform) {
        this.colour = 'red';
        this.x = Math.floor(Math.random() * platform.widthBlocks);
        this.y = Math.floor(Math.random() * platform.heightBlocks);
    }
}