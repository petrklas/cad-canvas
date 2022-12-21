import Point from "@/types/Point";
import { Angle } from "@/utils/Math";
import { Polygon, Rectangle, Transform } from "pixi.js";

export default class HitArea {
    rectangle: Rectangle;
    transform: Transform;
    rotation: Angle;

    constructor(start: Point, width: number, height: number, rotation: Angle) {
        this.rectangle = new Rectangle(start.x, start.y, width, height);
        this.transform = new Transform();
        this.rotation = rotation;
        this.transform.rotation = rotation.toRad();
    }

    getAsPolygon(): Polygon {

        const x0 = Math.floor(Math.tan(this.rotation.toRad()) * this.rectangle.width);

        const output = new Array(8);
        output[0] = this.rectangle.x;
        output[1] = this.rectangle.y;

        // Add the reflected x, y at the end
        output[2] = this.rectangle.x + this.rectangle.width;
        output[3] = this.rectangle.y + x0;

        // Add the x, y at the beginning
        output[4] = this.rectangle.x + this.rectangle.width;
        output[5] = this.rectangle.y + this.rectangle.height + x0;

        // Add the reflected x, y at the end
        output[6] = this.rectangle.x;
        output[7] = this.rectangle.y + this.rectangle.height;

        return new Polygon(output);
    }
}