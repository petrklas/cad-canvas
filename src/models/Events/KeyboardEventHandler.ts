import { GlobalEventTypes, EventKeys } from "@/utils/EventTypes";
import KeyboardShortcut from "./KeyboardShortuct";
import EventBus from "./EventBus";

export default class KeyboardEventHandler {
    private keyboardShortCut: KeyboardShortcut;
    private eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.keyboardShortCut = new KeyboardShortcut();
        this.eventBus = eventBus;
    }

    handle(event: KeyboardEvent): void {
        const key: EventKeys = event.key as EventKeys;
        const type: GlobalEventTypes = event.type as GlobalEventTypes;
        switch (type) {
            case GlobalEventTypes.KEY_DOWN:
                this.keyboardShortCut.addKey(key);
                this.keyboardShortCut.setDirection(GlobalEventTypes.KEY_DOWN);
                this.eventBus.dispatch<KeyboardEvent>(this.keyboardShortCut, event);
                break;
            case GlobalEventTypes.KEY_UP:
                this.keyboardShortCut.setDirection(GlobalEventTypes.KEY_UP);
                this.eventBus.dispatch<KeyboardEvent>(this.keyboardShortCut, event);
                this.keyboardShortCut.removeKey(key);
                break;
        }
    }
}