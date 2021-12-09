<template>
  <ul>
    <li
      v-for="item in menuItems"
      :key="item.name"
      v-on:click="$emit('menuItemClicked', item), setActiveMenu(item)"
    >
      {{ item.name }}
    </li>
  </ul>
  <ul>
    <li>
      <a @click.prevent="layerPanelDisplayed = !layerPanelDisplayed">Layers</a>
    </li>
  </ul>

</template>

<script lang="ts">
import { useMenu } from "@/models/Menu"
import { useUIStateStore } from "@/store/UIState";
import { defineComponent, toRef } from "@vue/runtime-core";

export default defineComponent({

  emits: ["menuItemClicked"],

  setup() {
    const store = useUIStateStore();
    const {menuItems, activeMenuItem, setActiveMenu} = useMenu();
    let layerPanelDisplayed = toRef(store, "layerPanelDisplayed");
    
    return {
      menuItems,
      activeMenuItem,
      setActiveMenu,
      layerPanelDisplayed
    }
    
  },

  watch: {
    activeMenuItem() {
      console.log(this.activeMenuItem);
    },
    layerPanelDisplayed() {
      console.log(this.layerPanelDisplayed);
    }
  }
});
</script>