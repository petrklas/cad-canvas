import { IShapeBorderValues } from "./Border";

export interface ILayer {
    getScale(): number;
}

export interface IForegroundLayer extends ILayer {
    currentLayer: ILayer | undefined;
}

export interface ILayerOptions {
    name?: string;
    color?: number;
    border?: IShapeBorderValues;
}