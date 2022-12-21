import IPoint from "./Point";
import { RenderableShape } from "./RenderableShape";

export interface IHelper {
    getSnapPoint(currentPoint: IPoint): IPoint;

}

export interface IRenderableHelper {
    helper: IHelper | null;
}

export class RenderableHelper extends RenderableShape implements IRenderableHelper {
    helper: IHelper | null = null;
}

