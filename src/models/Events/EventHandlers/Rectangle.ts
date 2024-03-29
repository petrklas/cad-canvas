
import Stage from "../../Stage";
import Mouse from "../../Mouse";
import { IKeyboardShortcut } from "@/types/KeyboardShortcuts";
import KeyboardShortcut from "@/models/Events/KeyboardShortuct";
import { EventHandler, IEventHandler } from "@/types/EventHandler";


export class Rectangle extends EventHandler implements IEventHandler {
    stage: Stage;
    allowSnappers = true;
    modifier: IKeyboardShortcut = new KeyboardShortcut();

    constructor(stage: Stage) {
        super();
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

    attachHandler(): void {
       // this.unregisterEventListeners(this.eventListeners);
    }

    detachHandler(): void {
       //this.registerEventListeners(this.eventListeners);
    }

}
