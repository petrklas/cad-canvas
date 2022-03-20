import { ISnapper } from "./Snapper";
import { Polygon } from "@pixi/math";
import { IRenderableShape } from "./RenderableShape";
import Point from "./Point";
import { Angle } from "@/utils/Math";
import { IShapeColorType } from "./Color";
import { ILayer } from "./Layer";
import { IShapeBorder } from "./Border";

export interface IShape {
    getSnappers: () => Array<ISnapper>;
    getRenderObject: () => IRenderableShape;
    hitArea: Polygon | null;
    layer: ILayer;
}

export interface ILineShape extends IShape {
    getStart: () => Point;
    getEnd: () => Point,
    hitArea: Polygon | null;
    rotation: Angle,
    length: number,
    border: IShapeBorder,
}

export interface ILineShapeFormProperties {
    rotation: Angle,
    length: number,
}