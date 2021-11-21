import { Container } from "@pixi/display";
import { ISnapper } from "@/types/Snapper";
import RenderableObject from "@/types/RenderableObject";

export default class Layer extends Container {
    snappers: Array<ISnapper> = [];
    name = "";

    getSnappers(): Array<ISnapper> {
        return this.snappers;
    }

    addSnappers(snappers: Array<ISnapper>): void {
        this.snappers.push(...snappers);
    }

    addShape(object: RenderableObject): void {

        /*if(typeof shape.getSnappers !== "undefined" && shape.getSnappers()) {
            this.addSnappers(shape.getSnappers());
        }*/

        this.addChild(object);
    }
}