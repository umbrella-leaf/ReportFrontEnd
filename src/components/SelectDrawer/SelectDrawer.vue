<template>
  <a-drawer :visible="visible" :width="400" @close="close" title="条件筛选">
    <a-form :model="conditions" layout="vertical">
      <a-form-item label="开始时间" name="start">
        <a-date-picker
          class="form-input"
          v-model:value="conditions['start']"
          :disabled-date="disabledStartDate"
          show-time
          format="YYYY-MM-DD"
          placeholder="请选择开始时间"
          @openChange="handleStartOpenChange"
        />
      </a-form-item>
      <a-form-item label="结束时间" name="end">
        <a-date-picker
          class="form-input"
          v-model:value="conditions['end']"
          :disabled-date="disabledEndDate"
          show-time
          format="YYYY-MM-DD"
          placeholder="请选择结束时间"
          @openChange="handleEndOpenChange"
        />
      </a-form-item>
      <a-form-item label="昵称" name="nickname">
        <a-select
          v-model:value="conditions['nickname']"
          class="form-input"
          placeholder="请输入昵称"
          allow-clear
          :options="options"
        />
      </a-form-item>
      <a-form-item label="关键字" name="keyword">
        <a-textarea
          v-model:value="conditions['keyword']"
          placeholder="请输入关键字"
          allow-clear
          :auto-size="{minRows: 3}"
        />
      </a-form-item>
    </a-form>
    <a-button style="margin-right: 8px" @click="onReset">重置</a-button>
    <a-button type="primary" @click="onSubmit">提交</a-button>
  </a-drawer>
</template>

<script setup>
import {computed, ref, onUpdated} from "vue";
import {getAllNickNames} from "@/api/reports";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  conditions: {
    type: Object,
    default: () => {}
  }
});

const emit = defineEmits(['close', 'reset', 'submit']);
function close() {
  emit('close');
}
// 日期处理
const startValue = computed(() => props.conditions["start"]);
const endValue = computed(() => props.conditions["end"]);
const endOpen = ref(false);
const disabledStartDate = (startValue) => {
  if (!startValue || !endValue.value) {
    return false;
  }
  
  return startValue.valueOf() > endValue.value.valueOf();
};
const disabledEndDate = (endValue) => {
  if (!endValue || !startValue.value) {
    return false;
  }
  
  return startValue.value.valueOf() >= endValue.valueOf();
};
const handleStartOpenChange = (open) => {
  if (!open) {
    endOpen.value = true;
  }
};
const handleEndOpenChange = (open) => {
  endOpen.value = open;
};

// 昵称选项获取
const options = ref([]);
function getNicknameOptions() {
  getAllNickNames().then(res => {
    options.value = res.data.rows.map(item => ({value: item, label: item}));
  })
}
onUpdated(() => {
  if (props.visible) {
    getNicknameOptions();
  }
})

// 事件上报父组件
function onSubmit() {
  emit('submit');
}
function onReset() {
  emit('reset');
}

</script>

<style scoped lang="less">
.form-input {
  width: 100% !important;
}
</style>
