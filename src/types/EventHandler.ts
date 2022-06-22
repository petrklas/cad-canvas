import EventBus from "@/models/Events/EventBus";
import { Registry } from "./EventBus";

export interface IEvent {
    name: string;
    handler: (...args: any[]) => void;
}

export interface IEventHandler {
    events: Array<IEvent>;
    registry: Array<Registry>;
    registerEvents(eventBus: EventBus): void;
    unregisterAllEvents(): void;
}


export abstract class EventHandler implements IEventHandler{
    registry: Array<Registry> = [];
    events: Array<IEvent> = [];
    eventBus: EventBus;

    constructor() {
        this.eventBus = EventBus.getInstance();
    }

    registerEvents(): void {
        for (const event of this.events) {
            const register = this.eventBus.register(event.name, event.handler);
            this.registry.push(register);
        } 
    }

    unregisterAllEvents(): void {
        for (const register of this.registry) {
            register.unregister();
        }

        this.registry = [];
    }
}