import RenderableObject from "./RenderableObject";
import { IShape } from "./Shape";

export interface IRenderableShape {
    shape: IShape | null;
}

export class RenderableShape extends RenderableObject implements IRenderableShape {
    shape: IShape | null = null;
}