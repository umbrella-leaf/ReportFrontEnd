<template>
  <a-modal :visible="visible" :title="title" :footer="null" @cancel="cancel" destroy-on-close>
    <div>
      <a-spin :spinning="loading" tip="资源加载中" :indicator="indicator">
        <a-image v-if="isImage" style="width: 100%" :src="url" />
        <video v-else :src="url" controls style="width: 100%;" />
      </a-spin>
    </div>
  </a-modal>
</template>

<script setup>
import {computed, ref, onUpdated, nextTick, h} from "vue";
import {LoadingOutlined} from "@ant-design/icons-vue";

const props = defineProps({
  isImage: {
    type: Boolean,
    default: true,
  },
  visible: {
    type: Boolean,
    default: false
  },
  url: {
    type: String,
    default: ""
  }
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

const title = computed(() => props.isImage ? "查看图片" : "查看视频");

function cancel() {
  emit("close");
}

onUpdated(() => {
  if (props.visible) {
    loading.value = true;
    nextTick(() => {
      const modal = document.getElementsByClassName("ant-modal")[0];
      const resourceType = props.isImage ? 'img' : 'video';
      const resource = modal.getElementsByTagName(resourceType)[0];
      if (resourceType === 'img') {
        resource.onload = () => {
          loading.value = false;
        }
      }
      else {
        resource.oncanplay = () => {
          loading.value = false;
        }
      }
    })
  }
})
</script>

<style scoped>

</style>
