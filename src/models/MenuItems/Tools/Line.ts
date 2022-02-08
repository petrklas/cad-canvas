import IMenuItem from "@/types/MenuItem";
import {Line as LineHandler} from "@/models/Events/EventHandlers/Line";
import Stage from "../../Stage";


export class Line implements IMenuItem {
    name = 'Line';
    label = 'Line';

    getHandler(stage: Stage): any {
        return new LineHandler(stage);
    }
}
