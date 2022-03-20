import Point from "@/types/Point";

const radToDegMultiplier = 180 / Math.PI;
const degToRadMultiplier =  Math.PI / 180; 

export interface IAngle {
    radians: number;

    toRad(): number;
    toDeg(): number;
}

export class Angle implements IAngle {
    radians: number;
    constructor(radians: number) {
        this.radians = radians;
    }

    toRad(): number {
        return this.radians;
    }

    toDeg(): number {
        return this.radians * radToDegMultiplier;
    }
}

export function angleFromInput(input: number | string): Angle {
    let number = 0
    if(typeof input === "string") {
        number = parseInt(input);
    } else {
        number = input;
    }
    
    return new Angle(number * degToRadMultiplier);
}

export function getLineAngle(start: Point, end: Point): Angle {
    const xLength = end.x - start.x;
    const yLength = end.y - start.y;

    const radians = Math.atan2(yLength, xLength);

    //theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
    //if (theta < 0) theta += 360; 
    return new Angle(radians);
}

export function getLineLength(start: Point, end: Point): number {
    const xLength = end.x - start.x;
    const yLength = end.y - start.y;

    return Math.floor(Math.sqrt(xLength * xLength + yLength * yLength));
}

export function getEndpointFromLengthAndAngle(start: Point, length: number, angle: Angle): Point {
    const y = Math.sin(angle.toRad()) * length;
    const x = Math.cos(angle.toRad()) * length;

    return new Point(start.x + x, start.y + y);
}



