import EventBus from "@/models/Events/EventBus";
import { Registry } from "./EventBus";

export interface IEventListener {
    name: string;
    handler: (...args: any[]) => void;
    unregisterHandler?: Registry;
}

export interface IEventHandler {
    eventListeners: Array<IEventListener>;
    unregisterAllEventListeners(): void;
    registerAllEventListeners(): void;
}


export abstract class EventHandler implements IEventHandler {
    eventListeners: Array<IEventListener> = [];
    eventBus: EventBus;

    constructor() {
        this.eventBus = EventBus.getInstance();
    }

    registerEventListeners(eventListeners: IEventListener[]): void {
        for (const eventListener of eventListeners) {
            this.registerEventListener(eventListener);
        }
    }

    registerEventListener(eventListener: IEventListener) {
        const register = this.eventBus.register(eventListener.name, eventListener.handler);
        eventListener.unregisterHandler = register;
        const index = this.eventListeners.indexOf(eventListener);
        if (index == -1) {
            this.eventListeners.push(eventListener);
        } 
        
    }

    registerAllEventListeners(): void {
        this.registerEventListeners(this.eventListeners);
    }

    unregisterEventListener(eventListener: IEventListener): boolean {
        if (eventListener.unregisterHandler) {
            eventListener.unregisterHandler.unregister();
        }

        const index = this.eventListeners.indexOf(eventListener);
        if (index > -1) {
            this.eventListeners.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    unregisterEventListeners(eventListeners: IEventListener[]): void {
        for (const eventListener of eventListeners) {
            this.unregisterEventListener(eventListener);
        }
    }

    unregisterAllEventListeners(): void {
        this.unregisterEventListeners(this.eventListeners);
    }


}