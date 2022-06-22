<template>
      <div
        ref="mainCanvas"
        v-on:mousemove="mouseMove"
        v-on:mousedown="handleEvent"
        v-on:mouseup="handleEvent"
        @wheel.prevent="wheelEvent"
      >
      </div>
      <Coordinates />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, toRef } from "vue";
import { useEngine } from "../models/Composables/useEngine";
import * as PIXI from "pixi.js";
import { useUIStateStore } from "@/store/UIState";
import Coordinates from "./Coordinates.vue";

export default defineComponent({
  components: { Coordinates },
  name: "Canvas",
  setup() {
    const mainCanvas = ref<HTMLDivElement>();
    const store = useUIStateStore();
    const engine = useEngine();
    const renderer = engine.stage.getRenderer();
    const stage = engine.getStage();
    const layerPanelDisplayed = toRef(store, "layerPanelDisplayed");


    onMounted(() => {
      if (mainCanvas.value) {
        mainCanvas.value.appendChild(renderer.view);
        resizeCanvas();
        // don't know why, but if I remove this the pixi renderer crashes completly
        new PIXI.Graphics();
        stage.renderStage();
      }
    });

    onUnmounted(() => {
      window.removeEventListener("resize", resizeCanvas);
    });

    let resizeCanvas = () => {
      if (mainCanvas.value) {
        stage.resize(
          window.innerWidth - 570 + (store.layerPanelDisplayed ? 0 : 240),
          window.innerHeight - 49,
        );
      }
    };

    window.addEventListener("keydown", (event) => {
        engine.handler.handle(event);
    });

    window.addEventListener("keyup", (event) => {
        engine.handler.handle(event);
    });

    window.addEventListener("resize", resizeCanvas);

    return {
      engine,
      mainCanvas,
      renderer,
      store,
      layerPanelDisplayed,
      resizeCanvas
    };
  },
  methods: {
    handleEvent(event: MouseEvent) {
      this.engine.handler.handle(event);
    },

    mouseMove(event: MouseEvent) {
      this.engine.handler.handle(event);
    },

    wheelEvent(event: WheelEvent) {
      this.engine.handler.handle(event);
      this.store.scale = this.engine.stage.foreground.getScale();
    },
  },
  watch: {
    layerPanelDisplayed() {
      this.resizeCanvas();
    }
  }
});
</script>

<style>
.app {
  display: block;
  width: 100%;
  height: 100%;
}

#top-menu {
  background-color: var(--main-bg-color);
  flex: 0 0 48px;
  min-height: 48px;
  height: 48px;
  border-bottom: 1px solid var(--border-color);
}

#content {
  flex: 1;
  display: flex;
  height: calc(100vh - 49px);
}

#tools-container {
  flex: 0 2 90px;
  border-right: 1px solid var(--border-color);
}

#layers-container {
  flex: 0 2 240px;
  border-right: 1px solid var(--border-color);
}

#item-property {
  flex: 0 2 240px;
  border-left: 1px solid var(--border-color);
}

#main-canvas {
  flex: 1 1 300px;
}
</style>
