<template>
  <form v-on:submit.prevent="onEnterPress" ref="form">
    <div>
      <u>L</u>ength:
      <input
        type="text"
        v-model="shapeProperties.length"
        ref="lengthsetter"
      />
    </div>
    <div>
      <u>R</u>otation:
      <input
        type="text"
        v-model="rotation"
        ref="rotationsetter"
      />
    </div>
    <button type="submit" v-on:click.prevent="onEnterPress">Set</button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  inject,
  onMounted,
  onUnmounted
} from "@vue/runtime-core";
import { ILineShapeFormProperties } from "@/types/Shape";
import { Angle, angleFromInput } from "@/utils/Math";
import { Line } from "@/models/Shapes/Line";
import Engine from "@/models/Engine";

export default defineComponent({
  setup() {
    const shapeProperties = reactive<ILineShapeFormProperties>({
      length: 0,
      rotation: new Angle(0),
    });

    const lengthsetter = ref();
    const rotationsetter = ref();
    const engine = inject<Engine>("engine");

    if(engine === undefined) {
      throw new Error('Engine is not defined');
    }

    const handler = engine.handler.eventHandler;
    handler.onShapeChange.subscribe((shape: Line) => {
      shapeProperties.rotation = shape.rotation;
      shapeProperties.length = shape.length;
      lengthsetter.value.select();
    });

    const angleEventListener = (e: KeyboardEvent) => {
      if (e.key === "l" && (e.altKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.

        lengthsetter.value.select();
      }
    };

    const lengthEventListener = (e: KeyboardEvent) => {
      if (e.key === "r" && (e.altKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.

        rotationsetter.value.select();
      }
    };

    onMounted(() => {
      document.addEventListener(
        "keydown",
        angleEventListener
      );

      document.addEventListener(
        "keydown",
        lengthEventListener
      );
    });

    onUnmounted(() => {
      document.removeEventListener("keydown", angleEventListener);
      document.removeEventListener("keydown", lengthEventListener);
    });


    return {
      shapeProperties,
      lengthsetter,
      rotationsetter,
      handler,
    };
  },
  
  computed: {
    rotation: {
      get(): number {
        if (this.shapeProperties.rotation !== undefined) {
          return Math.floor(this.shapeProperties.rotation.toDeg());
        } else {
          return 0;
        }
      },
      set(val: number | string) {
        if(val != '' && val != '-') {
          this.shapeProperties.rotation = angleFromInput(val);
          console.log(this.shapeProperties.rotation);
        }
      },
    },
  },

  methods: {
    onEnterPress() {
      let formData: ILineShapeFormProperties = {
        length: this.shapeProperties.length,
        rotation: this.shapeProperties.rotation,
      };
    
      this.handler.formSubmit(formData);
    },
  }
});
</script>