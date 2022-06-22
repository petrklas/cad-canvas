import { GlobalEventTypes, CustomEvenTypes, EventButtons, EventKeys } from "@/utils/EventTypes";
import * as GlobalEventHandlers from "./EventHandlers/Global"
import KeyboardShortcut from "./KeyboardShortuct";
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
       new GlobalEventHandlers.Zoom(this.stage).registerEvents();
       new GlobalEventHandlers.Pan(this.stage).registerEvents();
       new GlobalEventHandlers.MouseMove(this.stage).registerEvents();
       new GlobalEventHandlers.Snapper(this.stage).registerEvents();
    }

    setEventHandler(eventHandler: IEventHandler) {
        if (this.eventHandler !== undefined) {
            this.eventHandler.unregisterAllEvents();
        }
        
        this.eventHandler = eventHandler;
        this.eventHandler.registerEvents();
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
            switch (event.button) {
                case EventButtons.LEFT:
                    switch (event.type) {
                        case GlobalEventTypes.MOUSE_DOWN:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_DOWN_LEFT, event);
                            break;
                        case GlobalEventTypes.MOUSE_MOVE:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_MOVE, event);
                            break;
                    }
                    break;
                case EventButtons.MIDDLE:
                    switch (event.type) {
                        case GlobalEventTypes.MOUSE_DOWN:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_DOWN_MIDDLE, event);
                            break;
                        case GlobalEventTypes.MOUSE_UP:
                            eventBus.dispatch<MouseEvent>(CustomEvenTypes.MOUSE_UP_MIDDLE, event);
                            break;
                    }
                    break;

            }
        } 

        this.stage.renderStage();
    }
}