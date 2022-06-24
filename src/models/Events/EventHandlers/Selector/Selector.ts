
import Point from "@/types/Point";
import { Rectangle as RectangleShape } from "../../../Shapes/Rectangle";
import Stage from "../../../Stage";
import { IHelper } from "@/types/Helper";
import { SubEvent } from 'sub-events';
import { ILineShapeFormProperties } from "@/types/Shape";
import KeyboardShortcut from "@/models/Events/KeyboardShortuct";
import { CustomEvenTypes, EventKeys, GlobalEventTypes } from "@/utils/EventTypes";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { DrawRectangle as DrawCommand } from "@/models/Commands/DrawRectangle";
import IShapeModifier from "@/types/ShapeModifier";

export class Selector extends EventHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    stage: Stage;
    shape: RectangleShape;

    events: IEvent[] = [
        {
            name: CustomEvenTypes.MOUSE_DOWN_LEFT,
            handler: () => {
                this.leftClickDown();
            }
        },
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
        },
        {
            name: new KeyboardShortcut([EventKeys.ESC]).setDirection(GlobalEventTypes.KEY_UP).toString(),
            handler: () => {
                this.keyEsc();
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
    }

    leftClickDown(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;

        if (!this.hasStarted) {
            this.startNewShape(mouseRelativePosition);
            this.hasStarted = true;
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

    keyEsc() {
        this.reset();
        this.stage.clearForeground();
    }

    reset() {
        this.hasStarted = false;
        this.shape = new RectangleShape(this.stage.foreground);
    }
}
