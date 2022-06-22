import { IKeyboardShortcut } from "@/types/KeyboardShortcuts";
import { EventKeys, GlobalEventTypes } from "@/utils/EventTypes";

export default class KeyboardShortcut implements IKeyboardShortcut {
    readonly keys: Array<EventKeys> = [];
    direction: GlobalEventTypes = GlobalEventTypes.KEY_DOWN;

    constructor(keyCombination?: Array<EventKeys>) {
        if(keyCombination) {
            this.keys.push(...keyCombination);
        }
    }

    addKey(key: EventKeys): KeyboardShortcut {
        const index = this.keys.indexOf(key);
        if (index == -1) {
            this.keys.push(key);
        }

        return this;
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

    setDirection(direction: GlobalEventTypes): KeyboardShortcut {
        this.direction = direction;
        return this;
    }

    isPressed(keyCombination: Array<EventKeys>): boolean {
        return keyCombination.every(i => this.keys.includes(i));
    }

    toString(): string {
        return this.direction.concat(...this.keys);
    }
}