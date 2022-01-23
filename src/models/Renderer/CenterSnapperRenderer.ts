import { RenderableSnapper } from "@/types/Snapper";
import { CenterSnapper } from "../Snappers/Snappers"
import { AppConfig } from "@/config/AppConfig";
import Layer from "../Layer";

export default class CenterSnapperRenderer extends RenderableSnapper {
    snapper: CenterSnapper;

    constructor(snapper: CenterSnapper) {
        super();
        this.snapper = snapper;
    }

    addToLayer(layer: Layer) {
        this.lineStyle(AppConfig.snapper.borderWidth, AppConfig.snapper.color, 1);
        const offset = AppConfig.snapper.width / 2 / layer.scale.x;
        const centerPoint = this.snapper.getSnapPoint();

        this.moveTo(centerPoint.x - offset, centerPoint.y - offset);
        this.lineTo(centerPoint.x + offset, centerPoint.y + offset);
        this.moveTo(centerPoint.x - offset, centerPoint.y + offset);
        this.lineTo(centerPoint.x + offset, centerPoint.y - offset);

        layer.addShape(this);
    }
}