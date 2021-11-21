
import IEventsHandler from "@/types/EventsHandler";
import Point from "@/types/Point";
import Engine from "../Engine";
import Mouse from "../Mouse";

export class Pan implements IEventsHandler {
    engine: Engine;
    hasStarted = false;
    lastPoint: Point = new Point(0, 0);
    allowSnappers = false;

    constructor(engine: Engine) {
        this.engine = engine;
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

            this.engine.stage.x += xShift;
            this.engine.stage.y += yShift;
            this.engine.render();
            this.lastPoint.x = mouse.x;
            this.lastPoint.y = mouse.y;
        }
    }
}

