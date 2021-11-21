import { AxisEnum } from "@/types/AxisEnum";
import { DirectionEnum } from "@/types/DirectionEnum";
import Point, { IPoint } from "@/types/Point";
import { AppConfig } from "@/utils/AppConfig";
import { IHelper } from "@/types/Helper";

export class AxisHelper implements IHelper {
    axis: AxisEnum;
    start: IPoint;
    direction: DirectionEnum;

    constructor(axis: AxisEnum, start: IPoint, direction: DirectionEnum) {
        this.axis = axis;
        this.start = start;
        this.direction = direction;
    }

    // get the point on the fixed axis we need to snap to
    getSnapPoint(currentPoint: IPoint): IPoint {
        if(this.axis == AxisEnum.Y) {
            return {x: this.start.x, y: currentPoint.y};
        } else {
            return {x: currentPoint.x, y: this.start.y};
        }
    }

    static getAxisHelper(originPoint: Point, cursorPoint: Point): AxisHelper | null {
        const xDifference = originPoint.x - cursorPoint.x;
        const yDifference = originPoint.y - cursorPoint.y;
        const xDifferenceAbs = Math.abs(xDifference);
        const yDifferenceAbs = Math.abs(yDifference);
    
        // no need to show the helper the mouse cursor is too far from axis
        if (yDifferenceAbs > AppConfig.axisHelperToleranceToShow && xDifferenceAbs > AppConfig.axisHelperToleranceToShow) {
            return null;
        }
    
        let direction = DirectionEnum.DOWN;
        let snapAxis = AxisEnum.X;
        // we show the the helper on X axis
        if (xDifferenceAbs > yDifferenceAbs) {
            if (xDifference < 0) {
                direction = DirectionEnum.RIGHT;
            } else {
                direction = DirectionEnum.LEFT
            }
            snapAxis = AxisEnum.X;
    
        } else {
            if (yDifference < 0) {
                direction = DirectionEnum.DOWN;
            } else {
                direction = DirectionEnum.UP
            }
    
            snapAxis = AxisEnum.Y;
        }
    
        return new this(snapAxis, { x: originPoint.x, y: originPoint.y }, direction);
    }
}