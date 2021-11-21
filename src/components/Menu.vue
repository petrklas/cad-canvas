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
</template>

<script lang="ts">
import { useMenu } from "@/models/Menu"
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({

  emits: ["menuItemClicked"],

  setup() {
    const {menuItems, activeMenuItem, setActiveMenu} = useMenu();
    return {
      menuItems,
      activeMenuItem,
      setActiveMenu,
    }
    
  },

  watch: {
    activeMenuItem() {
      console.log(this.activeMenuItem);
    }
  }
});
</script>