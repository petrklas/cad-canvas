
import { EventHandler, IEvent } from "@/types/EventHandler";
import { IGlobalEventsHandler } from "@/types/EventsHandler";
import Point from "@/types/Point";
import Stage from "../../../Stage";

export class Pan extends EventHandler {
    stage: Stage;
    hasStarted = false;
    lastPoint: Point = new Point(0, 0);
    allowSnappers = false;
    events: IEvent[] = [
    {
        name: 'middleClickDown',
        handler: () => {
            this.middleClickDown();
        }
    },
    {
        name: 'middleClickUp',
        handler: () => {
            this.middleClickUp();
        }
    },
    {
        name: 'mouseMove',
        handler: () => {
            this.mouseMove();
        }
    },
    ];

    constructor(stage: Stage) {
        super();
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

