import Stage from "../../../Stage";
import { EventHandler, IEventListener, IGlobalEventHandler } from "@/types/EventHandler";
import { CustomEvenTypes, MouseMoveRelativeEvent } from "@/utils/EventTypes";
import { InteractionManager } from "@pixi/interaction";
import { Point as PIXIPoint } from "@pixi/math";
import { RenderableShape } from "@/types/RenderableShape";
import { ISnapper } from "@/types/Snapper";
import EventBus, { IEventStopPropagationCallback } from "../../EventBus";

export class Snapper extends EventHandler implements IGlobalEventHandler {
    stage: Stage;
    private interactionManager: InteractionManager;
    private activeSnapper: ISnapper | null = null;

    eventListeners: IEventListener[] = [
        {
            name: CustomEvenTypes.MOUSE_MOVE,
            handler: (event: MouseMoveRelativeEvent, stopPropagationCallback: IEventStopPropagationCallback): void => {
                this.mouseMove(event, stopPropagationCallback);
            }
        }
    ];

    constructor(stage: Stage) {
        super();
        this.interactionManager = stage.getRenderer().plugins.interaction;
        this.stage = stage;
    }

    private mouseMove(event: MouseMoveRelativeEvent, stopPropagationCallback: IEventStopPropagationCallback): void {
        const mousePoint = this.stage.mousePosition.absolute;
        let selectedSnapper: ISnapper | null = null;
        // first we search for hovered shape
        const renderableObject = this.interactionManager.hitTest(new PIXIPoint(mousePoint.x, mousePoint.y), this.stage.background);
        if (renderableObject && renderableObject instanceof RenderableShape && renderableObject.shape) {
            const snappers = renderableObject.shape.getSnappers();
            // we loop all its snappers and check if any of them is nearby the mouse position
            for (let i = 0; i < snappers.length; i++) {
                if (snappers[i].isSnapPointHovered(this.stage.mousePosition.getRelativePosition(true))) {
                    selectedSnapper = snappers[i];
                }
            }
        }

        // if we found any applicable snapper
        if (selectedSnapper) {
            console.log("activeSnapper");
            // Set the snapper as active. This prevents to clear the snapper scene all over
            this.activeSnapper = selectedSnapper;
            this.stage.mousePosition.setActiveSnapper(selectedSnapper);
            if (event.relativeOffset != selectedSnapper.getSnapPoint()) {
                event.relativeOffset = selectedSnapper.getSnapPoint();
                this.renderSnapper(selectedSnapper);
            }
        }
        // if there wasn't found any applicable snapper remove it from scene
        else if (this.activeSnapper != null) {
            this.activeSnapper = null;
            this.stage.mousePosition.removeActiveSnapper();
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


    attachHandler(): void {
        this.registerEventListeners(this.eventListeners);  
    }
}

