import { CustomEvenTypes } from "@/utils/EventTypes";
import { Ref, ref } from "vue";
import Stage from "../Stage";
import { useEventBus } from "./useEventBus";

export function useStageHistory(stage: Stage) {
    const stageHistory = stage.getStageHistory();
    const isUndoPossible: Ref<boolean> = ref(stageHistory.isUndoPossible());
    const isRedoPossible: Ref<boolean> = ref(stageHistory.isRedoPossible());
    const { register } = useEventBus();
    register(CustomEvenTypes.CANVAS_COMMAND_PERFORMED, commandAddedHandler);

    function undo(): void {
        stage.undo();
    }

    function redo(): void {
        stage.redo();
        
    }

    function commandAddedHandler() {
        isUndoPossible.value = stageHistory.isUndoPossible();
        isRedoPossible.value = stageHistory.isRedoPossible();
    }

    return {
        undo,
        redo,
        isUndoPossible,
        isRedoPossible
    };
}