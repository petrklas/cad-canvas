import IPoint from "./Point";
import RenderableObject from "./RenderableObject";

export interface IHelper {
    getSnapPoint(currentPoint: IPoint): IPoint;

}

export interface IRenderableHelper {
    helper: IHelper | null;
}

export class RenderableHelper extends RenderableObject implements IRenderableHelper {
    helper: IHelper | null = null;
}

