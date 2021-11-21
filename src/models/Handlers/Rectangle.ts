
import IEventsHandler from "@/types/EventsHandler";
import Engine from "../Engine";
import Mouse from "../Mouse";


export class Rectangle implements IEventsHandler {
    engine: Engine;
    allowSnappers = true;

    constructor(engine: Engine) {
        this.engine = engine;
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
