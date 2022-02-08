
import {IShapeEventsHandler} from "@/types/EventsHandler";
import Stage from "../../Stage";
import Mouse from "../../Mouse";
import { IKeyboardShortcut } from "@/types/KeyboardShortcuts";
import KeyboardShortcut from "@/models/KeyboardShortucts";


export class Rectangle implements IShapeEventsHandler {
    stage: Stage;
    allowSnappers = true;
    modifier: IKeyboardShortcut = new KeyboardShortcut();

    constructor(stage: Stage) {
        this.stage = stage;
    }

    leftClick(mouse: Mouse): void {
        console.log("Not implemented - MouseClick");
    }

    mouseMove(mouse: Mouse): void {
        console.log("Not implemented - MouseMove");
    }

    keyEsc(event: KeyboardEvent) {
        console.log("Not implemented - Key ESC");
    }

}
