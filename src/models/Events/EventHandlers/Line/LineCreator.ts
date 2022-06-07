
import Point from "@/types/Point";
import { Line as LineShape } from "../../../Shapes/Line";
import Stage from "../../../Stage";
import { AxisHelper } from "../../../Snappers/Helpers"
import { IHelper } from "@/types/Helper";
import { SubEvent } from 'sub-events';
import { ILineShapeFormProperties } from "@/types/Shape";
import KeyboardShortcut from "@/models/KeyboardShortucts";
import { CustomEvenTypes, EventKeys } from "@/utils/EventTypes";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { DrawLine as DrawLineCommand } from "@/models/Commands/DrawLine";

export class LineCreator extends EventHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    stage: Stage;
    activeHelper: IHelper | null = null;
    shape: LineShape;
    allowSnappers = true;
    modifier: KeyboardShortcut = new KeyboardShortcut();
    readonly onShapeChange: SubEvent<LineShape> = new SubEvent();
    events: IEvent[] = [
        {
            name: CustomEvenTypes.MOUSE_DOWN_LEFT,
            handler: () => {
                this.leftClickDown();
            }
        },
        {
            name: CustomEvenTypes.MOUSE_POSITION_UPDATE,
            handler: () => {
                this.mouseMove();
            }
        },
        {
            name: CustomEvenTypes.KEY_ESC,
            handler: () => {
                this.keyEsc();
            }
        }
    ];

    constructor(stage: Stage) {
        super();
        this.stage = stage;
        this.shape = new LineShape(this.stage.foreground);
    }


    leftClickDown(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;

        if (!this.hasStarted) {
            this.startNewShape(this.getPointFromCursor(mouseRelativePosition));
            this.hasStarted = true;
        } else {
            const endPoint = this.getPointFromCursor(mouseRelativePosition);
            this.shape.setEnd(endPoint);
            this.shape.layer = this.stage.background.getActiveLayer();
            
            const drawCommand = new DrawLineCommand(this.shape);
            this.stage.getStageHistory().addCommand(drawCommand);

            // continue new shape immediately
            const end = this.shape.getEnd();
            this.startNewShape(end);
        }
    }

    private startNewShape(start: Point) {
        this.shape = new LineShape(this.stage.foreground);
        this.shape.setStart(start);
    }

    mouseMove(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;

        if (this.hasStarted) {
            this.stage.clearForeground();
            this.shape.setEnd(this.getPointFromCursor(mouseRelativePosition));

            if (this.modifier.isPressed([EventKeys.SHIFT])) {
                const axisHelper = AxisHelper.getAxisHelper(this.shape.getStart(), mouseRelativePosition);
                const axisHelperRenderer = axisHelper.getRenderObject();
                axisHelperRenderer.addToLayer(this.stage.foreground);
                this.activeHelper = axisHelper;

            } else {
                this.activeHelper = null;
            }

            const drawCommand = new DrawLineCommand(this.shape);
            drawCommand.execute();
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


    /**
     * Get the current point - consider snappers and helpers
     * 
     * @param mouseCursor 
     * @returns 
     */
    private getPointFromCursor(mouseCursor: Point): Point {
        let endPoint = new Point(0, 0);

        // we need to snap to helper (change the coordinates of lineTo)
        if (this.activeHelper) {
            endPoint = this.activeHelper!.getSnapPoint(mouseCursor);
        }
        // draw normal line no snapping  needed
        else {
            endPoint = mouseCursor;
        }

        return endPoint;
    }


    keyEsc() {
        this.reset();
        this.stage.clearForeground();
    }

    reset() {
        this.hasStarted = false;
        this.shape = new LineShape(this.stage.foreground);
    }
}
