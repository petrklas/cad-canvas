import ICommand from "@/types/Command";
import LineRenderer from "../Renderer/LineRenderer";
import { Line } from "../Shapes/Line";

export class DrawLine implements ICommand {
    line: Line;
    lineRenderer: LineRenderer

    constructor(line: Line) {
        this.line = line;
        this.lineRenderer = this.line.getRenderObject();
    }

    execute() {
        this.lineRenderer.addToLayer();
    }

    undo() {
        this.lineRenderer.removeFromLayer();
    }
}