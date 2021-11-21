import IMenuItem from "@/types/MenuItem";
import Handler from "./Handlers/Handler";
import Menu from "./Menu";
import Renderer from "./Renderer";
import Stage from "./Stage";

export default class Engine {
    renderer: Renderer;
    menu: Menu;
    handler: Handler;
    stage: Stage;

    constructor(renderer: Renderer) {
        this.menu = new Menu();
        this.renderer = renderer;
        this.handler = new Handler(this);
        this.stage = new Stage(renderer);
    }

    getHandler(): Handler {
        return this.handler;
    }

    getActiveMenuItem(): IMenuItem {
        return this.menu.getActive();
    }

    setActiveMenuItem(item: IMenuItem) {
        this.menu.setActive(item);
        //this.handler.setEventHandler(item.getHandler(this));
    }

    getRenderer(): Renderer {
        return this.renderer;
    }

    render() {
        this.stage.renderStage();
    }
}