import IMenuItem from "@/types/MenuItem";
import {Rectangle as RectangleHandler} from "@/models/Handlers/Rectangle";
import Engine from "../Engine";


export class Rectangle implements IMenuItem {
    name = 'Rectangle';

    getHandler(engine: Engine): any {
        return new RectangleHandler(engine);
    }
}
