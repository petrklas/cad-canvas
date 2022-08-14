import { IStyle } from "@/types/Style";
import { IShapeBorder } from "@/types/Border";

export class Style implements IStyle {
    border: IShapeBorder = {color: "inherited", alpha: "inherited", thickness: "inherited", shader: "inherited"} 
}