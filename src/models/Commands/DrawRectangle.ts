import ICommand from "@/types/Command";
import RectangleRenderer from "../Renderer/RectangleRenderer";
import { Rectangle } from "../Shapes/Rectangle";

export class DrawRectangle implements ICommand {
    rectangle: Rectangle;
    rectangleRenderer: RectangleRenderer

    constructor(rectangle: Rectangle) {
        this.rectangle = rectangle;
        this.rectangleRenderer = this.rectangle.getRenderObject();
    }

    execute(): void {
        this.rectangleRenderer.addToLayer();
    }

    undo(): void {
        this.rectangleRenderer.removeFromLayer();
    }
}