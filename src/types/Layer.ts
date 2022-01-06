export interface ILayer {
    getScale(): number;
}

export interface IForegroundLayer extends ILayer {
    currentLayer: ILayer | undefined;
}

export interface ILayerOptions {
    name?: string;
    color?: number;
    borderWidth?: number;
    lineStyle?: string; // TODO Interface of LineStyle
}