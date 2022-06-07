<template>
  <div class="scale-chooser">Scale: {{ Math.round(store.scale * 100) }} %,</div>
</template>

<script lang="ts">
import { useUIStateStore } from "@/store/UIState";
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "Scale",

  setup() {
    const store = useUIStateStore();

    return {
      store,
    };
  },
});
</script>