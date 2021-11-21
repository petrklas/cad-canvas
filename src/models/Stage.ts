import RenderableObject from "@/types/RenderableObject";
import Layer from "./Layer";
import Renderer from "./Renderer";
import { Graphics } from "@pixi/graphics";

export default class Stage extends Layer{
    foreground: Layer = new Layer();
    background: Layer = new Layer();
    layers: Layer[] = [new Layer()];
    snapLayer: Layer = new Layer();
    renderer: Renderer;
    virtualScale = 1;

    constructor(renderer: Renderer) {
        super();
        this.renderer = renderer;
        this.x = renderer.width / 2;
        this.y = renderer.height / 2;
        this.background.addChild(this.layers[0]);
        this.addChild(this.background);

    }

    getActiveLayer(): Layer {
        return this.layers[0];
    }

    addToLayer(displayObject: RenderableObject, layer: Layer): void {
        const index: number = this.layers.indexOf(layer)
        if (index != -1) {
            this.layers[index].addShape(displayObject);
        } else {
            throw new Error(__filename + ": Layer does not exist");
        }
    }

    addToCurrentLayer(displayObject: RenderableObject): void {
        this.getActiveLayer().addShape(displayObject);
    }

    clearForeground() {
        this.foreground.removeChildren();
    }

    addToForeground(displayObject: RenderableObject): void {
        this.foreground.addShape(displayObject);
    }

    addToSnappers(displayObject: RenderableObject): void {
        this.snapLayer.addShape(displayObject);
    }

    // we scale the background but keep the snap layer and foreground
    setScale(scale: number) {
        this.background.scale.set(scale);
    }

    renderStage() {
        const graphics = new Graphics();
        graphics.beginFill(0xAABBCC);
        // set the line style to have a width of 5 and set the color to red
        graphics.lineStyle(5, 0xAABBCC);
        // draw a rectangle
        graphics.drawRect(0, 0, 10, 10);
        this.addChild(graphics);
        this.addChild(this.foreground);
        this.addChild(this.snapLayer);
        this.renderer.render(this);
    }
}