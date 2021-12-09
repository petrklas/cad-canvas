import { IKeyboardShortcut } from "@/types/KeyboardShortcuts";
import { EventKeys } from "@/utils/EventTypes";

export default class KeyboardShortcut implements IKeyboardShortcut {
    readonly keys: Array<EventKeys> = [];

    addKey(key: EventKeys): void {
        const index = this.keys.indexOf(key);
        if (index == -1) {
            this.keys.push(key);
        }
    }

    removeKey(key: EventKeys): boolean {
        const index = this.keys.indexOf(key);
        if (index > -1) {
            this.keys.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    isPressed(keyCombination: Array<EventKeys>): boolean {
        return keyCombination.every(i => this.keys.includes(i));
    }
}