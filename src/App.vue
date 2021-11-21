<template>
  <div class="app">
    <Menu @menuItemClicked="menuItemClicked" />
    <div>
      [{{ UIState.mousePosition.x }} x {{ UIState.mousePosition.x }}], Scale: {{ UIState.scale }},
      <Line />
    </div>
    <div
      ref="mainCanvas"
      v-on:mousemove="handleEvent"
      v-on:mousedown="handleEvent"
      v-on:mouseup="handleEvent"
      @wheel.prevent="wheelEvent"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  provide,
  ref,
  onMounted,
} from "vue";
import Menu from "./components/Menu.vue";
import Line from "./components/MenuItems/Line.vue";
import Engine from "./models/Engine";
import Renderer from "./models/Renderer";
import * as PIXI from "pixi.js";
import IMenuItem from "./types/MenuItem";
import { useStore } from './store'

export default defineComponent({
  name: "App",
  components: { Menu, Line },
  setup() {
    const mainCanvas = ref<HTMLDivElement>();
    const store = useStore();
    const UIState = ref(store.state);
    
    const renderer = new Renderer({
      width: window.innerWidth - 50,
      height: window.innerHeight - 50,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      antialias: true,
    });

    let engine = new Engine(renderer);
    provide("engine", engine);

    onMounted(() => {
      if (mainCanvas.value) {
        mainCanvas.value?.appendChild(renderer.view);
        // don't know why, but if I remove this the pixi renderer crashes completly
        new PIXI.Graphics();
        engine.render();
      }
    });

    return {
      engine,
      mainCanvas,
      renderer,
      UIState,
    };
  },
  methods: {
    menuItemClicked(item: IMenuItem) {
      this.engine.handler.setEventHandler(item.getHandler(this.engine));
    },  

    handleEvent(event: MouseEvent) {
      this.engine.handler.handle(event);
    },

    wheelEvent(event: WheelEvent) {
      this.engine.handler.handle(event);
    },
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      this.engine.handler.handle(event);
    });
  },
});
</script>

<style>
</style>
