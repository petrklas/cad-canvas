import { Polygon } from "@pixi/math";
import { Line } from "../Shapes/Line";
import { RenderableShape } from "@/types/RenderableShape";
import { Text, TextStyle } from "@pixi/text";
import Layer from "../Layer";
import ForegroundLayer from "../ForegroundLayer";
import { IShapeBorderValues } from "@/types/Border";
export default class LineRenderer extends RenderableShape {
    shape: Line;

    constructor(line: Line) {
        super();
        this.shape = line;
    }

    setInteractive() {
        if (this.shape.getHitArea()) {
            this.interactive = true;
            this.applyHitArea(this.shape.getHitArea());
        }
    }

    showAngleHelper() {
        // line is horizontal - no need to draw a helper
        if (this.shape.getStart().y == this.shape.getEnd().y) {
            return;
        }

        //const shader = new DashLineShader({dash: 5, gap: 8});
        this.lineStyle({ width: 1, color: 0xaaaaaa, alpha: 0.5 });
        this.moveTo(this.shape.getStart().x, this.shape.getStart().y);
        this.lineTo(this.shape.getStart().x + this.shape.getLength(), this.shape.getStart().y);

        if (this.shape.getStart().y < this.shape.getEnd().y) {
            this.arc(this.shape.getStart().x, this.shape.getStart().y, this.shape.getLength(), 0, this.shape.getAngle().toRad());
        } else {
            this.arc(this.shape.getStart().x, this.shape.getStart().y, this.shape.getLength(), 0, this.shape.getAngle().toRad(), true);
        }

        const style = new TextStyle({
            fontSize: 14,
            fill: 0xffffff
        });
        const basicText = new Text(Math.round(this.shape.getAngle().toDeg()).toString(), style);
        basicText.rotation = this.shape.getAngle().toRad();
        basicText.x = this.shape.getCenter().x + 10;
        basicText.y = this.shape.getCenter().y + 10;
        this.addChild(basicText);
    }

    applyHitArea(polygon: Polygon) {
        this.lineStyle(1, 0xff0000);
        this.drawShape(polygon);
        this.hitArea = polygon;
    }

    renderShape(layer: Layer) {
        const start = this.shape.getStart();
        const end = this.shape.getEnd();
        this.clear();
        this.removeChildren();

        if (layer instanceof ForegroundLayer) {
            this.showAngleHelper();
        } else {
            this.setInteractive();
            // this should automaticly not render the object whenewer it is outside viewport
            this.cullable = true;
        }

        this.lineStyle({ width: this.getBorderStyle(layer).thickness, color: this.getBorderStyle(layer).color, shader: this.getBorderStyle(layer).shader });
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
    }

    hoverShape(layer: Layer) {
        const start = this.shape.getStart();
        const end = this.shape.getEnd();
        this.clear();
        this.lineStyle(this.getBorderStyle(layer).thickness * 2, 0xaa55cc);
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
    }

    // TODO - adding to layer should be part of the ShapeClass, renderer shouldn't know anything about layer
    addToLayer(layer: Layer) {
        this.renderShape(layer);

        // do not add event listeners for shapes that are beeing drawed
        if (!(layer instanceof ForegroundLayer)) {
            this.on('pointerover', this.hoverShape.bind(this, layer))
                .on('pointerout', this.renderShape.bind(this, layer));
        }

        layer.addShape(this);
    }

    removeFromLayer() {
        this.clear();
        this.removeAllListeners();
    }

    // TODO: maybe this should be in its own class
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

        return {color: color, alpha: alpha, thickness: thickness, shader: shader};
    }
}
