<template>
  <nav>
    <ul>
      <li
        v-for="item in menuItems"
        :key="item.name"
        v-on:click="$emit('menuItemClicked', item), setActiveMenu(item)"
      >
        {{ item.label }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { useMenu } from "@/models/Menu";
import { defineComponent } from "@vue/runtime-core";
import { MainMenu } from "@/models/MenuItems/TopMenu"

export default defineComponent({
  emits: ["menuItemClicked"],

  setup() {
    const { menuItems, activeMenuItem, setActiveMenu } = useMenu([
      new MainMenu()
    ]);
    return {
      menuItems,
      activeMenuItem,
      setActiveMenu,
    };
  },

  watch: {
    activeMenuItem() {
      console.log(this.activeMenuItem);
    },
  },
});
</script>