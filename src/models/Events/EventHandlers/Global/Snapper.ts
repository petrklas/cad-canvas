import Stage from "../../../Stage";
import { EventHandler, IEvent } from "@/types/EventHandler";
import { CustomEvenTypes, MouseMoveRelativeEvent } from "@/utils/EventTypes";
import { InteractionManager } from "@pixi/interaction";
import { Point as PIXIPoint } from "@pixi/math";
import { RenderableShape } from "@/types/RenderableShape";
import { ISnapper } from "@/types/Snapper";
import EventBus from "../../EventBus";

export class Snapper extends EventHandler {
    stage: Stage;
    private interactionManager: InteractionManager;
    private activeSnapper: ISnapper | null = null;

    events: IEvent[] = [
        {
            name: CustomEvenTypes.MOUSE_MOVE,
            handler: (event: MouseMoveRelativeEvent) => {
                this.mouseMove(event);
            }
        }
    ];

    constructor(stage: Stage) {
        super();
        this.interactionManager = stage.getRenderer().plugins.interaction;
        this.stage = stage;
    }

    private mouseMove(event: MouseMoveRelativeEvent): void {
        const mousePoint = this.stage.mousePosition.absolute;
        let selectedSnapper: ISnapper | null = null;
        // first we search for hovered shape
        const renderableObject = this.interactionManager.hitTest(new PIXIPoint(mousePoint.x, mousePoint.y), this.stage.background);
        if (renderableObject && renderableObject instanceof RenderableShape && renderableObject.shape) {
            const snappers = renderableObject.shape.getSnappers();
            // we loop all its snappers and check if any of them is nearby the mouse position
            for (let i = 0; i < snappers.length; i++) {
                if (snappers[i].isSnapPointHovered(event.relativeOffset)) {
                    selectedSnapper = snappers[i];
                }
            }
        }

        // if we found any applicable snapper
        if (selectedSnapper) {

            // Set the snapper as active. This prevents to clear the snapper scene all over
            this.activeSnapper = selectedSnapper;

            // update the mouse position, but only in case that the current position isn't the same, 
            // otherwise we would create infinite loop
            if (event.relativeOffset != selectedSnapper.getSnapPoint()) {
                event.relativeOffset = selectedSnapper.getSnapPoint();
                EventBus.getInstance().dispatch<MouseEvent>(CustomEvenTypes.MOUSE_MOVE, event);
                this.renderSnapper(selectedSnapper);
            }
        }
        // if there wasn't found any applicable snapper remove it from scene
        else if (this.activeSnapper != null) {
            this.activeSnapper = null;
            this.clearSnappers();

        }
    }

    private renderSnapper(snapper: ISnapper) {
        this.stage.clearSnappers();
        const snapperRenderer = snapper.getRenderObject();
        snapperRenderer.addToLayer(this.stage.snapLayer);
        this.stage.renderStage();
    }

    private clearSnappers() {
        this.stage.clearSnappers();
        this.stage.renderStage();
    }


}

