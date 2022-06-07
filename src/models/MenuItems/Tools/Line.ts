import IMenuItem from "@/types/MenuItem";
import {LineCreator as LineHandler} from "@/models/Events/EventHandlers/Line/LineCreator";
import Stage from "../../Stage";


export class Line implements IMenuItem {
    name = 'Line';
    label = 'Line';

    getHandler(stage: Stage): any {
        return new LineHandler(stage);
    }
}
