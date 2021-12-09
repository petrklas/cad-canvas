import IMenuItem from "@/types/MenuItem";
import {Line as LineHandler} from "@/models/Handlers/EventHandlers/Line";
import Stage from "../Stage";


export class Line implements IMenuItem {
    name = 'Line';

    getHandler(stage: Stage): any {
        return new LineHandler(stage);
    }
}
