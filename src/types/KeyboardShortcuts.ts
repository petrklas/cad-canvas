
import { EventKeys, GlobalEventTypes } from "@/utils/EventTypes";

export interface IKeyboardShortcut {
    readonly keys: Array<EventKeys>;
    addKey(key: EventKeys): IKeyboardShortcut;
    removeKey(key: EventKeys): boolean;
    setDirection(direction: GlobalEventTypes): IKeyboardShortcut;
    isPressed(keyCombination: Array<EventKeys>): boolean;
}