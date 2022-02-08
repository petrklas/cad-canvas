import RenderableObject from "@/types/RenderableObject";
import Layer from "./Layer";
import Renderer from "./Renderer";
import { RenderableShape } from "@/types/RenderableShape";
import ForegroundLayer from "./ForegroundLayer";
import MousePosition from "./Mouse";
import { SubEvent } from "sub-events";
import Point from "@/types/Point";
import Container from "./Container";
import { AppConfig } from "@/config/AppConfig";
import { LINE_SCALE_MODE, settings } from '@pixi/graphics-smooth';
import EventBus from "./Events/EventBus";


export default class Stage extends Container {
    foreground: ForegroundLayer = new ForegroundLayer();
    background: Container = new Container();
    snapLayer: Layer = new Layer();
    renderer: Renderer;
    mousePosition: MousePosition = new MousePosition();
    readonly onMouseMove: SubEvent<MousePosition> = new SubEvent();
    eventBus: EventBus;

    constructor() {
        super();
        this.eventBus = new EventBus();
        this.renderer = this.initRenderer();
        this.background.addLayer(new Layer({name: "Test", borderWidth: AppConfig.layer.defaultWidth, color: AppConfig.layer.defaultColor}), true);
        this.foreground.setCurrentLayer(this.background.getActiveLayer());
        this.addChild(this.background);
        this.addLayer(this.foreground, true);
        this.addLayer(this.snapLayer);
        const graphics = new RenderableShape();
        graphics.lineStyle(3, 0x00BBCC);
        graphics.drawRect(0, 0, 10, 10);
        this.addChild(graphics);
    }

    getEventBus(): EventBus {
        return this.eventBus;
    }

    initRenderer(): Renderer {
        settings.LINE_SCALE_MODE = LINE_SCALE_MODE.NONE; 
        
        return new Renderer({
            width: 100,
            height: 100,
            resolution: window.devicePixelRatio,
            autoDensity: true,
            antialias: true,
        });
    }

    // get the coordinates of mouse on canvas and convert them to local coordinates
    setMousePosition(absolutePosition: Point) {
        this.mousePosition.absolute = absolutePosition;
        this.mousePosition.relative = this.background.getActiveLayer().toLocal(absolutePosition);
        this.onMouseMove.emit(this.mousePosition);
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
    
    setScale(scale: number): void {
        super.setScale(scale);
        this.background.setScale(scale);    
    }

    clearSnappers() {
        this.snapLayer.removeChildren();
    }

    resize(width: number, height: number) {
        this.renderer.resize(width, height);
        this.x = Math.round(width / 2);
        this.y = Math.round(height / 2);
        this.renderStage();
    }
       
    getRenderer(): Renderer {
        return this.renderer;
    }

    renderStage() {
        const graphics2 = new RenderableShape();
        graphics2.lineStyle(3, 0xAA00CC);
        graphics2.drawRect(-20, -20, 10, 10);
        this.foreground.addChild(graphics2);
        this.renderer.render(this);
    }
}