<template>
  <canvas
    ref="mainCanvas"
    v-on:mousemove="draw"
    v-on:mousedown="handleEvent"
    @keydown.esc="escHandle"
    width="1000"
    height="800"
    style="border: 1px solid black"
  />
  {{ text }}
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from "@vue/runtime-core";
import Mouse from "../models/Mouse";
import LinePath from "../models/LinePath";
import Engine from "../models/Engine";
import IPoint from "@/types/IPoint";

export default defineComponent({
  setup() {
    const mainCanvas = ref<HTMLCanvasElement | null>(null);
    let context = ref<CanvasRenderingContext2D | null>(null);
    let text = ref<string>("");
    let engine = ref<Engine | null>(null);
    let mouse = new Mouse(0, 0);
    let line: LinePath = new LinePath();
    let lineBegan = false;
    let previousPoint = { x: 0, y: 0 };

    onMounted(() => {
      context.value = mainCanvas.value!.getContext("2d");
    });

    return {
      mainCanvas,
      context,
      mouse,
      line,
      lineBegan,
      previousPoint,
      engine,
      text,
    };
  },

  methods: {
    clearCanvas() {
      if (this.context !== null && this.mainCanvas !== null) {
        this.context.clearRect(
          0,
          0,
          this.mainCanvas.width,
          this.mainCanvas.height
        );
      }
    },

    updateCoordinates(event: any) {
      this.mouse.x = event.offsetX;
      this.mouse.y = event.offsetY;
    },

    handleEvent(event: Event) {
      this.line.handleEvent(event);
    },

    escHandle(event: Event) {
      if (this.engine !== null) {
        this.engine.addPath(this.line);
        this.line = new LinePath();
      }
    },

    draw(event: any) {
      this.updateCoordinates(event);
      this.clearCanvas();

      console.log(this.engine);
      if (this.context !== null) {
        for (let edge of this.line.edges) {
          if (
            edge.x - 10 < this.mouse.x &&
            this.mouse.x < edge.x + 10 &&
            edge.y - 10 < this.mouse.y &&
            this.mouse.y < edge.y + 10
          ) {
            this.text = "edge detected";

            break;
          } else {
            this.text = "";
          }
        }

        //this.text = this.text + this.line.edges;
        if(this.engine) {
          this.engine.render();
        }
        
        this.line.draw(this.context);
        this.context.moveTo(
          this.line.previousPoint.x,
          this.line.previousPoint.y
        );
        this.context.lineTo(this.mouse.x, this.mouse.y);

        this.context.stroke();
      }
    },
  },
  mounted() {
    window.addEventListener("keyup", (event) => {
      // If  ESC key was pressed...
      if (event.key === "Escape") {
        this.escHandle(event);
      }
    });

    if (this.context !== null) {
        this.engine = new Engine(this.context);
    }
  },
});
</script>