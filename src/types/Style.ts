import { IShapeBorder } from "./Border";
import { IShapeFill } from "./Fill";

export interface IStyle {
    border?: IShapeBorder
}

export interface IPolygonStyle extends IStyle {
    border?: IShapeBorder;
    fill?: IShapeFill;
}