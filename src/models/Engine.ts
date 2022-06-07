import CanvasEventHandler from "./Events/CanvasEventHandler";
import Stage from "./Stage";

export default class Engine {
    handler: CanvasEventHandler;
    stage: Stage;

    constructor() {
        this.stage = new Stage();
        this.handler = new CanvasEventHandler(this.stage);
    }

    getHandler(): CanvasEventHandler {
        return this.handler;
    }

    getStage(): Stage {
        return this.stage;
    }
}

