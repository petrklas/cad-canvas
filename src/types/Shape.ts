import { ISnapper } from "./Snapper";
import { Polygon } from "@pixi/math";
import { IRenderableShape } from "./RenderableShape";
import Point from "./Point";
import { Angle } from "@/utils/Math";

export interface IShape {
    getSnappers: () => Array<ISnapper>;
    getRenderObject: () => IRenderableShape;
    hitArea: Polygon | null;
}

export interface ILineShape extends IShape {
    getStart: () => Point;
    getEnd: () => Point,
    hitArea: Polygon | null;
    angle: Angle,
    length: number,
}

export interface ILineShapeFormProperties {
    angle?: Angle,
    length?: number,
}