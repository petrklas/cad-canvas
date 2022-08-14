import Point from "@/types/Point";
import { Polygon } from "@pixi/math";
import { IRectangleShape } from "@/types/Shape";
import { Angle } from "@/utils/Math";
import Layer from "../Layer";
import RectangleRenderer from "../Renderer/RectangleRenderer";
import { ISnapper } from "@/types/Snapper";
import { Style as RectangleStyle } from "./Rectangle/Style";


export class Rectangle implements IRectangleShape {
    private start: Point = new Point(0, 0);
    private end: Point = new Point(0, 0);
    private width = 0;
    private height = 0;
    rotation: Angle = new Angle(0);
    hitArea: Polygon | null = null;
    style: RectangleStyle = new RectangleStyle();

    setStart(start: Point) {
        this.start = start;
    }

    setEnd(end: Point) {
        this.end = end;
    }

    getStart(): Point {
        return this.start;
    }

    getWidth(): number {
        return this.end.x - this.start.x;
    }

    getHeight(): number {
        return this.end.y - this.start.y;
    }

    getHitArea(): Polygon {
        if(this.hitArea !== null) {
            return this.hitArea;
        }

        const output = new Array(8);

        // Add the x, y at the beginning
        output[0] = this.start.x;
        output[1] = this.start.y;

        // Add the reflected x, y at the end
        output[2] = this.start.x + this.width;
        output[3] = this.start.y;

        // Add the x, y at the beginning
        output[4] = this.start.x + this.width;
        output[5] = this.start.y + this.height;

        // Add the reflected x, y at the end
        output[6] = this.start.x;
        output[7] = this.start.y + this.height;

        this.hitArea = new Polygon(output);
        return this.hitArea;
    }

    getAngle(): Angle {
        return this.rotation;
    }

    getSnappers (): ISnapper[] {
        return [];
    }

    getRenderObject(): RectangleRenderer {
        return new RectangleRenderer(this);
    }
}
