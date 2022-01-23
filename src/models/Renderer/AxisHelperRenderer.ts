import { DirectionEnum } from "@/types/DirectionEnum";
import { RenderableHelper } from "@/types/Helper"
import { AxisHelper } from "../Snappers/Helpers"
import { AppConfig } from "@/config/AppConfig";
import Layer from "../Layer";
import Point from "@/types/Point";
import { DashLineShader } from "@pixi/graphics-smooth";
// TODO
const shader = new DashLineShader({dash: 5, gap: 8});
export default class AxisHelperRenderer extends RenderableHelper  {
    snapper: AxisHelper;
    constructor(snapper: AxisHelper) {
        super();
        this.snapper = snapper;
    }

    addToLayer(layer: Layer) {
        this.lineStyle({width: AppConfig.snapper.borderWidth, color: AppConfig.snapper.color, alpha: 0.5, shader});

        this.moveTo(this.snapper.start.x, this.snapper.start.y);
        const localTopBottom = layer.toLocal(new Point(0,0));
        switch (this.snapper.direction) {
            case DirectionEnum.DOWN:
                // TODO we should get coords from canvas
                this.lineTo(this.snapper.start.x, this.snapper.start.x + 2000);
                break;
            case DirectionEnum.UP:
                this.lineTo(this.snapper.start.x, localTopBottom.y);
                break;
            case DirectionEnum.LEFT:
                this.lineTo(localTopBottom.x, this.snapper.start.y);
                break;
            case DirectionEnum.RIGHT:
                // TODO we should get coords from canvas
                this.lineTo(2000, this.snapper.start.y);
                break;
        }

        layer.addShape(this);
    }
}