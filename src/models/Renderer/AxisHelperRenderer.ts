import { DirectionEnum } from "@/types/DirectionEnum";
import { RenderableHelper } from "@/types/Helper"
import { AxisHelper } from "../Snappers/Helpers"
import { AppConfig } from "@/utils/AppConfig";

export default class AxisHelperRenderer extends RenderableHelper  {
    snapper: AxisHelper;

    constructor(snapper: AxisHelper) {
        super();
        this.snapper = snapper;
        this.lineStyle(AppConfig.snapper.borderWidth, AppConfig.snapper.color, 0.5);

        this.moveTo(this.snapper.start.x, this.snapper.start.y);

        switch (this.snapper.direction) {
            case DirectionEnum.DOWN:
                // TODO we should get coords from canvas
                this.lineTo(this.snapper.start.x, this.snapper.start.x + 2000);
                break;
            case DirectionEnum.UP:
                this.lineTo(this.snapper.start.x, 0);
                break;
            case DirectionEnum.LEFT:
                this.lineTo(0, this.snapper.start.y);
                break;
            case DirectionEnum.RIGHT:
                // TODO we should get coords from canvas
                this.lineTo(2000, this.snapper.start.y);
                break;
        }
    }
}