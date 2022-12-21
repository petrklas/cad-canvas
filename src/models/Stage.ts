import Layer from "./Layer";
import Renderer from "./Renderer";
import { RenderableShape } from "@/types/RenderableShape";
import ForegroundLayer from "./ForegroundLayer";
import MousePosition from "./Mouse";
import Point from "@/types/Point";
import Container from "./Container";
import { AppConfig } from "@/config/AppConfig";
import { LINE_SCALE_MODE, settings } from '@pixi/graphics-smooth';
import EventBus from "./Events/EventBus";
import ICommand from "@/types/Command";
import { CustomEvenTypes } from "@/utils/EventTypes";

let stageRendered = 0;
export default class Stage extends Container {
    foreground: ForegroundLayer = new ForegroundLayer({});
    background: Container = new Container();
    snapLayer: Layer = new Layer({});
    renderer: Renderer;
    mousePosition: MousePosition = new MousePosition();
    
    stageHistory: StageHistory = new StageHistory();

    constructor() {
        super();
        this.renderer = this.initRenderer();
        this.background.addLayer(new Layer({ name: "Test", color: AppConfig.layer.defaultColor }), true);
        this.foreground.setCurrentLayer(this.background.getActiveLayer());
        this.addChild(this.background);
        this.addLayer(this.foreground, true);
        this.addLayer(this.snapLayer);
        const graphics = new RenderableShape();
        graphics.lineStyle(3, 0x00BBCC);
        graphics.drawRect(0, 0, 10, 10);
        this.addChild(graphics);
        this.renderStage();
    }

    getBackground(): Container {
        return this.background;
    }

    getStageHistory(): StageHistory {
        return this.stageHistory;
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
    setMousePosition(absolutePosition: Point): void {
        this.mousePosition.absolute = absolutePosition;
        this.mousePosition.relative = this.background.getActiveLayer().toLocal(absolutePosition);
    }

    addToForeground(displayObject: RenderableShape): void {
        this.foreground.addShape(displayObject);
    }

    addToSnappers(displayObject: RenderableShape): void {
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

    undo(): void {
        this.stageHistory.undo();
        this.renderStage();
    }

    redo(): void {
        this.stageHistory.redo();
        this.renderStage();
    }

    renderStage() {
        stageRendered++;
        console.log("Stage renderered", stageRendered, "times");
        this.renderer.render(this);
    }
}

class StageHistory {
    commands: ICommand[] = [];
    currentCommandIndex = -1;
    MAX_HISTORY_LENGTH = 5;

    addCommand(command: ICommand): void {
        this.commands.push(command);
        command.execute();
        this.currentCommandIndex++;
        this.reduceHistory();
        const eventBus = EventBus.getInstance();
        eventBus.dispatch<ICommand>(CustomEvenTypes.CANVAS_COMMAND_PERFORMED, command);
    }

    undo(): void {
        if (this.isUndoPossible()) {
            this.commands[this.currentCommandIndex].undo();
            this.currentCommandIndex--;
            const eventBus = EventBus.getInstance();
            eventBus.dispatch<ICommand>(CustomEvenTypes.CANVAS_COMMAND_PERFORMED, this.commands[this.currentCommandIndex]);
        }
    }

    redo(): void {
        if (this.isRedoPossible()) {
            const index = this.currentCommandIndex + 1;
            this.commands[index].execute();
            this.currentCommandIndex++;
            const eventBus = EventBus.getInstance();
            eventBus.dispatch<ICommand>(CustomEvenTypes.CANVAS_COMMAND_PERFORMED, this.commands[index]);
        }
    }

    isRedoPossible(): boolean {
        const index = this.currentCommandIndex + 1;
        return (index in this.commands);
    }

    isUndoPossible(): boolean {
        return (this.currentCommandIndex > -1);
    }

    // if maximum number of items exceed the limit, reduce the latest elements in history
    reduceHistory(): void {
        if (this.commands.length > this.MAX_HISTORY_LENGTH) {
            this.commands.splice(0, 1);
            this.currentCommandIndex--;
        }
    }
}