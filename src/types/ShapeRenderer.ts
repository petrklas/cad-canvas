import ForegroundLayer from "@/models/ForegroundLayer";
import Layer from "@/models/Layer";
import { RenderableShape } from "./RenderableShape";
import { IShape } from "./Shape";

export interface IShapeRenderer {
    shape: IShape;

    getForegroundRenderer(layer: ForegroundLayer): RenderableShape

    getBackGroundRenderer(layer: Layer): RenderableShape
}
