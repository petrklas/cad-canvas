import Point from "@/types/Point";
import Stage from "../../../Stage";
import { AppConfig } from "@/config/AppConfig";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { CustomEvenTypes } from "@/utils/EventTypes";

export class Zoom extends EventHandler {
    stage: Stage;
    events: IEvent[] = [
    {
        name: CustomEvenTypes.WHEEL_UP,
        handler: (event: MouseEvent) => {
            this.zoomIn(event);
        }
    },
    {
        name: CustomEvenTypes.WHEEL_DOWN,
        handler: (event: MouseEvent) => {
            this.zoomOut(event);
        }
    },
    ];

    constructor(stage: Stage) {
        super();
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
        let scale = 1;
        if (direction == "in") {
            scale = Math.min(stage.foreground.getScale() + AppConfig.zoomStep, AppConfig.zoomMax);
        } else {
            scale = Math.max(stage.foreground.getScale() - AppConfig.zoomStep, AppConfig.zoomMin);
        }

        const worldPos = { x: (mousePosition.x - stage.x) / stage.foreground.getScale(), y: (mousePosition.y - stage.y) / stage.foreground.getScale() };

        const newScreenPos = { x: (worldPos.x) * scale + stage.x, y: (worldPos.y) * scale + stage.y };

        stage.x -= (newScreenPos.x - mousePosition.x);
        stage.y -= (newScreenPos.y - mousePosition.y);

        stage.setScale(scale);
        stage.renderStage();
    }
}

