
import { IShapeEventsHandler } from "@/types/EventsHandler";
import Point from "@/types/Point";
import { Line as LineShape } from "../../Shapes/Line";
import Stage from "../../Stage";
import { AxisHelper } from "../../Snappers/Helpers"
import { ISnapper } from "@/types/Snapper";
import { IHelper } from "@/types/Helper";
import { SubEvent } from 'sub-events';
import { ILineShapeFormProperties } from "@/types/Shape";
import KeyboardShortcut from "@/models/KeyboardShortucts";
import { EventKeys } from "@/utils/EventTypes";
import { EventHandler, IEvent } from "@/types/EventHandler";

export class Line extends EventHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    stage: Stage;
    activeSnapper: ISnapper | null = null;
    activeHelper: IHelper | null = null;
    shape: LineShape;
    allowSnappers = true;
    modifier: KeyboardShortcut = new KeyboardShortcut();
    readonly onShapeChange: SubEvent<LineShape> = new SubEvent();
    events: IEvent[] = [
        {
            name: 'leftClickDown',
            handler: () => {
                this.leftClickDown();
            }
        },
        {
            name: 'mouseMove',
            handler: () => {
                this.mouseMove();
            }
        },
        {
            name: 'keyEsc',
            handler: () => {
                this.keyEsc();
            }
        }
    ];

    constructor(stage: Stage) {
        super();
        this.stage = stage;
        this.shape = new LineShape();
    }


    setActiveSnapper(snapper: ISnapper) {
        this.activeSnapper = snapper;
    }

    leftClickDown(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;
        //const mouseRelativePosition = mouse.getAbsolutePosition();
        if (!this.hasStarted) {
            this.shape = new LineShape();
            this.shape.setStart(this.getPointFromCursor(mouseRelativePosition));
            this.hasStarted = true;
        } else {
            const endPoint = this.getPointFromCursor(mouseRelativePosition);
            this.shape.setEnd(endPoint);
            const lineRObject = this.shape.getRenderObject();
            lineRObject.addToLayer(this.stage.background.getActiveLayer())
            lineRObject.setInteractive();

            // continue new shape immediately
            const end = this.shape.getEnd();
            this.shape = new LineShape();
            this.shape.setStart(end);
        }
    }

    mouseMove(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;
        //const mouseRelativePosition = mouse.getAbsolutePosition();
        this.renderSnappers();

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


            const lineRObject = this.shape.getRenderObject();
            lineRObject.addToLayer(this.stage.foreground)
            lineRObject.showAngleHelper();
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

            if (data.angle) {
                this.shape.setAngle(data.angle)
            }

            const lineRObject = this.shape.getRenderObject();
            lineRObject.addToLayer(this.stage.background.getActiveLayer());
            lineRObject.setInteractive();
            // continue new shape immediately
            const end = this.shape.getEnd();
            this.shape = new LineShape();
            this.shape.setStart(end);
        }
    }

    private renderSnappers() {
        if (this.activeSnapper) {
            this.stage.clearSnappers();
            const snapperRenderer = this.activeSnapper.getRenderObject();
            snapperRenderer.addToLayer(this.stage.snapLayer);
        } else if (this.stage.snapLayer.children.length > 0) {
            this.stage.clearSnappers();

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
        // we need to snap to snapper
        if (this.activeSnapper) {
            endPoint = this.activeSnapper.getSnapPoint();
        }
        // we need to snap to helper (change the coordinates of lineTo)
        else if (this.activeHelper) {
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
        this.shape = new LineShape();
    }
}
