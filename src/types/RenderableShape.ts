import Layer from "@/models/Layer";
import RenderableObject from "./RenderableObject";
import { IShape } from "./Shape";

export interface IRenderableShape {
    shape: IShape | null;
    renderShape(layer: Layer): void;
}

export class RenderableShape extends RenderableObject implements IRenderableShape {
    shape: IShape | null = null;
    renderShape(layer: Layer): void {
        // TODO - update the abstract class
        console.log(layer);
    }
}