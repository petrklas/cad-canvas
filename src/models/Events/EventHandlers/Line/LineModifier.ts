import { Line as LineShape} from "@/models/Shapes/Line";
import Stage from "@/models/Stage";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { CustomEvenTypes } from "@/utils/EventTypes";

export class LineModifier extends EventHandler {
    stage: Stage;
    shape: LineShape;
    events: IEvent[] = [
        {
            name: CustomEvenTypes.MOUSE_DOWN_LEFT,
            handler: () => {
                //this.leftClickDown();
            }
        },
        {
            name: CustomEvenTypes.MOUSE_POSITION_UPDATE,
            handler: () => {
                //this.mouseMove();
            }
        },
        {
            name: CustomEvenTypes.KEY_ESC,
            handler: () => {
                //this.keyEsc();
            }
        }
    ];

    constructor(stage: Stage, shape: LineShape) {
        super();
        this.stage = stage;
        this.shape = shape;
    }
}