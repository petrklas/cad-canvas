
import { IGlobalEventsHandler } from "@/types/EventsHandler";
import Point from "@/types/Point";
import Stage from "../../Stage";
import Mouse from "../../Mouse";

export class Pan implements IGlobalEventsHandler {
    stage: Stage;
    hasStarted = false;
    lastPoint: Point = new Point(0, 0);
    allowSnappers = false;

    constructor(stage: Stage) {
        this.stage = stage;
    }

    middleClickDown(mouse: Mouse): void {
        this.hasStarted = true;
        this.lastPoint = new Point(mouse.x, mouse.y);

    }

    middleClickUp(mouse: Mouse): void {
        this.hasStarted = false;
        this.lastPoint = new Point(0, 0);

    }

    mouseMove(mouse: Mouse): void {
        if (this.hasStarted) {
            const xShift = mouse.x - this.lastPoint.x;
            const yShift = mouse.y - this.lastPoint.y;

            this.stage.x += xShift;
            this.stage.y += yShift;
            this.stage.renderStage();
            this.lastPoint.x = mouse.x;
            this.lastPoint.y = mouse.y;
        }
    }
}

