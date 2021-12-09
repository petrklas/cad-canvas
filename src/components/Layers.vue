<template>
  <header class="font-bigger">
    <div class="tab-item">Layers</div>
    <svg
      width="20"
      height="20"
      xmlns="http://www.w3.org/2000/svg"
      fill-rule="evenodd"
      clip-rule="evenodd"
    >
      <path d="M9 9v-9h1v9h9v1h-9v9h-1v-9h-9v-1h9z" />
    </svg>
  </header>
  <nav>
    <ul>
      <li
        v-for="layer in layers"
        :key="layer.name"
        v-on:click="$emit('menuItemClicked', item), setActiveMenu(item)"
      >
        {{ layer.name }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, inject, toRef } from "@vue/runtime-core";
import Engine from "@/models/Engine";

export default defineComponent({
  emits: ["layerItemClicked"],

  setup() {
    const engine = inject<Engine>("engine");
    const layers = engine?.stage.layers;

    return {
      layers,
    };
  },
});
</script>
<style scoped>
header {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid var(--border-color);
}
header svg {
  display: flex;
  justify-content: flex-end;
  border-radius: 2px;
  height: 100%;
  padding: 0 16px;
  flex-grow: 1;
}
header svg path {
  fill: var(--blue-color);
}
</style>