import IPath from "@/types/IPath";
import IPoint from "@/types/IPoint";
import { EventTypes } from '@/utils/EventTypes'

export default class LinePath extends Path2D implements IPath {
    pathBegan = false;
    previousPoint: IPoint = { x: 0, y: 0 };
    edges: Array<IPoint> = [];

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.stroke(this);
        context.closePath();
    }

    handleEvent(event: any) {
        switch (event.type) {
            case EventTypes.MOUSE_DOWN:
                this.handleMouseClick(event);
                break;
            case EventTypes.MOUSE_MOVE:
                //this.handleMouseClick(event);
                break;
            default:
                console.log("Not implemented");
        }
    }

    handleMouseClick(event: MouseEvent) {
        const mouseX = event.offsetX;
        const mouseY = event.offsetY;
        this.previousPoint = {x: mouseX, y: mouseY};
        this.edges.push({x: mouseX, y: mouseY});
        if (this.pathBegan) {
            this.lineTo(mouseX, mouseY);
        } else {
            this.moveTo(mouseX, mouseY);
            this.pathBegan = true;
        }
    }

}