import Stage from "../../../Stage";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { CustomEvenTypes } from "@/utils/EventTypes";
import { InteractionManager } from "@pixi/interaction";
import { Point as PIXIPoint } from "@pixi/math";
import { RenderableShape } from "@/types/RenderableShape";
import { ISnapper } from "@/types/Snapper";
import Point from "@/types/Point";

export class Snapper extends EventHandler {
    stage: Stage;
    private interactionManager: InteractionManager;
    private activeSnapper: ISnapper | null = null;

    events: IEvent[] = [
        {
            name: CustomEvenTypes.MOUSE_POSITION_UPDATE,
            handler: (event: MouseEvent) => {
                this.mouseMove(event);
            }
        }
    ];

    constructor(stage: Stage) {
        super();
        this.interactionManager = stage.getRenderer().plugins.interaction;
        this.stage = stage;
    }

    private mouseMove(event: MouseEvent): void {
        const mousePoint = this.stage.mousePosition.absolute;
        let selectedSnapper: ISnapper | null = null;
        const renderableObject = this.interactionManager.hitTest(new PIXIPoint(mousePoint.x, mousePoint.y), this.stage.background);
        if (renderableObject && renderableObject instanceof RenderableShape && renderableObject.shape) {
            const snappers = renderableObject.shape.getSnappers();
            for (let i = 0; i < snappers.length; i++) {
                if (snappers[i].isSnapPointHovered(this.stage.mousePosition.relative)) {
                    selectedSnapper = snappers[i];
                }
            }
        }

        
        if (selectedSnapper) {
            this.stage.mousePosition.relative = selectedSnapper.getSnapPoint();
            if (this.activeSnapper == null) {
                this.activeSnapper = selectedSnapper;
                this.stage.getEventBus().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_POSITION_UPDATE, event);
            }
        } else {
            this.activeSnapper = null;
        }

        this.renderSnappers()
    }

    renderSnappers() {
        if (this.activeSnapper) {
            this.stage.clearSnappers();
            const snapperRenderer = this.activeSnapper.getRenderObject();
            snapperRenderer.addToLayer(this.stage.snapLayer);
        } else {
            this.stage.clearSnappers();
        }
    }

}

