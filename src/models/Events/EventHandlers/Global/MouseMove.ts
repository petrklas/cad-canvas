import Point from "@/types/Point";
import Stage from "../../../Stage";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { CustomEvenTypes } from "@/utils/EventTypes";

export class MouseMove extends EventHandler {
    stage: Stage;
    allowSnappers = false;
    events: IEvent[] = [
    {
        name: CustomEvenTypes.MOUSE_MOVE,
        handler: (event: MouseEvent) => {
            this.mouseMove(event);
        }
    }
    ];

    constructor(stage: Stage) {
        super();
        this.stage = stage;
    }

    private mouseMove(event: MouseEvent): void {
        this.stage.setMousePosition(new Point(event.offsetX, event.offsetY));
        this.stage.getEventBus().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_POSITION_UPDATE, event);
    }
}

