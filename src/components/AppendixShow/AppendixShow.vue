<template>
  <a-modal :visible="visible" :title="title" :footer="null" @cancel="cancel" destroy-on-close>
    <div>
      <a-spin :spinning="loading" tip="资源加载中" :indicator="indicator">
        <a-image v-if="_type === AppendixType.IMAGE" style="width: 100%" :src="url" />
        <video v-else-if="_type === AppendixType.VIDEO" :src="url" controls style="width: 100%;" />
        <ReplyChainShow v-else-if="_type === AppendixType.REPLY" :reply-chain="replyChain" />
      </a-spin>
    </div>
  </a-modal>
</template>

<script setup>
import {computed, ref, onUpdated, nextTick, h} from "vue";
import {LoadingOutlined} from "@ant-design/icons-vue";
import {AppendixType, get_button_name_from_appendix_type, get_resource_suffix} from "@/utils";
import ReplyChainShow from "@/components/AppendixShow/ReplyChainShow.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    default: ""
  },
})

const loading = ref(false);

// 加载图标
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '24px',
  },
  spin: true,
});

const emit = defineEmits(["close"]);

const _type = computed(() => get_resource_suffix(props.url));

const title = computed(() => get_button_name_from_appendix_type(props.url));

function cancel() {
  emit("close");
}

const replyChain = ref(null);

onUpdated(() => {
  if (props.visible) {
    nextTick(() => {
      const modal = document.getElementsByClassName("ant-modal")[0];
      const resourceType = _type.value;
      if (resourceType === AppendixType.IMAGE) {
        const resource = modal.getElementsByTagName("img")[0];
        resource.onload = () => {
          loading.value = false;
        }
      }
      else if (resourceType === AppendixType.VIDEO) {
        const resource = modal.getElementsByTagName("video")[0];
        resource.oncanplay = () => {
          loading.value = false;
        }
      } else if (resourceType === AppendixType.REPLY) {
        fetch(props.url).then((response) => {
          return response.json()
        }).then((data) => {
          loading.value = false;
          replyChain.value = data;
        })
      }
    })
  }
})
</script>

<style scoped>

</style>
