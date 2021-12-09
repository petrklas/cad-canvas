import Stage from "@/models/Stage";
import { IShape } from "@/types/Shape";
import { IKeyboardShortcut } from "./KeyboardShortcuts";
import { ISnapper } from "./Snapper";

export interface IEventsHandler {
    stage: Stage;
}

export interface IGlobalEventsHandler extends IEventsHandler {

}

export interface IShapeEventsHandler extends IEventsHandler {
    modifier: IKeyboardShortcut;
    allowSnappers: boolean;
    snappers?: Array<ISnapper>;
    shape?: IShape;
}
