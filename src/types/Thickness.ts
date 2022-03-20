import { Inherited } from "./Inherited";

export interface IThickness {
    thickness: number;
}

export type IShapeThicknessType = Inherited | number;
