import Point from "@/types/Point";
import Stage from "../../../Stage";
import { AppConfig } from "@/config/AppConfig";
import { EventHandler, IEventListener, IGlobalEventHandler } from "@/types/EventHandler";
import { CustomEvenTypes } from "@/utils/EventTypes";

export class Zoom extends EventHandler implements IGlobalEventHandler {
    stage: Stage;
    eventListeners: IEventListener[] = [
    {
        name: CustomEvenTypes.WHEEL_UP,
        handler: (event: MouseEvent): void => {
            this.zoom("in", event);
        }
    },
    {
        name: CustomEvenTypes.WHEEL_DOWN,
        handler: (event: MouseEvent): void => {
            this.zoom("out", event);
        }
    },
    ];

    constructor(stage: Stage) {
        super();
        this.stage = stage;
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

    attachHandler(): void {
        this.registerEventListeners(this.eventListeners);
    }
}

