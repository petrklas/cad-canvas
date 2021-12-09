
import { IGlobalEventsHandler } from "@/types/EventsHandler";
import Point from "@/types/Point";
import Stage from "../../Stage";
import { AppConfig } from "@/config/AppConfig";

export class Zoom implements IGlobalEventsHandler {
    stage: Stage;
    allowSnappers = false;

    constructor(stage: Stage) {
        this.stage = stage;
    }

    zoomIn(event: MouseEvent): void {
        this.zoom("in", event);

    }

    zoomOut(event: MouseEvent): void {
        this.zoom("out", event);
    }

    private zoom(direction: "in" | "out", event: MouseEvent): void {
        const mousePosition = new Point(event.offsetX, event.offsetY);
        const stage = this.stage;
        let  scale = 1;
        if(direction == "in") {
            scale = Math.min(stage.virtualScale + AppConfig.zoomStep, AppConfig.zoomMax);
        } else {
            scale = Math.max(stage.virtualScale - AppConfig.zoomStep, AppConfig.zoomMin);
        }
        
        const worldPos = {x: (mousePosition.x - stage.x) / stage.virtualScale, y: (mousePosition.y - stage.y)/stage.virtualScale};
        
        const newScreenPos = {x: (worldPos.x ) * scale + stage.x, y: (worldPos.y) * scale + stage.y};
        
        stage.x -= (newScreenPos.x-mousePosition.x) ;
        stage.y -= (newScreenPos.y-mousePosition.y) ;

        stage.setScale(scale);
        this.stage.renderStage();
    }
}

