import ICommand from "@/types/Command";
import Layer from "../Layer";
import LineRenderer from "../Renderer/LineRenderer";
import { Line } from "../Shapes/Line";

export class DrawLine implements ICommand {
    line: Line;
    lineRenderer: LineRenderer;
    layer: Layer;

    constructor(line: Line, layer: Layer) {
        this.line = line;
        this.layer = layer;
        this.lineRenderer = this.line.getRenderObject();
    }

    execute(): void {
        this.lineRenderer.addToLayer(this.layer);
    }

    undo(): void {
        this.lineRenderer.removeFromLayer();
    }
}