
import IEventsHandler from "@/types/EventsHandler";
import Point from "@/types/Point";
import { AppConfig } from '@/utils/AppConfig'
import Engine from "../Engine";

export class Zoom implements IEventsHandler {
    engine: Engine;
    allowSnappers = false;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    zoomIn(event: MouseEvent): void {
        this.zoom("in", event);

    }

    zoomOut(event: MouseEvent): void {
        this.zoom("out", event);
    }

    private zoom(direction: "in" | "out", event: MouseEvent): void {
        const renderer = this.engine.getRenderer();
        const mousePosition = new Point(event.offsetX, event.offsetY);
        const stage = this.engine.stage;
        let  scale = 1;
        if(direction == "in") {
            scale = Math.min(stage.scale.x + AppConfig.zoomStep, AppConfig.zoomMax);
        } else {
            scale = Math.max(stage.scale.x - AppConfig.zoomStep, AppConfig.zoomMin);
        }
        
        const worldPos = {x: (mousePosition.x - stage.x) / stage.scale.x, y: (mousePosition.y - stage.y)/stage.scale.y};
        
        const newScreenPos = {x: (worldPos.x ) * scale + stage.x, y: (worldPos.y) * scale + stage.y};
        
        stage.x -= (newScreenPos.x-mousePosition.x) ;
        stage.y -= (newScreenPos.y-mousePosition.y) ;

        stage.scale.set(scale);
        this.engine.render();
    }
}

