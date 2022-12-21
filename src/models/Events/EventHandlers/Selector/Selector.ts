
import Point from "@/types/Point";
import { Rectangle as RectangleShape } from "../../../Shapes/Rectangle";
import Stage from "../../../Stage";
import { CustomEvenTypes } from "@/utils/EventTypes";
import { EventHandler, IEventHandler, IEventListener } from "@/types/EventHandler";
import { DrawRectangle as DrawCommand } from "@/models/Commands/DrawRectangle";
import { AppConfig } from "@/config/AppConfig";
import { RenderableShape } from "@/types/RenderableShape";


export class Selector extends EventHandler implements IEventHandler {
    hasStarted = false;
    originPoint: Point = new Point(0, 0);
    stage: Stage;
    shape: RectangleShape;
    childrenToCheck: Array<RenderableShape> = [];

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
        this.shape = this.newShape();
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
        this.shape = this.newShape();
        this.shape.setStart(start);
    }

    mouseMove(): void {
        const mouseRelativePosition = this.stage.mousePosition.relative;

        if (this.hasStarted) {
            this.stage.clearForeground();
            this.shape.setEnd(mouseRelativePosition);
            const drawCommand = new DrawCommand(this.shape, this.stage.foreground);
            drawCommand.execute();
            this.stage.renderStage();
            this.checkcolision();
        }
    }

    reset() {
        this.hasStarted = false;
        this.shape = this.newShape();
    }

    newShape(): RectangleShape {
        const shape: RectangleShape = new RectangleShape();
        shape.style.border.color = AppConfig.selector.color;
        shape.style.fill = { color: AppConfig.selector.color, alpha: AppConfig.selector.alpha };
        return shape;
    }

    checkcolision() {

        const children = this.stage.background.getChildrenRecursive();
        const childrenIntersected = [];
        for (let i = 0; i < children.length; i++) {
            if ((children[i] instanceof RenderableShape) && children[i].shape !== null) {

                if (this.shape.getHitArea().rectangle.intersects(children[i].shape.getHitArea().rectangle, children[i].shape.getHitArea().transform.localTransform)) {
                    childrenIntersected.push(children[i]);
                }
            }

        }

        console.log(childrenIntersected.length);
        //this.shape.getHitArea().rectangle.intersects();
    }

    detachHandler(): void {
        this.unregisterEventListeners(this.eventListeners);
    }

    attachHandler(): void {
        this.registerEventListeners(this.eventListeners);
    }
}
