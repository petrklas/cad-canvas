
import Point from "@/types/Point";
import { Line as LineShape } from "../../../Shapes/Line";
import Stage from "../../../Stage";
import { AxisHelper } from "../../../Snappers/Helpers"
import { IHelper } from "@/types/Helper";
import { SubEvent } from 'sub-events';
import { ILineShapeFormProperties } from "@/types/Shape";
import KeyboardShortcut from "@/models/Events/KeyboardShortuct";
import { CustomEvenTypes, EventKeys, GlobalEventTypes, MouseMoveRelativeEvent } from "@/utils/EventTypes";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { DrawLine as DrawLineCommand } from "@/models/Commands/DrawLine";
import IShapeModifier from "@/types/ShapeModifier";
import { LineAxisHelperModifier } from "./Modifiers/LineAxisHelperModifier";

export class LineCreator extends EventHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    stage: Stage;
    activeHelper: IHelper | null = null;
    shape: LineShape;
    allowSnappers = true;
    shapeModifiers: Array<IShapeModifier> = [];
    readonly onShapeChange: SubEvent<LineShape> = new SubEvent();
    events: IEvent[] = [
        {
            name: CustomEvenTypes.MOUSE_DOWN_LEFT,
            handler: (event: MouseMoveRelativeEvent) => {
                this.leftClickDown(event);
            }
        },
        {
            name: CustomEvenTypes.MOUSE_MOVE,
            handler: (event: MouseMoveRelativeEvent) => {
                this.mouseMove(event);
            }
        },
        {
            name: new KeyboardShortcut([EventKeys.ESC]).setDirection(GlobalEventTypes.KEY_UP).toString(),
            handler: () => {
                this.keyEsc();
            }
        }, {
            name: new KeyboardShortcut([EventKeys.SHIFT]).setDirection(GlobalEventTypes.KEY_DOWN).toString(),
            handler: () => {
                this.shapeModifiers[0] = new LineAxisHelperModifier(this.stage);
            }
        },
        {
            name: new KeyboardShortcut([EventKeys.SHIFT]).setDirection(GlobalEventTypes.KEY_UP).toString(),
            handler: () => {
                this.shapeModifiers = [];
            }
        },
    ];

    constructor(stage: Stage) {
        super();
        this.stage = stage;
        this.shape = new LineShape(this.stage.foreground);
    }


    leftClickDown(event: MouseMoveRelativeEvent): void {
        const mouseRelativePosition = event.relativeOffset;

        if (!this.hasStarted) {
            this.startNewShape(mouseRelativePosition);
            this.hasStarted = true;
        } else {
            const endPoint = mouseRelativePosition;
            this.shape.setEnd(endPoint);
            this.applyModifiers();
            this.shape.layer = this.stage.background.getActiveLayer();

            const drawCommand = new DrawLineCommand(this.shape);
            this.stage.getStageHistory().addCommand(drawCommand);
            this.stage.renderStage();

            // continue new shape immediately
            const end = this.shape.getEnd();
            this.startNewShape(end);
        }
    }

    private startNewShape(start: Point) {
        this.shape = new LineShape(this.stage.foreground);
        this.shape.setStart(start);
    }

    mouseMove(event: MouseMoveRelativeEvent): void {
        const mouseRelativePosition = event.relativeOffset;

        if (this.hasStarted) {
            this.stage.clearForeground();
            this.shape.setEnd(mouseRelativePosition);
            this.applyModifiers();
            const drawCommand = new DrawLineCommand(this.shape);
            drawCommand.execute();
            this.stage.renderStage();
            this.onShapeChange.emit(this.shape);
        }
    }

    formSubmit(data: ILineShapeFormProperties) {
        if (!this.hasStarted) {
            return;
        } else {
            this.stage.clearForeground();

            if (data.length) {
                this.shape.setLength(data.length);
            }

            if (data.rotation) {
                this.shape.setAngle(data.rotation)
            }

            this.shape.layer = this.stage.background.getActiveLayer();
            const drawCommand = new DrawLineCommand(this.shape);
            this.stage.getStageHistory().addCommand(drawCommand);
            // continue new shape immediately
            const end = this.shape.getEnd();
            this.startNewShape(end);
        }
    }

    applyModifiers() {
        this.shapeModifiers.forEach(modifier => {
            modifier.modify(this.shape);
        });
    }

    keyEsc() {
        this.reset();
        this.stage.clearForeground();
        this.stage.renderStage();
    }

    reset() {
        this.hasStarted = false;
        this.shape = new LineShape(this.stage.foreground);
    }
}
