import { GlobalEventTypes, CustomEvenTypes, EventButtons, EventKeys, MouseMoveRelativeEvent } from "@/utils/EventTypes";
import * as GlobalEventHandlers from "./EventHandlers/Global"
import Point from "@/types/Point";
import Stage from "../Stage";
import { IEventHandler } from "@/types/EventHandler";
import EventBus from "./EventBus";

export default class CanvasEventHandler {
    stage: Stage;
    eventHandler: IEventHandler | any;

    constructor(stage: Stage) {
        this.stage = stage;
        this.initGlobalEventHandlers();
    }

    initGlobalEventHandlers(): void {
        new GlobalEventHandlers.Zoom(this.stage).attachHandler();
        new GlobalEventHandlers.Pan(this.stage).attachHandler();
        new GlobalEventHandlers.Snapper(this.stage).attachHandler();
    }

    setEventHandler(eventHandler: IEventHandler) {
        if (this.eventHandler !== undefined) {
            this.eventHandler.detachHandler();
        }

        this.eventHandler = eventHandler;
        this.eventHandler.attachHandler();
    }

    getEventHandler(): IEventHandler {
        return this.eventHandler;
    }

    handle(event: Event): void {
        const eventBus = EventBus.getInstance();
        // global event
        if (event instanceof WheelEvent) {
            if (event.deltaY < 0) {
                eventBus.dispatch<WheelEvent>(CustomEvenTypes.WHEEL_UP, event);
            } else {
                eventBus.dispatch<WheelEvent>(CustomEvenTypes.WHEEL_DOWN, event);
            }
        } else if (event instanceof MouseEvent) {

            // we need to transform HTML mouse position to the engine local position (adjusted by panning, zooming, etc)
            this.stage.setMousePosition(new Point(event.offsetX, event.offsetY));
            const relativeEvent = event as MouseMoveRelativeEvent;
            relativeEvent.relativeOffset = this.stage.mousePosition.getRelativePosition();

            switch (event.button) {
                case EventButtons.LEFT:
                    switch (event.type) {
                        case GlobalEventTypes.MOUSE_DOWN:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_DOWN_LEFT, relativeEvent);
                            break;
                        case GlobalEventTypes.MOUSE_MOVE:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_MOVE, relativeEvent);
                            break;
                        case GlobalEventTypes.MOUSE_UP:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_UP_LEFT, relativeEvent);
                            break;
                    }
                    break;
                case EventButtons.MIDDLE:
                    switch (event.type) {
                        case GlobalEventTypes.MOUSE_DOWN:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_DOWN_MIDDLE, relativeEvent);
                            break;
                        case GlobalEventTypes.MOUSE_UP:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_UP_MIDDLE, relativeEvent);
                            break;
                    }
                    break;

            }
        }
    }
}