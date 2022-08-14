import { IPolygonStyle } from "@/types/Style";
import { IShapeBorder } from "@/types/Border";
import { IShapeFill } from "@/types/Fill";

export class Style implements IPolygonStyle {
    border: IShapeBorder = {color: "inherited", alpha: "inherited", thickness: "inherited"} 
    fill?: IShapeFill;
}