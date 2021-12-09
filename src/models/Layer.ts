import { Container } from "@pixi/display";
import { ISnapper } from "@/types/Snapper";
import RenderableObject from "@/types/RenderableObject";
import ILayer from "@/types/Layer";

export default class Layer extends Container implements ILayer {
    snappers: Array<ISnapper> = [];
    borderWith: number;
    color: number;
    name: string;

    constructor(name: string, borderWidth: number, color: number ) {
        super();
        this.name = name;
        this.borderWith = borderWidth;
        this.color = color;
    }

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