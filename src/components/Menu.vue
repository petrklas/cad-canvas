<template>
    <ul>
       <li v-for="item in menuItems" :key="item.name" v-on:click="item.action">{{item.name}}</li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "@vue/runtime-core";
import IMenuItem from '../types/IMenuItem';

export default defineComponent({
    setup() {
        const menuItems = ref<IMenuItem[]>([
            {name: 'Item 1', action: () => console.log('item1')},
            {name: 'Item 2', action: () => console.log('item2')}
        ]);

        return {menuItems};
        
    }
})


</script>