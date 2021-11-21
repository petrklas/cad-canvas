import { RenderableSnapper } from "@/types/Snapper";
import { EndPointSnapper } from "../Snappers/Snappers"
import { AppConfig } from "@/utils/AppConfig";

export default class EndPointSnapperRenderer extends RenderableSnapper {
    snapper: EndPointSnapper;

    constructor(snapper: EndPointSnapper) {
        super();
        this.snapper = snapper;
        this.lineStyle(AppConfig.snapper.borderWidth, AppConfig.snapper.color, 1);
        const offset = AppConfig.snapper.width / 2;
        this.drawRect(this.snapper.getSnapPoint().x - offset,  this.snapper.getSnapPoint().y - offset, AppConfig.snapper.width, AppConfig.snapper.width);
    }
}