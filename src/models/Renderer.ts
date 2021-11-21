import { Renderer as PIXIRenderer } from "@pixi/core";
import { Container as PIXIContainer, DisplayObject as PIXIDisplayObject } from "@pixi/display";
import Layer from "./Layer";

export default class Renderer extends PIXIRenderer {
    globalContainer: PIXIContainer = new PIXIContainer();
    scale = 1;

    setScale(scale: number) {
        //this.globalContainer.scale.x = scale;
        //this.globalContainer.scale.y = scale;
        this.scale = scale;

    }
}