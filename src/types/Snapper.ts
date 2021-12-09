import Layer from "@/models/Layer";
import Point from "./Point";
import RenderableObject from "./RenderableObject";

export enum SnapTypes {
    Endpoint,
    Center
}

export interface ISnapper {
    type: SnapTypes,
    getSnapPoint(): Point;
    isSnapPointHovered(mouseCursor: Point): boolean;
    getRenderObject(): RenderableSnapper

}

export interface IRenderableSnapper {
    snapper: ISnapper | null;
}

export class RenderableSnapper extends RenderableObject implements IRenderableSnapper {
    snapper: ISnapper | null = null;
}

