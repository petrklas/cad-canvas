import Point from "./Point";
import { RenderableShape } from "./RenderableShape";

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

export class RenderableSnapper extends RenderableShape implements IRenderableSnapper {
    snapper: ISnapper | null = null;
}

