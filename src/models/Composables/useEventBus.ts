import { Registry } from "@/types/EventBus";
import EventBus from "../Events/EventBus";

export function useEventBus() {
    const eventBus = EventBus.getInstance();
    function register(event: string, callback: (...args: any[]) => void): Registry {
        return eventBus.register(event, callback);
    }

    return {
        register
    };
}