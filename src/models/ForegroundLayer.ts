import { IForegroundLayer } from "@/types/Layer";
import Layer from "./Layer";

export default class ForegroundLayer extends Layer implements IForegroundLayer {
    currentLayer: Layer | undefined;


    setCurrentLayer(layer: Layer) {
        this.currentLayer = layer;
        this.options = this.currentLayer.options;
    }
}