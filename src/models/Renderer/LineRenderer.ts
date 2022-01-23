import { Polygon } from "@pixi/math";
import { Line } from "../Shapes/Line";
import { RenderableShape } from "@/types/RenderableShape";
import { Text, TextStyle } from "@pixi/text";
import Layer from "../Layer";
import ForegroundLayer from "../ForegroundLayer";
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
        this.lineStyle({width: 1, color: 0xaaaaaa, alpha: 0.5});
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
        const basicText = new Text(this.shape.getAngle().toRad().toString(), style);
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
        this.lineStyle({width: layer.getBorderWidth(), color: layer.getColor()});
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
    }

    hoverShape(layer: Layer) {
        const start = this.shape.getStart();
        const end = this.shape.getEnd();
        this.clear();
        this.lineStyle(layer.getBorderWidth() * 2, 0xaa55cc);
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
    }

    addToLayer(layer: Layer | ForegroundLayer) {
        //console.log(this.shape.getStart());
        //console.log(this.shape.getStart());
        //const start = layer.toLocal(this.shape.getStart());
        //const end = layer.toLocal(this.shape.getEnd());
        this.renderShape(layer);

        // do not add event listeners for already drawing shape
        if (!(layer instanceof ForegroundLayer)) {
            this.on('pointerover', this.hoverShape.bind(this, layer))
                .on('pointerout', this.renderShape.bind(this, layer));
        }

        //this.pivot.set(start.x, start.y);  
        //this.position.set(start.x, start.y);
        layer.addShape(this);
    }
}
