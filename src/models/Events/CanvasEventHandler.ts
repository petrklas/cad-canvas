import { GlobalEvenTypes, CustomEvenTypes, EventButtons, EventKeys } from "@/utils/EventTypes";
import * as GlobalEventHandlers from "./EventHandlers/Global"
import KeyboardShortcut from "../KeyboardShortucts";
import Stage from "../Stage";
import { IEventHandler } from "@/types/EventHandler";

export default class CanvasEventHandler {
    stage: Stage;
    eventHandler: IEventHandler | any;
    private keyboardShortCut: KeyboardShortcut;

    constructor(stage: Stage) {
        this.stage = stage;
        this.keyboardShortCut = new KeyboardShortcut();
        this.initGlobalEventHandlers();
    }

    initGlobalEventHandlers() {
       new GlobalEventHandlers.Zoom(this.stage).registerEvents(this.stage.getEventBus());
       new GlobalEventHandlers.Pan(this.stage).registerEvents(this.stage.getEventBus());
       new GlobalEventHandlers.MouseMove(this.stage).registerEvents(this.stage.getEventBus());
       new GlobalEventHandlers.Snapper(this.stage).registerEvents(this.stage.getEventBus());
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
                this.stage.getEventBus().dispatch<WheelEvent>(CustomEvenTypes.WHEEL_UP, event);
            } else {
                this.stage.getEventBus().dispatch<WheelEvent>(CustomEvenTypes.WHEEL_DOWN, event);
            }
        } else if (event instanceof MouseEvent) {
            switch (event.button) {
                case EventButtons.LEFT:
                    switch (event.type) {
                        case GlobalEvenTypes.MOUSE_DOWN:
                            this.stage.getEventBus().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_DOWN_LEFT, event);
                            break;
                        case GlobalEvenTypes.MOUSE_MOVE:
                            this.stage.getEventBus().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_MOVE, event);
                            break;
                    }
                    break;
                case EventButtons.MIDDLE:
                    switch (event.type) {
                        case GlobalEvenTypes.MOUSE_DOWN:
                            this.stage.getEventBus().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_DOWN_MIDDLE, event);
                            break;
                        case GlobalEvenTypes.MOUSE_UP:
                            this.stage.getEventBus().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_UP_MIDDLE, event);
                            break;
                    }
                    break;

            }

        } else if (event instanceof KeyboardEvent) {
            switch (event.type) {
                case GlobalEvenTypes.KEY_DOWN:
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
                case GlobalEvenTypes.KEY_UP:
                    switch (event.key) {
                        case EventKeys.ESC:
                            this.stage.getEventBus().dispatch<KeyboardEvent>(CustomEvenTypes.KEY_ESC, event);
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
}