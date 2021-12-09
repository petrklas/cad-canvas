import { Polygon } from "@pixi/math";
import { Line } from "../Shapes/Line";
import { RenderableShape } from "@/types/RenderableShape";
import Layer from "../Layer";

export default class LineRenderer extends RenderableShape {
    shape: Line;

    constructor(line: Line) {
        super();
        this.shape = line;
    }

    setInteractive() {
        if(this.shape.getHitArea()) {
            this.interactive = true;
            this.applyHitArea(this.shape.getHitArea());
        }
    }

    showAngleHelper() {
        // line is horizontal - no need to draw a helper
        if(this.shape.getStart().y == this.shape.getEnd().y) {
            return;
        }

        this.lineStyle(1, 0xaaaaaa, 0.5);
        this.moveTo(this.shape.getStart().x, this.shape.getStart().y);
        this.lineTo(this.shape.getStart().x + this.shape.getLength(), this.shape.getStart().y);

        if(this.shape.getStart().y < this.shape.getEnd().y) {
            this.arc(this.shape.getStart().x, this.shape.getStart().y, this.shape.getLength(), 0, this.shape.getAngle().toRad());
        } else {
            this.arc(this.shape.getStart().x, this.shape.getStart().y, this.shape.getLength(), 0, this.shape.getAngle().toRad(), true);
        }
        
    }

    applyHitArea(polygon: Polygon) {
        this.lineStyle(1, 0xff0000);
        this.drawShape(polygon);
        this.hitArea = polygon;
    }

    addToLayer(layer: Layer) {
        //console.log(this.shape.getStart());
        //console.log(this.shape.getStart());
        //const start = layer.toLocal(this.shape.getStart());
        //const end = layer.toLocal(this.shape.getEnd());
        
        const start = this.shape.getStart();
        const end = this.shape.getEnd();
        this.lineStyle(layer.borderWith / layer.scale.x, layer.color, 1);
        this.moveTo(start.x, start.y);
        this.lineTo(end.x, end.y);
        //this.pivot.set(start.x, start.y);  
        //this.position.set(start.x, start.y);
        layer.addShape(this);
    }
}
