
import { EventHandler, IEventListener, IGlobalEventHandler } from "@/types/EventHandler";
import { CustomEvenTypes } from "@/utils/EventTypes";
import Point from "@/types/Point";
import Stage from "../../../Stage";

export class Pan extends EventHandler implements IGlobalEventHandler {
    stage: Stage;
    hasStarted = false;
    lastPoint: Point = new Point(0, 0);
    eventListeners: IEventListener[] = [
        {
            name: CustomEvenTypes.MOUSE_DOWN_MIDDLE,
            handler: () => {
                this.middleClickDown();
            }
        },
        {
            name: CustomEvenTypes.MOUSE_UP_MIDDLE,
            handler: () => {
                this.middleClickUp();
            }
        }
    ];

    mouseMoveEventListener: IEventListener = {
        name: CustomEvenTypes.MOUSE_MOVE,
        handler: () => {
            this.mouseMove();
        }
    };

    constructor(stage: Stage) {
        super();
        this.stage = stage;
    }

    middleClickDown(): void {
        this.hasStarted = true;
        this.lastPoint = this.stage.mousePosition.absolute;
        this.registerEventListener(this.mouseMoveEventListener);

    }

    middleClickUp(): void {
        this.hasStarted = false;
        this.lastPoint = new Point(0, 0);
        this.unregisterEventListener(this.mouseMoveEventListener);

    }

    mouseMove(): void {
        if (this.hasStarted) {
            const xShift = this.stage.mousePosition.absolute.x - this.lastPoint.x;
            const yShift = this.stage.mousePosition.absolute.y - this.lastPoint.y;

            this.stage.x += xShift;
            this.stage.y += yShift;
            this.lastPoint = this.stage.mousePosition.absolute;
            this.stage.renderStage();
        }
    }


    attachHandler(): void {
        this.registerEventListeners(this.eventListeners);  
    }
}

