import Point from "@/types/Point";
import { IRectangleShape } from "@/types/Shape";
import { Angle } from "@/utils/Math";
import RectangleRenderer from "../Renderer/RectangleRenderer";
import { ISnapper } from "@/types/Snapper";
import { Style as RectangleStyle } from "./Rectangle/Style";
import HitArea from "./HitArea";


export class Rectangle implements IRectangleShape {
    private start: Point = new Point(0, 0);
    private end: Point = new Point(0, 0);
    private width = 0;
    private height = 0;
    rotation: Angle = new Angle(0);
    hitArea: HitArea | null = null;
    style: RectangleStyle = new RectangleStyle();

    setStart(start: Point) {
        this.start = start;
        this.hitArea = null;
    }

    setEnd(end: Point) {
        this.end = end;
        this.hitArea = null;
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

    getHitArea(): HitArea {
        if(this.hitArea !== null) {
            return this.hitArea;
        }

        this.hitArea = new HitArea(this.getStart(), this.getWidth(), this.getHeight(), this.getAngle());

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
