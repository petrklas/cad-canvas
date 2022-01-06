import Layer from "@/models/Layer";
import { Line } from "@/models/Shapes/Line";
import { RenderableShape } from "@/types/RenderableShape";
import { Text, TextStyle } from "@pixi/text";

export default class BackgroundRenderer  { 
    layer: Layer;
    renderableShape: RenderableShape = new RenderableShape();

    constructor(layer: Layer) {
        this.layer = layer;
    }

    render(shape: Line): RenderableShape {
        const start = shape.getStart();
        const end = shape.getEnd();
        this.renderableShape.clear();
        this.renderableShape.lineStyle(this.layer.getBorderWidth() / this.layer.getScale(), this.layer.getColor(), 1);
        this.renderableShape.moveTo(start.x, start.y);
        this.renderableShape.lineTo(end.x, end.y);

        this.renderableShape.on('pointerover', this.hoverShape.bind(shape))
                .on('pointerout', this.render.bind(shape));


        return this.renderableShape;
    }

    
    hoverShape(shape: Line) {
        const start = shape.getStart();
        const end = shape.getEnd();
        this.renderableShape.clear();
        this.renderableShape.lineStyle(this.layer.getBorderWidth() / this.layer.getScale() * 2, 0xaa55cc);
        this.renderableShape.moveTo(start.x, start.y);
        this.renderableShape.lineTo(end.x, end.y);
    }


}