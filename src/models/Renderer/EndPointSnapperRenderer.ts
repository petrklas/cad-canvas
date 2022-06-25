import { RenderableSnapper } from "@/types/Snapper";
import { EndPointSnapper } from "../Snappers/Snappers"
import { AppConfig } from "@/config/AppConfig";
import Layer from "../Layer";

export default class EndPointSnapperRenderer extends RenderableSnapper {
    snapper: EndPointSnapper;

    constructor(snapper: EndPointSnapper) {
        super();
        this.snapper = snapper;
    }

    addToLayer(layer: Layer): void {
        this.lineStyle(AppConfig.snapper.borderWidth, AppConfig.snapper.color, 1);
        const offset = AppConfig.snapper.width / layer.scale.x / 2;
        this.drawRect(this.snapper.getSnapPoint().x - offset,  this.snapper.getSnapPoint().y - offset, AppConfig.snapper.width /  layer.scale.x, AppConfig.snapper.width /  layer.scale.x);
        layer.addShape(this);
    }
}