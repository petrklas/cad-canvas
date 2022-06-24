import { ISnapper } from "./Snapper";
import { Polygon } from "@pixi/math";
import { IRenderableShape } from "./RenderableShape";
import Point from "./Point";
import { Angle } from "@/utils/Math";
import { ILayer } from "./Layer";
import { IShapeBorder } from "./Border";

export interface IShape {
    getRenderObject: () => IRenderableShape;
    getSnappers: () => Array<ISnapper>;
    layer: ILayer;
}

export interface ILineShape extends IShape {
    getStart: () => Point;
    getEnd: () => Point,
    getSnappers: () => Array<ISnapper>;
    hitArea: Polygon | null;
    rotation: Angle,
    length: number,
}

export interface IRectangleShape extends IShape {
    getStart: () => Point;
    getWidth: () => number,
    getHeight: () => number,
    rotation: Angle,
}

export interface ILineShapeFormProperties {
    rotation: Angle,
    length: number,
}