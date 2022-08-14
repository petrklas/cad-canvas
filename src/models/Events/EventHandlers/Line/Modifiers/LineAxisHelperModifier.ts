import Stage from "../../../../Stage";
import { AxisHelper } from "../../../../Snappers/AxisHelper";
import { Line } from "@/models/Shapes/Line";
import IShapeModifier from "@/types/ShapeModifier";

export class LineAxisHelperModifier implements IShapeModifier  {
    stage: Stage;


    constructor(stage: Stage) {
        this.stage = stage;
    }

    modify(line: Line): void {
        const axisHelper = AxisHelper.getAxisHelper(line.getStart(), line.getEnd());
        line.setEnd(axisHelper.getSnapPoint(line.getEnd()));
        const axisHelperRenderer = axisHelper.getRenderObject();
        axisHelperRenderer.addToLayer(this.stage.foreground);
    }
}

