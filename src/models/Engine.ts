import IMenuItem from "@/types/MenuItem";
import CanvasEventHandler from "./Handlers/CanvasEventHandler";
import Menu from "./Menu";
import Renderer from "./Renderer";
import Stage from "./Stage";
import { inject } from "vue-demi";

export default class Engine {
    renderer: Renderer;
    menu: Menu;
    handler: CanvasEventHandler;
    stage: Stage;

    constructor() {
        this.menu = new Menu();
        this.renderer = this.initRenderer();
        this.stage = new Stage(this.renderer);
        this.handler = new CanvasEventHandler(this);

    }

    getHandler(): CanvasEventHandler {
        return this.handler;
    }

    getRenderer(): Renderer {
        return this.renderer;
    }

    getStage(): Stage {
        return this.stage;
    }

    render() {
        this.stage.renderStage();
    }

    initRenderer(): Renderer {
        return new Renderer({
            width: 100,
            height: 100,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            antialias: true,
        });
    }
}

export function useEngine(): Engine {

    const engine = inject<Engine>("engine");

    if(engine === undefined) {
      throw new Error(__filename + ": Engine instance is required");
    }

    return engine;
}