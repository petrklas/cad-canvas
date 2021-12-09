import IMenuItem from "@/types/MenuItem";
import {Rectangle as RectangleHandler} from "@/models/Handlers/EventHandlers/Rectangle";
import Stage from "../Stage";


export class Rectangle implements IMenuItem {
    name = 'Rectangle';

    getHandler(stage: Stage): any {
        return new RectangleHandler(stage);
    }
}
