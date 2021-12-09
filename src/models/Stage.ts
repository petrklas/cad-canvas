import RenderableObject from "@/types/RenderableObject";
import Layer from "./Layer";
import Renderer from "./Renderer";
import { Container, DisplayObject } from "@pixi/display";
import { AppConfig } from "@/config/AppConfig";
import { RenderableShape } from "@/types/RenderableShape";
import { Graphics } from "@pixi/graphics";

export default class Stage extends Container{
    foreground: Layer = new Layer("_F", AppConfig.layer.defaultWidth, AppConfig.layer.defaultColor);
    background: Layer = new Layer("_B", AppConfig.layer.defaultWidth, AppConfig.layer.defaultColor);
    layers: Layer[] = [new Layer("Test", AppConfig.layer.defaultWidth, AppConfig.layer.defaultColor)];
    snapLayer: Layer = new Layer("_S", AppConfig.layer.defaultWidth, AppConfig.layer.defaultColor);
    renderer: Renderer;
    virtualScale = 1;

    constructor(renderer: Renderer) {
        super();
        this.renderer = renderer;
        this.background.addChild(this.layers[0]);
        this.addChild(this.background);
        this.addChild(this.foreground);
        this.addChild(this.snapLayer);
        this.x = this.renderer.width / 2;
        this.y = this.renderer.height / 2;
        const graphics = new RenderableShape();
        graphics.lineStyle(3, 0x00BBCC);
        graphics.drawRect(0, 0, 10, 10);
        this.addChild(graphics);
        
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

    addToForeground(displayObject: RenderableObject): void {
        this.foreground.addShape(displayObject);
    }

    addToSnappers(displayObject: RenderableObject): void {
        this.snapLayer.addShape(displayObject);
    }

    clearForeground() {
        this.foreground.removeChildren();
    }

    clearSnappers() {
        this.snapLayer.removeChildren();
    }

    setScale(scale: number) {
        this.background.scale.set(scale);
        this.snapLayer.scale.set(scale);
        this.foreground.scale.set(scale);
        this.virtualScale = scale;
    }

    renderStage() {
        const graphics2 = new RenderableShape();
        graphics2.lineStyle(3, 0xAA00CC);
        graphics2.drawRect(-20, -20, 10, 10);
        this.foreground.addChild(graphics2);
        for(let i = 0; i < this.layers[0].children.length; i++) {
            const child:DisplayObject = this.layers[0].children[i];
            
            if( child instanceof Graphics) {
                child.lineStyle({width: this.background.borderWith / this.background.scale.x});
            }
            
        }
        this.renderer.render(this);
    }
}