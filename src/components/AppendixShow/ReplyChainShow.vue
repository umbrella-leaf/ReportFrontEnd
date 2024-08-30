<template>
  <ReplyShow v-if="replyChain" :reply-id="replyChain['reply_id']" :reply-chain="replyChain" />
</template>

<script setup>
import ReplyShow from "@/components/AppendixShow/ReplyShow.vue";

const prop = defineProps({
  replyChain: {
    type: Object,
  }
});


</script>

<style scoped>

</style>