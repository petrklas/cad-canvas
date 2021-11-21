import Engine from "@/models/Engine";
import Mouse from "@/models/Mouse";
import { IShape } from "@/types/Shape";
import { ISnapper } from "./Snapper";

export default interface IEventsHandler {
    leftClick?: (mouse: Mouse) => any;
    middleClick?: (mouse: Mouse) => any;
    rightClick?: (mouse: Mouse) => any;
    mouseMove?: (mouse: Mouse) => any;
    keyEsc?: (event: KeyboardEvent) => any;
    engine: Engine;
    allowSnappers: boolean;
    snappers?: Array<ISnapper>;
    shape?: IShape;
}