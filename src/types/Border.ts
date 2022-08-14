import { IShapeColorType } from "./Color";
import { IShapeThicknessType } from "./Thickness";
import { IAlphaType } from "./Alpha";
import { IShaderType } from "./Shader";
import { Shader } from "pixi.js";

export interface IShapeBorder {
    color: IShapeColorType;
    thickness: IShapeThicknessType;
    alpha: IAlphaType;
    shader?: IShaderType;
}

export interface IShapeBorderValues {
    color: number;
    thickness: number;
    alpha: number;
    shader: Shader | undefined;
}