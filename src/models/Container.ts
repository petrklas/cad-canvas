import { Container as PIXIContainer} from "@pixi/display";
import Layer from "./Layer";
import { RenderableShape } from "@/types/RenderableShape";

export default class Container extends PIXIContainer {
    layers: Layer[] = [];
    activeLayer: Layer | null = null;

    constructor() {
        super();
    }

    setScale(scale: number) {
        for(let i = 0; i < this.layers.length; i++) {
            this.layers[i].setScale(scale);
        }
    }

    addLayer(layer: Layer, active?: boolean): void {
        const index: number = this.layers.indexOf(layer);
        if (index == -1) {
            this.layers.push(layer);
            this.addChild(layer);

            if(active) {
                this.activeLayer = layer;
            }
        } 
    }

    removeLayer(layer: Layer) {
        const index: number = this.layers.indexOf(layer);
        if (index != -1) {
            this.layers.splice(index, 1);
            this.removeChild(layer);
        } else {
            throw new Error("Removed layer doesn't exist");
        }
    }

    getActiveLayer(): Layer {
        if(this.activeLayer == null) {
            throw new Error("We need to always set active layer");
        }

        return this.activeLayer;
    }

    addToLayer(displayObject: RenderableShape, layer: Layer): void {
        const index: number = this.layers.indexOf(layer)
        if (index != -1) {
            this.layers[index].addShape(displayObject);
        } else {
            throw new Error("Layer does not exist");
        }
    }

    addToCurrentLayer(displayObject: RenderableShape): void {
        this.getActiveLayer().addShape(displayObject);
    }

    getLayers(): Layer[] {
        return this.layers;
    }

    // TODO: correct return type
    getChildrenRecursive(): any[] {
        let children: any[] = [];
        for(let i = 0; i < this.layers.length; i++) {
            children = [...this.layers[i].children];
        }

        return children;
    }
}