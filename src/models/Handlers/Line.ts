
import IEventsHandler from "@/types/EventsHandler";
import Point, { IPoint } from "@/types/Point";
import { Line as LineShape } from "../Shapes/Line";
import Engine from "../Engine";
import { AxisHelper } from "../Snappers/Helpers"
import { ISnapper } from "@/types/Snapper";
import AxisHelperRenderer from "../Renderer/AxisHelperRenderer";
import { IHelper } from "@/types/Helper";
import { SubEvent } from 'sub-events';
import Mouse from "../Mouse";
import { ILineShapeFormProperties } from "@/types/Shape";

export class Line implements IEventsHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    engine: Engine;
    activeSnapper: ISnapper | null = null;
    activeHelper: IHelper | null = null;
    shape: LineShape;
    allowSnappers = true;
    readonly onShapeChange: SubEvent<LineShape> = new SubEvent();

    constructor(engine: Engine) {
        this.engine = engine;
        this.shape = new LineShape();
    }

    setActiveSnapper(snapper: ISnapper) {
        this.activeSnapper = snapper;
    }

    leftClickDown(mouse: Mouse): void {
        // if this is first click we do not draw any line
        if (!this.hasStarted) {
            this.shape = new LineShape();
            this.shape.setStart(this.engine.stage.toLocal(mouse.getAbsolutePosition()));
            this.hasStarted = true;
        } else {
            const endPoint = this.getEndpointFromCursor(this.engine.stage.toLocal(mouse.getAbsolutePosition()));
            this.shape.setEnd(endPoint);
            const lineRObject = this.shape.getRenderObject();
            lineRObject.setInteractive();

            this.engine.stage.addToCurrentLayer(lineRObject);
            this.engine.render();

            // continue new shape immediately
            const end = this.shape.getEnd();
            this.shape = new LineShape();
            this.shape.setStart(end);
        }
    }

    mouseMove(mouse: Mouse): void {
        if (!this.hasStarted) {
            return;
        } else {
            this.engine.stage.clearForeground();
            this.shape.setEnd(this.getEndpointFromCursor(this.engine.stage.toLocal(mouse.getAbsolutePosition())));
            const axisHelper = AxisHelper.getAxisHelper(this.shape.getStart(), this.engine.stage.toLocal(mouse.getAbsolutePosition()));

            if (axisHelper) {
                this.engine.stage.addToForeground(new AxisHelperRenderer(axisHelper));
                this.activeHelper = axisHelper;

            } else {
                this.activeHelper = null;
            }

            const lineRObject = this.shape.getRenderObject();
            lineRObject.showAngleHelper();
            this.engine.stage.addToForeground(lineRObject);
            this.engine.render();
            this.onShapeChange.emit(this.shape);
        }
    }

    formSubmit(data: ILineShapeFormProperties) {
        if (!this.hasStarted) {
            return;
        } else {
            this.engine.stage.clearForeground();

            if(data.length) {
                this.shape.setLength(data.length);
            }

            if(data.angle) {
                this.shape.setAngle(data.angle)
            }
            
            const lineRObject = this.shape.getRenderObject();
            lineRObject.setInteractive();
            this.engine.stage.addToCurrentLayer(lineRObject);
            this.engine.render();
            // continue new shape immediately
            const end = this.shape.getEnd();
            this.shape = new LineShape();
            this.shape.setStart(end);
        }
    }


    /**
     * Get the current point - consider snappers and helpers
     * 
     * @param mouseCursor 
     * @returns 
     */
    private getEndpointFromCursor(mouseCursor: Point): Point {
        let endPoint = new Point(0, 0);
        // we need to snap to snapper
        if (this.activeSnapper) {
            endPoint = this.activeSnapper.getSnapPoint();
            this.engine.stage.addToForeground(this.activeSnapper.getRenderObject());
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


    keyEsc(event: KeyboardEvent) {
        this.reset();
        this.engine.stage.clearForeground();
        this.engine.render();
    }

    reset() {
        this.hasStarted = false;
        this.shape = new LineShape();
    }
}
