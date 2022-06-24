import { RenderableShape } from "@/types/RenderableShape";
import Layer from "../Layer";
import { Rectangle } from "../Shapes/Rectangle";

export default class RectangleRenderer extends RenderableShape {
    shape: Rectangle;

    constructor(line: Rectangle) {
        super();
        this.shape = line;
    }


    renderShape(layer: Layer) {
        this.clear();
        this.lineStyle({ width: layer.getBorderWidth(), color: layer.getColor() });
        this.drawRect(this.shape.getStart().x, this.shape.getStart().y, this.shape.getWidth(), this.shape.getHeight());
    }


    addToLayer() {
        this.renderShape(this.shape.layer);
        this.shape.layer.addShape(this);
    }

    removeFromLayer() {
        this.clear();
        this.removeAllListeners();
    }
}
