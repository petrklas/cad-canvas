
import { useEngine } from "./useEngine";
import { inject } from "vue";
import Layer from "../Layer";

export function useLayers() {

  const engine = useEngine();
  const background = engine.getStage().getBackground();

  function getAllLayers(): Layer[] {
    return background.getLayers();
  }

  function hideLayer(layer: Layer): void {
    layer.setVisibility(false);
    engine.getStage().renderStage();
  }

  function showLayer(layer: Layer): void {
    layer.setVisibility(true);
    engine.getStage().renderStage();
  }

  return {
    engine,
    getAllLayers,
    hideLayer,
    showLayer,
  };
}