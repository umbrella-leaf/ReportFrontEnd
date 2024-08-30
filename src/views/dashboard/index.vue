<template>
  <page-container>
    <a-table
      bordered
      class="ant-table-striped"
      :scroll="{x: 500, y: 450}"
      :row-key="(record) => record.id"
      :columns="columns"
      :data-source="data"
      :loading="loading"
      :row-class-name="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
      :pagination="paginationOpt">
      <template #customTitle>
        附件
        <a-button type="link" class="select-btn" @click="showSelectDrawer">筛选</a-button>
      </template>
      <template #avatar="{text: avatar_url}">
        <a-avatar :src="avatar_url"></a-avatar>
      </template>
      <template #nickname="{text}">
        <a>{{ text }}</a>
      </template>
      <template #message="{text}">
        <span v-html="parse_emoji(text)" />
      </template>
      <template #appendix="{text: appendices}">
        <span v-for="appendix in appendices">
          <a-button type="link" @click="showAppendix(appendix)">
            {{get_button_name_from_appendix_type(appendix)}}
          </a-button>&nbsp;
        </span>
      </template>
    </a-table>
    <AppendixShow
      :visible="appendixVisible"
      :url="appendixUrl"
      @close="closeAppendix"
    />
    <SelectDrawer
      :visible="selectDrawerVisible"
      :conditions="conditions"
      @close="closeSelectDrawer"
      @reset="resetConditions"
      @submit="submitCondition"
    />
  </page-container>
</template>

<script setup>
import {ref} from "vue";
import {getReportsByCond} from "@/api/reports";
import AppendixShow from "@/components/AppendixShow/AppendixShow.vue";
import SelectDrawer from "@/components/SelectDrawer/SelectDrawer.vue";
import {AppendixType, get_button_name_from_appendix_type, parse_emoji} from "@/utils";

const conditions = ref({
  start: undefined,
  end: undefined,
  nickname: undefined,
  keyword: undefined,
})

const prevPageSize = ref(10);

const paginationOpt = ref({
  current: 1,
  defaultPageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ["10", "20", "50"],
  showTotal: (total) => `共 ${total} 条`,
  onShowSizeChange: (current, pageSize) => {
    prevPageSize.value = paginationOpt.value.defaultPageSize;
    paginationOpt.value.current = 1;
    paginationOpt.value.defaultPageSize = pageSize;
    getDataList();
  },
  onChange: (current, size) => {
    if (size !== prevPageSize.value) {
      prevPageSize.value = size;
      return;
    }
    paginationOpt.value.current = current;
    paginationOpt.value.defaultPageSize = size;
    getDataList();
  }
});

const data = ref([]);
const loading = ref(false);

const columns = [
  {
    title: '头像',
    dataIndex: 'avatar_url',
    key: 'avatar',
    width: '10%',
    slots: { customRender: 'avatar' },
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
    width: '15%',
    slots: { customRender: 'nickname' },
  },
  {
    title: '信息内容',
    dataIndex: 'message',
    key: 'message',
    width: '30%',
    slots: {customRender: 'message'}
  },
  {
    title: '发送时间',
    dataIndex: 'send_time',
    key: 'send_time',
    width: '20%'
  },
  {
    dataIndex: 'appendix',
    key: 'appendix',
    width: '25%',
    slots: { title: 'customTitle', customRender: 'appendix'},
  }
];

function getDataList(select = false) {
  if (select) {
    paginationOpt.value.current = 1;
  }
  const {current, defaultPageSize} = paginationOpt.value;
  const query = {page: current, size: defaultPageSize};
  const parameters = conditions.value;
  loading.value = true;
  getReportsByCond(parameters, query).then(res => {
    const rows = res.data.rows;
    rows.forEach(row => {
      if (row["appendix"].length === 0) return;
      row["appendix"] = row["appendix"].split(" ");
    });
    data.value = rows;
    paginationOpt.value.total = res.data.total;
    loading.value = false;
  })
    .catch(error => console.log(error));
}
// 附件查看框
const appendixVisible = ref(false);
const appendixUrl = ref("")

function showAppendix(url) {
  appendixVisible.value = true;
  appendixUrl.value = url;
}
function closeAppendix() {
  appendixVisible.value = false;
}
getDataList();

// 条件筛选drawer
const selectDrawerVisible = ref(false);
function showSelectDrawer() {
  selectDrawerVisible.value = true;
}
function closeSelectDrawer() {
  selectDrawerVisible.value = false;
}
function resetConditions() {
  for (let key of Object.keys(conditions.value)) {
    conditions.value[key] = undefined;
  }
}
function submitCondition() {
  getDataList(true);
}

</script>

<style scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: rgba(230, 230, 230, 0.5);
}
:deep(table) tbody tr:hover>td {
  background-color: #e6f7ff !important;
}
:deep(.ant-btn) {
  padding: 0;
}
.select-btn {
  float: right;
  padding: 0;
  height: 23px
}
</style>
