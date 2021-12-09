
import { EventKeys } from "@/utils/EventTypes";

export interface IKeyboardShortcut {
    readonly keys: Array<EventKeys>;
    addKey(key: EventKeys): void;
    removeKey(key: EventKeys): boolean;
    isPressed(keyCombination: Array<EventKeys>): boolean;
}