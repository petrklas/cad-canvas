import Point from "@/types/Point";
import { SnapTypes, ISnapper } from "@/types/Snapper";
import { AppConfig } from "@/config/AppConfig";
import CenterSnapperRenderer from "../Renderer/CenterSnapperRenderer";
import EndPointSnapperRenderer from "../Renderer/EndPointSnapperRenderer";

export class EndPointSnapper implements ISnapper {
    type: SnapTypes = SnapTypes.Endpoint;
    point: Point;
    readonly snapperWidth: number =  AppConfig.snapper.width + (2 * AppConfig.snapper.borderWidth);

    constructor(point: Point) {
        this.point = point;
    }

    getSnapPoint(): Point {
        return this.point;
    }

    isSnapPointHovered(mouseCursor: Point): boolean {
        const xDifference = mouseCursor.x - this.point.x;
        const yDifference = mouseCursor.y - this.point.y;
        const xDifferenceAbs = Math.abs(xDifference);
        const yDifferenceAbs = Math.abs(yDifference);
        // cursor is inside the snapper point rectangle
        if (yDifferenceAbs < this.snapperWidth / 2 && xDifferenceAbs < this.snapperWidth / 2) {
            return true;
        }

        return false;
    }

    getRenderObject(): EndPointSnapperRenderer {
        return new EndPointSnapperRenderer(this);
    }
}


export class CenterSnapper extends EndPointSnapper {
    type: SnapTypes = SnapTypes.Center;

    getRenderObject(): CenterSnapperRenderer {
        return new CenterSnapperRenderer(this);
    }
}