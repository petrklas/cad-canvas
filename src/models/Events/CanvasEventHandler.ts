import { EventTypes, EventButtons, EventKeys } from "@/utils/EventTypes";
import { InteractionManager } from "@pixi/interaction";
import * as GlobalEventHandlers from "./EventHandlers/Global"
import { Point as PIXIPoint } from "@pixi/math";
import Point from "@/types/Point";
import { RenderableShape } from "@/types/RenderableShape";
import KeyboardShortcut from "../KeyboardShortucts";
import Stage from "../Stage";
import { IEventHandler } from "@/types/EventHandler";

export default class CanvasEventHandler {
    stage: Stage;
    eventHandler: IEventHandler | any;
    private keyboardShortCut: KeyboardShortcut;
    private interactionManager: InteractionManager;

    constructor(stage: Stage) {
        this.stage = stage;
        this.keyboardShortCut = new KeyboardShortcut();
        this.interactionManager = this.stage.getRenderer().plugins.interaction
        this.initGlobalEventHandlers();
    }

    initGlobalEventHandlers() {
       new GlobalEventHandlers.Zoom(this.stage).registerEvents(this.stage.getEventBus());
       new GlobalEventHandlers.Pan(this.stage).registerEvents(this.stage.getEventBus());
    }

    setEventHandler(eventHandler: IEventHandler) {
        if (this.eventHandler !== undefined) {
            this.eventHandler.unregisterAllEvents();
        }
        
        this.eventHandler = eventHandler;
        this.eventHandler.registerEvents(this.stage.getEventBus());

        if(this.eventHandler.modifier !== "undefined") {
            this.eventHandler.modifier = this.keyboardShortCut;
        }
    }

    getEventHandler(): IEventHandler {
        return this.eventHandler;
    }

    handle(event: Event): void {
        // global event
        if (event instanceof WheelEvent) {
            if (event.deltaY < 0) {
                this.stage.getEventBus().dispatch<WheelEvent>('wheelUp', event);
            } else {
                this.stage.getEventBus().dispatch<WheelEvent>('wheelDown', event);
            }
        } else if (event instanceof MouseEvent) {
            this.stage.setMousePosition(new Point(event.offsetX, event.offsetY));

            switch (event.button) {
                case EventButtons.LEFT:
                    switch (event.type) {
                        case EventTypes.MOUSE_DOWN:
                            this.stage.getEventBus().dispatch<MouseEvent>('leftClickDown', event);
                            break;
                        case EventTypes.MOUSE_MOVE:
                            this.getPossibleSnappers();
                            this.stage.getEventBus().dispatch<MouseEvent>('mouseMove', event);
                            break;
                    }
                    break;
                case EventButtons.MIDDLE:
                    switch (event.type) {
                        case EventTypes.MOUSE_DOWN:
                            this.stage.getEventBus().dispatch<MouseEvent>('middleClickDown', event);
                            break;
                        case EventTypes.MOUSE_UP:
                            this.stage.getEventBus().dispatch<MouseEvent>('middleClickUp', event);
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
                            this.stage.getEventBus().dispatch<KeyboardEvent>('keyEsc', event);
                            this.keyboardShortCut.removeKey(EventKeys.ESC);
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

        this.stage.renderStage();
    }

    // get the object under the cursor and find it's snappers
    getPossibleSnappers(): void {
        if (!this.eventHandler.allowSnappers) {
            return;
        }

        const mousePoint = this.stage.mousePosition.absolute;
        const renderableObject = this.interactionManager.hitTest(new PIXIPoint(mousePoint.x, mousePoint.y), this.stage.background);
        if (renderableObject && renderableObject instanceof RenderableShape && renderableObject.shape) {
            const snappers = renderableObject.shape.getSnappers();
            for (let i = 0; i < snappers.length; i++) {
                if (snappers[i].isSnapPointHovered(this.stage.mousePosition.relative)) {
                    this.eventHandler.setActiveSnapper(snappers[i]);
                    return;
                }
            }
        }

        this.eventHandler.setActiveSnapper(null);
    }
}