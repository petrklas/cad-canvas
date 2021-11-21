import IMenuItem from "@/types/MenuItem";
import {Line as LineHandler} from "@/models/Handlers/Line";
import Engine from "../Engine";


export class Line implements IMenuItem {
    name = 'Line';

    getHandler(engine: Engine): any {
        return new LineHandler(engine);
    }
}
