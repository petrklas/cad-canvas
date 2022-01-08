import IMenuItem from "@/types/MenuItem";
import CanvasEventHandler from "./Handlers/CanvasEventHandler";
import Menu from "./Menu";
import Renderer from "./Renderer";
import Stage from "./Stage";
import { inject } from "vue-demi";

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

export function useEngine(): Engine {

    const engine = inject<Engine>("engine");

    if(engine === undefined) {
      throw new Error(__filename + ": Engine instance is required");
    }

    return engine;
}