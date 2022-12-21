import Layer from "@/models/Layer";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';
import { IShape } from "./Shape";

export interface IRenderableShape {
    shape: IShape | null;
    renderShape(layer: Layer): void;
    addToLayer(layer: Layer): void;
}

export class RenderableShape extends Graphics implements IRenderableShape {
    shape: IShape | null = null;

    renderShape(layer: Layer): void {
        // TODO - update the abstract class
        console.log(layer);
    }

    addToLayer(layer: Layer): void {
        layer.addShape(this);
    }
}