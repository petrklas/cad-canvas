import { ISnapper } from "./Snapper";
import { IRenderableShape } from "./RenderableShape";
import Point from "./Point";
import { Angle } from "@/utils/Math";
import { ILayer } from "./Layer";
import { IShapeBorder } from "./Border";
import HitArea from "@/models/Shapes/HitArea";

export interface IShape {
    getRenderObject: () => IRenderableShape;
    getSnappers: () => Array<ISnapper>;
    getHitArea: () => HitArea;
}

export interface ILineShape extends IShape {
    getStart: () => Point;
    getEnd: () => Point,
    getSnappers: () => Array<ISnapper>;
    hitArea: HitArea | null;
    rotation: Angle,
    length: number,
    getHitArea: () => HitArea;
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