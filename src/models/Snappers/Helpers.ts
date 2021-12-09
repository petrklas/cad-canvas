import { AxisEnum } from "@/types/AxisEnum";
import { DirectionEnum } from "@/types/DirectionEnum";
import Point, { IPoint } from "@/types/Point";
import { AppConfig } from "@/config/AppConfig";
import { IHelper } from "@/types/Helper";
import AxisHelperRenderer from "../Renderer/AxisHelperRenderer";
import { Angle, getEndpointFromLengthAndAngle, getLineAngle, getLineLength } from "@/utils/Math";

export class AxisHelper implements IHelper {
    start: IPoint;
    direction: DirectionEnum;

    constructor(start: IPoint, direction: DirectionEnum) {
        this.start = start;
        this.direction = direction;
    }

    // get the point on the fixed axis we need to snap to
    getSnapPoint(currentPoint: IPoint): IPoint {
        if (this.direction == DirectionEnum.UP || this.direction == DirectionEnum.DOWN) {
            return { x: this.start.x, y: currentPoint.y };
        } else if (this.direction == DirectionEnum.LEFT || this.direction == DirectionEnum.RIGHT) {
            return { x: currentPoint.x, y: this.start.y };
        } else {
            const length = getLineLength(this.start, currentPoint);

            if (this.direction == DirectionEnum.DOWNRIGHT) {
                return getEndpointFromLengthAndAngle(this.start, length, new Angle(45 * Math.PI / 180));
            } else if (this.direction == DirectionEnum.DOWNLEFT) {
                return getEndpointFromLengthAndAngle(this.start, length, new Angle(135 * Math.PI / 180));
            } else if (this.direction == DirectionEnum.UPRIGHT) {
                return getEndpointFromLengthAndAngle(this.start, length, new Angle(-45 * Math.PI / 180));
            } else {
                return getEndpointFromLengthAndAngle(this.start, length, new Angle(-135 * Math.PI / 180));
            }
        }
    }

    static getAxisHelper(originPoint: Point, cursorPoint: Point): AxisHelper {
        const xDifference = originPoint.x - cursorPoint.x;
        const yDifference = originPoint.y - cursorPoint.y;
        const xDifferenceAbs = Math.abs(xDifference);
        const yDifferenceAbs = Math.abs(yDifference);

        // no need to show the helper the mouse cursor is too far from axis
        if (yDifferenceAbs > AppConfig.axisHelperToleranceToShow && xDifferenceAbs > AppConfig.axisHelperToleranceToShow) {
            //return null;
        }

        const angle = getLineAngle(originPoint, cursorPoint).toDeg();


        let direction = DirectionEnum.DOWN;
        const angleAbs = Math.abs(angle);
        if (angleAbs <= 23) {
            direction = DirectionEnum.RIGHT;
        } else if (angleAbs > 157) {
            direction = DirectionEnum.LEFT;
        } else if (angle > 0 && angle > 23 && angle <= 68) {
            direction = DirectionEnum.DOWNRIGHT;
        } else if (angle > 0 && angle > 68 && angle <= 113) {
            direction = DirectionEnum.DOWN;
        } else if (angle > 0 && angle > 114 && angle <= 159) {
            direction = DirectionEnum.DOWNLEFT;
        } else if (angle < 0 && angleAbs > 23 && angleAbs <= 68) {
            direction = DirectionEnum.UPRIGHT;
        } else if (angle < 0 && angleAbs > 68 && angleAbs <= 113) {
            direction = DirectionEnum.UP;
        } else if (angle < 0 && angleAbs > 114 && angleAbs <= 159) {
            direction = DirectionEnum.UPLEFT;
        }

        return new this({ x: originPoint.x, y: originPoint.y }, direction);
    }

    getRenderObject(): AxisHelperRenderer {
        return new AxisHelperRenderer(this);
    }
}