import Layer from "@/models/Layer";
import { SmoothGraphics as Graphics } from '@pixi/graphics-smooth';

interface IRenderableObject {
    addToLayer(layer: Layer): void;
}
export default class RenderableObject extends Graphics implements IRenderableObject {
    addToLayer(layer: Layer): void {
        layer.addShape(this);
    }
}