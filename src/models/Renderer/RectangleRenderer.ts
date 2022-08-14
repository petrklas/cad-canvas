import { IShapeBorderValues } from "@/types/Border";
import { IShapeFillValues } from "@/types/Fill";
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
        this.lineStyle({ width: this.getBorderStyle(layer).thickness, color: this.getBorderStyle(layer).color, shader: this.getBorderStyle(layer).shader });

        const fillStyle = this.getFillStyle(layer);
        if (fillStyle !== null) {
            console.log(fillStyle);
            this.beginFill(fillStyle.color, fillStyle.alpha)
        }

        this.drawRect(this.shape.getStart().x, this.shape.getStart().y, this.shape.getWidth(), this.shape.getHeight());
    }


    addToLayer(layer: Layer) {
        this.renderShape(layer);
        layer.addShape(this);
    }

    removeFromLayer() {
        this.destroy();
    }

    // TODO: its own class
    getBorderStyle(layer: Layer): IShapeBorderValues {
        let alpha, color, thickness, shader = null;
        if (this.shape.style.border.alpha == "inherited") {
            alpha = layer.getBorderAlpha();
        } else {
            alpha = this.shape.style.border.alpha;
        }

        if (this.shape.style.border.color == "inherited") {
            color = layer.getBorderColor();
        } else {
            color = this.shape.style.border.color;
        }

        if (this.shape.style.border.thickness == "inherited") {
            thickness = layer.getBorderThickness();
        } else {
            thickness = this.shape.style.border.thickness;
        }

        if (this.shape.style.border.shader == "inherited") {
            shader = layer.getBorderShader();
        } else {
            shader = this.shape.style.border.shader;
        }

        return { color: color, alpha: alpha, thickness: thickness, shader: shader };
    }

    getFillStyle(layer: Layer): IShapeFillValues | null {

        if (!this.shape.style.fill) {
            return null;
        }

        let alpha, color = null;
        if (this.shape.style.fill.alpha == "inherited") {
            alpha = layer.getBorderAlpha();
        } else {
            alpha = this.shape.style.fill.alpha;
        }

        if (this.shape.style.fill.color == "inherited") {
            color = layer.getBorderColor();
        } else {
            color = this.shape.style.fill.color;
        }

        return { color: color, alpha: alpha };
    }
}
