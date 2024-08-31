<template>
  <a-comment v-for="(forwardMessage, i) in forwardMessages" :key="`forward${i}`">
    <template #author>
      <a>{{forwardMessage["nickname"]}}</a>
    </template>
    <template #avatar>
      <a-avatar :src="forwardMessage['avatar_url']" />
    </template>
    <template #content>
      <template v-for="(component, j) in forwardComponents[i]">
        <component v-if="typeof component !== 'string'" :key="`component${j}`" :is="component" />
        <span v-else :key="`component${i}`" v-html="component"/>
      </template>
    </template>
  </a-comment>
</template>

<script setup>

import {segment_concat} from "@/utils";
import {ref, watchEffect} from "vue";

const prop = defineProps({
  forwardMessages: {
    type: Array,
    required: true
  }
});

const forwardComponents = ref([]);

watchEffect(async() => {
  forwardComponents.value = [];
  for (let forwardMessage of prop.forwardMessages) {
    forwardComponents.value.push(await segment_concat(forwardMessage['segments']));
  }
});


</script>

<style scoped>

</style>