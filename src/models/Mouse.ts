import IMousePosition from "@/types/Mouse";
import Point from "@/types/Point";
import { ISnapper } from "@/types/Snapper";

export default class MousePosition implements IMousePosition{
    absolute: Point = new Point(0, 0);
    relative: Point = new Point(0, 0);
    activeSnapper: ISnapper | null = null;

    getAbsolutePosition(): Point {
        return this.absolute;
    }

    getRelativePosition(excludeActiveSnaper = false): Point {
        if(this.activeSnapper && !excludeActiveSnaper) {
            return this.activeSnapper.getSnapPoint();
        } else {
            return this.relative;
        }
        
    }

    setActiveSnapper(snapper: ISnapper): void {
        this.activeSnapper = snapper;
    }

    removeActiveSnapper(): void {
        this.activeSnapper = null;
    }
}