import Point from "@/types/Point";
import Engine from "./Engine";

export default class Mouse {
    x: number;
    y: number;

    constructor(position: Point) {
        this.x = position.x;
        this.y = position.y;
    }

    getAbsolutePosition(): Point {
        return new Point(this.x, this.y);
    }
}