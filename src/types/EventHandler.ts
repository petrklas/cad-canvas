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

    registerEvents(eventBus: EventBus): void {
        for (const event of this.events) {
            const register = eventBus.register(event.name, event.handler);
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