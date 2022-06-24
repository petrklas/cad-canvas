<template>
  <ul>
    <li
      v-for="item in menuItems"
      :key="item.name"
      v-on:click="$emit('menuItemClicked', item), setActiveMenu(item)"
    >
      {{ item.label }}
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
import { defineComponent, onMounted, toRef } from "@vue/runtime-core";
import { Line, Selector} from "@/models/MenuItems/Tools"

export default defineComponent({

  emits: ["menuItemClicked"],

  setup(props, { emit }) {
    const store = useUIStateStore();
    
    const {menuItems, activeMenuItem, setActiveMenu} = useMenu([
        new Line(),
        new Selector(),
    ]);
    let layerPanelDisplayed = toRef(store, "layerPanelDisplayed");

    onMounted(() => {
      emit("menuItemClicked", activeMenuItem);
    });
    
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