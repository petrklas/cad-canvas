import { RenderableSnapper } from "@/types/Snapper";
import { CenterSnapper } from "../Snappers/Snappers"
import { AppConfig } from "@/utils/AppConfig";

export default class CenterSnapperRenderer extends RenderableSnapper {
    snapper: CenterSnapper;

    constructor(snapper: CenterSnapper) {
        super();
        this.snapper = snapper;
        this.lineStyle(AppConfig.snapper.borderWidth, AppConfig.snapper.color, 1);
        const offset = AppConfig.snapper.width / 2;
        const centerPoint = this.snapper.getSnapPoint();

        this.moveTo(centerPoint.x - offset, centerPoint.y - offset);
        this.lineTo(centerPoint.x + offset, centerPoint.y + offset);
        this.moveTo(centerPoint.x - offset, centerPoint.y + offset);
        this.lineTo(centerPoint.x + offset, centerPoint.y - offset);
    }
}