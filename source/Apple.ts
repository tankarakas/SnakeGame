import { Platform } from "./Platform";

export class Apple {
    x: number;
    y: number;
    colour: string;

    constructor(platform: Platform) {
        this.colour = 'red';
        this.x = Math.floor(Math.random() * platform.widthBlocks);
        this.y = Math.floor(Math.random() * platform.heightBlocks);
    }
}