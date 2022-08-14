import ICommand from "@/types/Command";
import Layer from "../Layer";
import RectangleRenderer from "../Renderer/RectangleRenderer";
import { Rectangle } from "../Shapes/Rectangle";

export class DrawRectangle implements ICommand {
    rectangle: Rectangle;
    rectangleRenderer: RectangleRenderer;
    layer: Layer;

    constructor(rectangle: Rectangle, layer: Layer) {
        this.rectangle = rectangle;
        this.layer = layer;
        this.rectangleRenderer = this.rectangle.getRenderObject();
    }

    execute(): void {
        this.rectangleRenderer.addToLayer(this.layer);
    }

    undo(): void {
        this.rectangleRenderer.removeFromLayer();
    }
}