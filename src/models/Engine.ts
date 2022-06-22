import CanvasEventHandler from "./Events/CanvasEventHandler";
import EventBus from "./Events/EventBus";
import KeyboardEventHandler from "./Events/KeyboardEventHandler";
import Stage from "./Stage";

export default class Engine {
    handler: CanvasEventHandler;
    stage: Stage;
    eventBus: EventBus;

    constructor() {
        this.stage = new Stage();
        this.handler = new CanvasEventHandler(this.stage);
        this.eventBus = EventBus.getInstance();
        this.init();
    }

    getHandler(): CanvasEventHandler {
        return this.handler;
    }

    getStage(): Stage {
        return this.stage;
    }


    /**
     * EventBus is a singleton, instance can be obtained everywhere using EventBus.getInstance() call
     * 
     * @returns EventBus
     */
    getEventBus(): EventBus {
        return this.eventBus;
    }

    init(): void {

        // listen to keyboard events in whole window
        const keyboardEventHandler = new KeyboardEventHandler(this.eventBus);
        "keyup keydown".split(" ").forEach(function(eventname: string){
            window.addEventListener(eventname, (event: Event) => {
                keyboardEventHandler.handle(event as KeyboardEvent);
            }, false);
        });
    }
}

