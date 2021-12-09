import { IEventsHandler } from "@/types/EventsHandler";
import { EventTypes, EventButtons, EventKeys, CustomEvents } from "@/utils/EventTypes";
import { InteractionManager } from "@pixi/interaction";
import Engine from "../Engine";
import * as EventHandlers from "./EventHandlers"
import { Point as PIXIPoint } from "@pixi/math";
import Point from "@/types/Point";
import { RenderableShape } from "@/types/RenderableShape";
import Mouse from "../Mouse";
import KeyboardShortcut from "../KeyboardShortucts";

export default class CanvasEventHandler {
    engine: Engine;
    mouse: Mouse;
    eventHandler: IEventsHandler | any;
    private keyboardShortCut: KeyboardShortcut;
    private interactionManager: InteractionManager;
    private previousHandler: IEventsHandler | null = null;

    constructor(engine: Engine) {
        this.engine = engine;
        this.keyboardShortCut = new KeyboardShortcut();
        this.mouse = new Mouse(new Point(0, 0));
        this.setEventHandler(engine.getActiveMenuItem().getHandler(engine.stage));
        this.interactionManager = this.engine.renderer.plugins.interaction
    }

    setEventHandler(eventHandler: IEventsHandler) {
        this.eventHandler = eventHandler;

        if(this.eventHandler.modifier !== "undefined") {
            this.eventHandler.modifier = this.keyboardShortCut;
        }
    }

    getEventHandler(): IEventsHandler {
        return this.eventHandler;
    }

    handle(event: Event): void {
        // global event
        if (event instanceof WheelEvent) {
            const zoomHandler = new EventHandlers.Zoom(this.engine.stage);
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
                            this.eventHandler = new EventHandlers.Pan(this.engine.stage);
                            this.call('middleClickDown', this.mouse);
                            break;
                        case EventTypes.MOUSE_UP:
                            this.call('middleClickUp', this.mouse);
                            this.eventHandler = this.previousHandler;
                            this.previousHandler = null;
                            break;
                    }
                    break;

            }

        } else if (event instanceof KeyboardEvent) {
            switch (event.type) {
                case EventTypes.KEY_DOWN:
                    switch (event.key) {
                        case EventKeys.ESC:
                            this.keyboardShortCut.addKey(EventKeys.ESC);
                            break;
                        case EventKeys.CTRL:
                            this.keyboardShortCut.addKey(EventKeys.CTRL);
                            break;
                        case EventKeys.SHIFT:
                            this.keyboardShortCut.addKey(EventKeys.SHIFT);
                            break;
                        case EventKeys.ALT:
                            this.keyboardShortCut.addKey(EventKeys.ALT);
                            break;
                    }
                    break;
                case EventTypes.KEY_UP:
                    switch (event.key) {
                        case EventKeys.ESC:
                            this.keyboardShortCut.removeKey(EventKeys.ESC);
                            this.call('keyEsc', event);
                            break;
                        case EventKeys.CTRL:
                            this.keyboardShortCut.removeKey(EventKeys.CTRL);
                            break;
                        case EventKeys.SHIFT:
                            this.keyboardShortCut.removeKey(EventKeys.SHIFT);
                            break;
                        case EventKeys.ALT:
                            this.keyboardShortCut.removeKey(EventKeys.ALT);
                            break;
                    }
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
        if (!this.eventHandler.allowSnappers) {
            return;
        }

        const mousePoint = this.mouse.getAbsolutePosition();
        const renderableObject = this.interactionManager.hitTest(new PIXIPoint(mousePoint.x, mousePoint.y), this.engine.stage.background);
        if (renderableObject && renderableObject instanceof RenderableShape && renderableObject.shape) {
            const snappers = renderableObject.shape.getSnappers();
            for (let i = 0; i < snappers.length; i++) {
                if (snappers[i].isSnapPointHovered(this.engine.stage.background.toLocal(this.mouse.getAbsolutePosition()))) {
                    this.eventHandler.setActiveSnapper(snappers[i]);
                    return;
                }
            }
        }

        this.eventHandler.setActiveSnapper(null);
    }
}