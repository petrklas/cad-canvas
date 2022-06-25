
import Point from "@/types/Point";
import { Rectangle as RectangleShape } from "../../../Shapes/Rectangle";
import Stage from "../../../Stage";
import { IHelper } from "@/types/Helper";
import { SubEvent } from 'sub-events';
import { ILineShapeFormProperties } from "@/types/Shape";
import KeyboardShortcut from "@/models/Events/KeyboardShortuct";
import { CustomEvenTypes, EventKeys, GlobalEventTypes } from "@/utils/EventTypes";
import { EventHandler, IEventListener } from "@/types/EventHandler";
import { DrawRectangle as DrawCommand } from "@/models/Commands/DrawRectangle";
import IShapeModifier from "@/types/ShapeModifier";

export class Selector extends EventHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    stage: Stage;
    shape: RectangleShape;

    eventListeners: IEventListener[] = [
        {
            name: CustomEvenTypes.MOUSE_DOWN_LEFT,
            handler: () => {
                this.leftClickDown();
            }
        }
    ];

    eventListenersTrigerred: IEventListener[] = [
        {
            name: CustomEvenTypes.MOUSE_MOVE,
            handler: () => {
                this.mouseMove();
            }
        },
        {
            name: CustomEvenTypes.MOUSE_UP_LEFT,
            handler: () => {
                this.leftClickUp();
            }
        }
    ];

    constructor(stage: Stage) {
        super();
        this.stage = stage;
        this.shape = new RectangleShape(this.stage.foreground);
    }

    leftClickUp(): void {
        this.reset();
        this.stage.clearForeground();
        this.unregisterEventListeners(this.eventListenersTrigerred);
    }

    leftClickDown(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;

        if (!this.hasStarted) {
            this.startNewShape(mouseRelativePosition);
            this.hasStarted = true;
            this.registerEventListeners(this.eventListenersTrigerred);
        } 
    }

    private startNewShape(start: Point) {
        this.shape = new RectangleShape(this.stage.foreground);
        this.shape.setStart(start);
    }

    mouseMove(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;

        if (this.hasStarted) {
            this.stage.clearForeground();
            this.shape.setEnd(mouseRelativePosition);
            const drawCommand = new DrawCommand(this.shape);
            drawCommand.execute();
            this.stage.renderStage();
        }
    }

    reset() {
        this.hasStarted = false;
        this.shape = new RectangleShape(this.stage.foreground);
    }
}
