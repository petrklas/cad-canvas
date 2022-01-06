
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

    middleClickDown(): void {
        this.hasStarted = true;
        this.lastPoint = this.stage.mousePosition.absolute;

    }

    middleClickUp(): void {
        this.hasStarted = false;
        this.lastPoint = new Point(0, 0);

    }

    mouseMove(): void {
        if (this.hasStarted) {
            const xShift = this.stage.mousePosition.absolute.x - this.lastPoint.x;
            const yShift = this.stage.mousePosition.absolute.y - this.lastPoint.y;

            this.stage.x += xShift;
            this.stage.y += yShift;
            this.lastPoint = this.stage.mousePosition.absolute;
        }
    }
}

