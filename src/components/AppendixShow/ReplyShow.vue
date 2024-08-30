<template>
  <a-comment>
    <template #author>
      <a>{{replyMessage["nickname"]}}</a>
    </template>
    <template #avatar>
      <a-avatar :src="replyMessage['avatar_url']" />
    </template>
    <template #content>
      <p v-html="segment_concat(replyMessage['segments'])"></p>
    </template>
    <template #datetime>
      {{replyMessage["send_time"]}}
    </template>
    <ReplyShow v-if=hasNextLevelReply :reply-chain="replyChain" :reply-id="replyMessage['reply_id']" />
  </a-comment>
</template>


<script setup>

import {computed} from "vue";
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
const hasNextLevelReply = computed(() => "reply_id" in replyMessage.value);
</script>

<style scoped>

</style>