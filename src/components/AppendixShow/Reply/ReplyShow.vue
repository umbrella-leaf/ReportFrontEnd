<template>
  <a-comment>
    <template #author>
      <a>{{replyMessage["nickname"]}}</a>
    </template>
    <template #avatar>
      <a-avatar :src="replyMessage['avatar_url']" />
    </template>
    <template #content>
      <template v-for="(component, i) in replyComponents">
        <component v-if="typeof component !== 'string'" :key="`component${i}`" :is="component" />
        <span v-else :key="`component${i}`" v-html="component"/>
      </template>
    </template>
    <template #datetime>
      {{replyMessage["send_time"]}}
    </template>
    <ReplyShow v-if=hasNextLevelReply :reply-chain="replyChain" :reply-id="replyMessage['reply_id']" />
  </a-comment>
</template>


<script setup>

import {computed, ref, watchEffect} from "vue";
import {segment_concat} from "@/utils";

const props = defineProps({
  replyChain: {
    type: Object,
    required: true
  },
  replyId: {
    type: Number,
    required: true
  }
});

const replyMessage = computed(() => props.replyChain[props.replyId]);
const replyComponents = ref([]);
const hasNextLevelReply = computed(() => "reply_id" in replyMessage.value);

watchEffect(async() => {
  replyComponents.value = await segment_concat(replyMessage.value['segments']);
});
</script>

<style scoped>

</style>