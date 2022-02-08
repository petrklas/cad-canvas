import IMenuItem from "@/types/MenuItem";
import {Line as LineHandler} from "@/models/Events/EventHandlers/Line";
import Stage from "../../Stage";


export class MainMenu implements IMenuItem {
    name = 'MainMenu';
    label = 'Menu';

    getHandler(stage: Stage): any {
        return new LineHandler(stage);
    }
}
