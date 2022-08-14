import { IShapeColorType } from "./Color";
import { IAlphaType } from "./Alpha";

export interface IShapeFill {
    color: IShapeColorType;
    alpha: IAlphaType;
}

export interface IShapeFillValues {
    color: number;
    alpha: number;
}