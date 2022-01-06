import ForegroundLayer from "@/models/ForegroundLayer";
import { Line } from "@/models/Shapes/Line";
import { RenderableShape } from "@/types/RenderableShape";
import { Text, TextStyle } from "@pixi/text";

export default class ForegroundRenderer  { 
    layer: ForegroundLayer;
    renderableShape: RenderableShape = new RenderableShape();

    constructor(layer: ForegroundLayer) {
        this.layer = layer;
    }

    render(shape: Line): RenderableShape {
        const start = shape.getStart();
        const end = shape.getEnd();
        this.renderableShape.clear();
        this.renderableShape.lineStyle(this.layer.getBorderWidth() / this.layer.getScale(), this.layer.getColor(), 1);
        this.renderableShape.moveTo(start.x, start.y);
        this.renderableShape.lineTo(end.x, end.y);

        if (shape.getHitArea()) {
            const polygon = shape.getHitArea();
            this.renderableShape.lineStyle(1, 0xff0000);
            this.renderableShape.drawShape(polygon);
            this.renderableShape.hitArea = polygon;
        }

        this.showAngleHelper(shape);

        return this.renderableShape;
    }

    showAngleHelper(shape: Line) {
        // line is horizontal - no need to draw a helper
        if (shape.getStart().y == shape.getEnd().y) {
            return;
        }

        this.renderableShape.lineStyle(1, 0xaaaaaa, 0.5);
        this.renderableShape.moveTo(shape.getStart().x, shape.getStart().y);
        this.renderableShape.lineTo(shape.getStart().x + shape.getLength(), shape.getStart().y);

        if (shape.getStart().y < shape.getEnd().y) {
            this.renderableShape.arc(shape.getStart().x, shape.getStart().y, shape.getLength(), 0, shape.getAngle().toRad());
        } else {
            this.renderableShape.arc(shape.getStart().x, shape.getStart().y, shape.getLength(), 0, shape.getAngle().toRad(), true);
        }

        const style = new TextStyle({
            fontSize: 14,
            fill: 0xffffff
        });
        const basicText = new Text(shape.getAngle().toRad().toString(), style);
        basicText.rotation = shape.getAngle().toRad();
        basicText.x = shape.getCenter().x + 10;
        basicText.y = shape.getCenter().y + 10;
        this.renderableShape.addChild(basicText);
    }

}