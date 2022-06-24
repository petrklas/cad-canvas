import IMenuItem from "@/types/MenuItem";
import {Selector as SelectorHandler} from "@/models/Events/EventHandlers/Selector/Selector";
import Stage from "../../Stage";


export class Selector implements IMenuItem {
    name = 'Select';
    label = 'Select';

    getHandler(stage: Stage): any {
        return new SelectorHandler(stage);
    }
}
