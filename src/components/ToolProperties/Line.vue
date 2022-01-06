<template>
  <form v-on:submit.prevent="onEnterPress" ref="form">
    <div>
      <u>L</u>ength:
      <input
        type="text"
        v-model="shapeProperties.length"
        ref="lengthsetter"
        @change="lengthSet = true"
      />
    </div>
    <div>
      <u>A</u>ngle:
      <input
        type="text"
        v-model="angle"
        ref="anglesetter"
        @change="angleSet = true"
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
      angle: new Angle(0),
    });

    const lengthsetter = ref();
    const anglesetter = ref();
    const lengthSet = ref(false);
    const angleSet = ref(false);
    const engine = inject<Engine>("engine");

    if(engine === undefined) {
      throw new Error(__filename +':Engine is not defined');
    }

    const handler = engine.handler.eventHandler;
    handler.onShapeChange.subscribe((shape: Line) => {
      shapeProperties.angle = shape.angle;
      shapeProperties.length = shape.length;
      lengthsetter.value.select();
    });

    const angleEventListener = (e: KeyboardEvent) => {
      if (e.key === "a" && (e.altKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.

        anglesetter.value.select();
      }
    };

    const lengthEventListener = (e: KeyboardEvent) => {
      if (e.key === "l" && (e.altKey || e.metaKey)) {
        e.preventDefault(); // present "Save Page" from getting triggered.

        anglesetter.value.select();
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
      lengthSet,
      angleSet,
      lengthsetter,
      anglesetter,
      handler,
    };
  },

  computed: {
    angle: {
      get(): number {
        if (this.shapeProperties.angle !== undefined) {
          return Math.floor(this.shapeProperties.angle.toDeg());
        } else {
          return 0;
        }
      },
      set(val: number | string) {
        if(val != '' && val != '-') {
          this.shapeProperties.angle = angleFromInput(val);
        }
      },
    },
  },

  methods: {
    onEnterPress() {
      let formData: ILineShapeFormProperties = {};
      if (this.lengthSet && this.shapeProperties.length !== undefined) {
        formData.length = this.shapeProperties.length;
      }

      if (this.angleSet && this.shapeProperties.angle !== undefined) {
        formData.angle = this.shapeProperties.angle;
      }

      this.handler.formSubmit(formData);
      this.lengthSet = false;
      this.angleSet = false;
    },
  },
});
</script>