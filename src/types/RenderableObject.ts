import Layer from "@/models/Layer";
import { Graphics } from "@pixi/graphics";

interface IRenderableObject {
    addToLayer(layer: Layer): void;
}
export default class RenderableObject extends Graphics implements IRenderableObject {
    addToLayer(layer: Layer) {
        layer.addShape(this);
    }
}