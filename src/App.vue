<template>
  <div>
    <div id="top-menu" class="font-bigger">
      <div class="top-menu-container">
      <TopMenu />
      </div>
      <div class="top-menu-container" id="file">
        Untitled Document
      </div>
      <div class="top-menu-container" id="scale">
        <Scale />
      </div>
    </div>
    <div id="content">
      <div id="tools-container">
        <Menu @menuItemClicked="menuItemClicked" />
      </div>
      <div id="layers-container" v-show="store.layerPanelDisplayed">
        <Layers />
      </div>
      <div id="main-canvas">
        <Canvas />
      </div>
      <div id="item-property">
        Background: [{{ Math.floor(store.mousePosition.x) }} x
        {{ Math.floor(store.mousePosition.y) }}]<br />
        <Line />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menu from "./components/Menu.vue";
import Layers from "./components/Layers.vue";
import TopMenu from "./components/TopMenu.vue";
import Scale from "./components/Scale.vue";
import Line from "./components/ItemProperties/Line.vue";
import Canvas from "./components/Canvas.vue";
import { useEngine } from "./models/Engine";
import IMenuItem from "./types/MenuItem";
import { useUIStateStore } from "./store/UIState";

export default defineComponent({
  name: "App",
  components: { Menu, Line, TopMenu, Layers, Canvas, Scale },
  setup() {
    const store = useUIStateStore();
    const engine = useEngine();

    return {
      engine,
      store,
    };
  },
  methods: {
    menuItemClicked(item: IMenuItem) {
      this.engine.handler.setEventHandler(item.getHandler(this.engine.stage));
    },
  },
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#top-menu .top-menu-container {
  /*padding: 10px;*/
}

#content {
  flex: 1;
  display: flex;
  height: calc(100vh - 49px);
  min-width: 800px;
}

#tools-container {
  flex: 0 2 90px;
  border-right: 1px solid var(--border-color);
}

#layers-container {
  flex: 0 2 240px;
  width: 240px;
  min-width: 240px;
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
