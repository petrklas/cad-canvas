import EventBus from "@/models/Events/EventBus";
import { Registry } from "./EventBus";

export interface IEventListener {
    name: string;
    handler: (...args: any[]) => void;
    unregisterHandler?: Registry;
}

export interface IGlobalEventHandler {
    attachHandler(): void;
}

export interface IEventHandler extends IGlobalEventHandler{
    detachHandler(): void;
}


export abstract class EventHandler {
    //registeredEventListeners: Array<IEventListener> = [];
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
        /*const index = this.registeredEventListeners.indexOf(eventListener);
        if (index == -1) {
            this.registeredEventListeners.push(eventListener);
        } */
        
    }


    unregisterEventListener(eventListener: IEventListener): void {
        if (eventListener.unregisterHandler) {
            eventListener.unregisterHandler.unregister();
            eventListener.unregisterHandler = undefined;
        }

       /* const index = this.registeredEventListeners.indexOf(eventListener);
        if (index > -1) {
            this.registeredEventListeners.splice(index, 1);
            return true;
        } else {
            return false;
        }*/
    }

    unregisterEventListeners(eventListeners: IEventListener[]): void {
        for (const eventListener of eventListeners) {
            this.unregisterEventListener(eventListener);
        }
    }

}