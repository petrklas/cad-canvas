import { Container } from "@pixi/display";
import RenderableObject from "@/types/RenderableObject";
import { ILayer, ILayerOptions } from "@/types/Layer";
import { RenderableShape } from "@/types/RenderableShape";
import { DisplayObject } from "pixi.js";
import { AppConfig } from "@/config/AppConfig";

export default class Layer extends Container implements ILayer {
    options: ILayerOptions | undefined = undefined;

    constructor(options?: ILayerOptions) {
        super();
        this.options = options
    }

    getName(): string {
        if(this.options?.name) {
            return this.options.name;
        } else {
            return "";
        }
    }

    getBorderWidth(): number {
        if(this.options?.borderWidth) {
            return this.options.borderWidth;
        } else {
            return AppConfig.layer.defaultWidth;
        }
    }

    getColor(): number {
        if(this.options?.color) {
            return this.options.color;
        } else {
            return AppConfig.layer.defaultColor;
        }
    }

    setScale(scale: number): void {
        this.scale.set(scale);

        // we have to re-render all shapes, because when scaling we need to keep the line thickness the same size and not scaled
        // if we use "native" lineStyle option we don't need to rescale the graphics, but the thickness is always 1px wide
        // resolved by graphics-smooth extension for pixi, which has setting for not scaling the graphics width with stage scale
        /*
        for(let i = 0; i < this.children.length; i++) {
            const child:DisplayObject = this.children[i];
            
            if( child instanceof RenderableShape) {
                child.renderShape(this);
            }
            
        }*/
    }

    getScale(): number {
       return this.scale.x
    }

    addShape(object: RenderableObject): void {

        /*if(typeof shape.getSnappers !== "undefined" && shape.getSnappers()) {
            this.addSnappers(shape.getSnappers());
        }*/

        this.addChild(object);
    }

    setVisibility(visibility: boolean): void {
        this.visible = visibility;
    }
}