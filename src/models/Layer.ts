import { Container } from "@pixi/display";
import { ILayer, ILayerOptions } from "@/types/Layer";
import { AppConfig } from "@/config/AppConfig";
import { IShaderType } from "@/types/Shader";
import { Shader } from "pixi.js";
import { RenderableShape } from "@/types/RenderableShape";

export default class Layer extends Container implements ILayer {
    options: ILayerOptions;

    constructor(options: ILayerOptions) {
        super();
        this.options = options
    }

    getName(): string {
        if(this.options) {
            if(this.options.name) {
                return this.options.name;
            }
        }
        return "";
    }

    getBorderThickness(): number {
        if(this.options.border) {
            return this.options.border.thickness;
        } else {
            return AppConfig.layer.defaultBorderThickness;
        }
    }

    getBorderColor(): number {
        if(this.options.border) {
            return this.options.border.color;
        } else {
            return AppConfig.layer.defaultColor;
        }
    }

    getBorderAlpha(): number {
        if(this.options.border) {
            return this.options.border.alpha;
        } else {
            return 1;
        }
    }

    getBorderShader(): Shader | undefined {
        if(this.options.border && this.options.border.shader) {
            return this.options.border.shader;
        } else {
            return undefined;
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

    addShape(object: RenderableShape): void {

        /*if(typeof shape.getSnappers !== "undefined" && shape.getSnappers()) {
            this.addSnappers(shape.getSnappers());
        }*/

        this.addChild(object);
    }

    setVisibility(visibility: boolean): void {
        this.visible = visibility;
    }

    getAllChildrenProperty(propertyName: string): any[] {
        const childrenProperties: any[] = [];
        this.children.forEach((child) => console.log(child));

        return childrenProperties;
    }
}