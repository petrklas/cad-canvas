<template>
  <div id="coordinates">{{ Math.round(mousePosition.x) }} x {{ Math.round(mousePosition.y) }}</div>
</template>

<script lang="ts">
import Point from "@/types/Point";
import { useEventBus } from "@/models/Composables/useEventBus";
import { defineComponent, ref, onBeforeUnmount } from "@vue/runtime-core";
import { CustomEvenTypes, MouseMoveRelativeEvent } from "@/utils/EventTypes";

export default defineComponent({
  name: "Scale",

  setup() {
    const { register } = useEventBus();
    const mousePosition = ref(new Point(0, 0));

    const eventRegistry = register(CustomEvenTypes.MOUSE_POSITION_UPDATE, (event: MouseMoveRelativeEvent) => {
      mousePosition.value = event.relativeOffset;
    });

    onBeforeUnmount(() => {
        eventRegistry.unregister();
    });

    return {
      mousePosition,
    };
  },
});
</script>

<style>
#coordinates {
  display: block;
  position: absolute;
  bottom: 5px;
  right: 5px;
  text-align: right;
}
</style>