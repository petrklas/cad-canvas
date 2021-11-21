import IEventsHandler from "@/types/EventsHandler";
import { EventTypes, EventButtons, EventKeys, CustomEvents } from "@/utils/EventTypes";
import { InteractionManager } from "@pixi/interaction";
import Engine from "../Engine";
import { Zoom } from "./Zoom"
import { Point as PIXIPoint } from "@pixi/math";
import Point from "@/types/Point";
import { RenderableShape } from "@/types/RenderableShape";
import Mouse from "../Mouse";
import { Pan } from "./Pan";

export default class Handler {
    engine: Engine;
    mouse: Mouse;
    eventHandler: IEventsHandler | any;
    private interactionManager: InteractionManager;
    private previousHandler: IEventsHandler | null = null;

    constructor(engine: Engine) {
        this.engine = engine;
        this.mouse = new Mouse(new Point(0, 0));
        this.eventHandler = engine.getActiveMenuItem().getHandler(engine);
        this.interactionManager = new InteractionManager(this.engine.getRenderer());
    }

    setEventHandler(eventHandler: IEventsHandler) {
        this.eventHandler = eventHandler;
    }

    getEventHandler(): IEventsHandler {
        return this.eventHandler;
    }

    handle(event: Event): void {
        // global event
        if (event instanceof WheelEvent) {
            const zoomHandler = new Zoom(this.engine);
            if (event.deltaY < 0) {
                zoomHandler.zoomIn(event);
            } else {
                zoomHandler.zoomOut(event);
            }
        } else if (event instanceof MouseEvent) {
            this.mouse.x = event.offsetX;
            this.mouse.y = event.offsetY;

            switch (event.button) {
                case EventButtons.LEFT:
                    switch (event.type) {
                        case EventTypes.MOUSE_DOWN:
                            this.call('leftClickDown', this.mouse);
                            break;
                        case EventTypes.MOUSE_MOVE:
                            this.getPossibleSnappers();
                            this.call('mouseMove', this.mouse);
                            break;
                    }
                    break;
                case EventButtons.MIDDLE:
                    switch (event.type) {
                        case EventTypes.MOUSE_DOWN:
                            // remember the current handler
                            this.previousHandler = this.eventHandler;
                            this.eventHandler = new Pan(this.engine);
                            this.call('middleClickDown', this.mouse);
                            break;
                        case EventTypes.MOUSE_UP:
                            this.eventHandler = this.previousHandler;
                            this.previousHandler = null;
                            this.call('middleClickUp', this.mouse);
                            break;
                    }
                    break;

            }

        } else if (event instanceof KeyboardEvent) {
            switch (event.key) {
                case EventKeys.ESC:
                    this.call('keyEsc', event);
                    break;
            }

        } else if (event instanceof CustomEvent) {
            switch (event.type) {
                case CustomEvents.LENGTH:
                    this.call('setLength', event.detail.length);
                    break;
            }

        }
    }

    call(functionName: string, event: any): void {
        if (typeof this.eventHandler[functionName] === 'function') {
            this.eventHandler[functionName](event);
        }
    }

    // get the object under the cursor and find it's snappers
    getPossibleSnappers(): void {
        if(!this.eventHandler.allowSnappers) {
            return;
        }

        const mousePoint = this.mouse.getAbsolutePosition();
        const renderableObject = this.interactionManager.hitTest(new PIXIPoint(mousePoint.x, mousePoint.y), this.engine.stage.background);
        if (renderableObject && renderableObject instanceof RenderableShape && renderableObject.shape) {
            const snappers = renderableObject.shape.getSnappers();
            for (let i = 0; i < snappers.length; i++) {
                if (snappers[i].isSnapPointHovered(this.engine.stage.toLocal(this.mouse.getAbsolutePosition()))) {
                    this.eventHandler.setActiveSnapper(snappers[i]);
                    return;
                }
            }
        }

        this.eventHandler.setActiveSnapper(null);
    }
}