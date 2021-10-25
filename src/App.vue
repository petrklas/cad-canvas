<template>
  <div class="app">
    <Menu />
    <Canvas />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Menu  from './components/Menu.vue';
import Canvas  from './components/Canvas.vue';

export default defineComponent({
  name: 'App',
  components: { Menu, Canvas }
});
</script>

<style>

</style>
