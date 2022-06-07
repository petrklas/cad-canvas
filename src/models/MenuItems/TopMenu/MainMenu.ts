import IMenuItem from "@/types/MenuItem";
import {LineCreator as LineHandler} from "@/models/Events/EventHandlers/Line/LineCreator";
import Stage from "../../Stage";


export class MainMenu implements IMenuItem {
    name = 'MainMenu';
    label = 'Menu';

    getHandler(stage: Stage): any {
        return new LineHandler(stage);
    }
}
