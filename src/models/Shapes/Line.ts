import Point from "@/types/Point";
import { Polygon } from "@pixi/math";
import { CenterSnapper, EndPointSnapper } from "../Snappers/Snappers";
import { ILineShape } from "@/types/Shape";
import LineRenderer from "../Renderer/LineRenderer";
import { Angle, getLineAngle, getLineLength, getEndpointFromLengthAndAngle } from "@/utils/Math";
import { Style as LineStyle } from "./Line/Style";
import HitArea from "./HitArea";

export class Line implements ILineShape {
    private start: Point = new Point(0, 0);
    private end: Point = new Point(0, 0);
    length = 0;
    rotation: Angle = new Angle(0);
    center: Point = new Point(0, 0);
    hitArea: HitArea | null = null;
    style: LineStyle = new LineStyle();
    rendererInstance: LineRenderer | undefined;


    setStart(start: Point) {
        this.start = start;
        this.calcValues();
    }

    setEnd(end: Point) {
        this.end = end;
        this.calcValues();
    }

    getStart(): Point {
        return this.start;
    }

    getEnd(): Point {
        return this.end;
    }

    calcValues() {
        this.center = new Point((this.end.x + this.start.x) / 2, (this.end.y + this.start.y) / 2);
        this.rotation = getLineAngle(this.start, this.end);
        this.length = getLineLength(this.start, this.end);
    }

    getHitArea(): HitArea {
        if(this.hitArea !== null) {
            return this.hitArea;
        }
        this.hitArea = new HitArea(this.getStart(), this.getLength(), 20, this.getAngle());

        return this.hitArea;
    }

    /*
    getHoverArea(): Polygon {
        if(this.hitArea !== null) {
            return this.hitArea;
        }

        const output = new Array(8);
        const DISTANCE = 5;
        // Start
        const x0 = this.start.x;
        const y0 = this.start.y;

        // End
        const x1 = this.end.x;
        const y1 = this.end.y;

        // Get the angle of the line
        const a = Math.atan2(-x1 + x0, y1 - y0);
        const deltaX = Math.floor(DISTANCE * Math.cos(a));
        const deltaY = Math.floor(DISTANCE * Math.sin(a));

        // Add the x, y at the beginning
        output[0] = this.start.x + deltaX;
        output[1] = this.start.y + deltaY;

        // Add the reflected x, y at the end
        output[2] = this.start.x - deltaX;
        output[3] = this.start.y - deltaY;

        // Add the x, y at the beginning
        output[4] = this.end.x - deltaX;
        output[5] = this.end.y - deltaY;

        // Add the reflected x, y at the end
        output[6] = this.end.x + deltaX;
        output[7] = this.end.y + deltaY;

        this.hitArea = new Polygon(output);
        return this.hitArea;
    }*/


    // Get center point of the line
    getCenter(): Point {
        return this.center;
    }

    getAngle(): Angle {
        return this.rotation;
    }

    getLength(): number {
        return this.length;
    }

    setLength(length: number) {
        const endpoint = getEndpointFromLengthAndAngle(this.start, length, this.rotation);
        this.setEnd(endpoint);
    }

    setAngle(angle: Angle) {
        const endpoint = getEndpointFromLengthAndAngle(this.start, this.length, angle);
        this.setEnd(endpoint);
    }

    getSnappers(): Array<EndPointSnapper | CenterSnapper> {
        const startSnapper = new EndPointSnapper(this.start);
        const endSnapper = new EndPointSnapper(this.end);
        const centerSnapper = new CenterSnapper(this.getCenter());
        return [
            startSnapper,
            endSnapper,
            centerSnapper,
        ];
    }

    getRenderObject(): LineRenderer {
        if (!this.rendererInstance ) {
            this.rendererInstance = new LineRenderer(this);
        }

        return this.rendererInstance;
    }
}
