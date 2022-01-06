import IMousePosition from "@/types/Mouse";
import Point from "@/types/Point";
import Layer from "./Layer";

export default class MousePosition implements IMousePosition{
    absolute: Point = new Point(0, 0);
    relative: Point = new Point(0, 0);

    getAbsolutePosition(): Point {
        return this.absolute;
    }

    getRelativePosition(): Point {
        return this.relative;
    }
}