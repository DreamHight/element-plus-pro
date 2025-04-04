<template>
  <el-space
    :size="20"
    direction="vertical"
    alignment="stretch"
    class="w-full"
  >
    <ProDescriptions :list="list1" style="margin-bottom: 15px;">
      <template #title>
        <div style="font-weight: bold; font-size: 20px;">单号：234231029431</div>
      </template>
      <template #extra>
        <el-space>
          <el-button-group>
            <el-button>操作一</el-button>
            <el-button>操作二</el-button>
            <el-button icon="MoreFilled" style="position: relative;" @click="showClick">
              <el-dropdown ref="dropdown1" :teleported="false" style="position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;">
                <div style="width: 50px;"></div>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>选项一</el-dropdown-item>
                    <el-dropdown-item>选项二</el-dropdown-item>
                    <el-dropdown-item>选项三</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-button>
          </el-button-group>
          <el-button type="primary">主操作</el-button>
        </el-space>
      </template>
    </ProDescriptions>

    <el-card shadow="never">
      <template #header>
        <div style="font-weight: bold; font-size: 20px;">流程进度</div>
      </template>

      <el-steps finish-status="success" :active="2" align-center>
        <el-step title="创建项目">
          <template #icon>
            <div style="width: 12px; height: 12px; background-color: var(--el-color-success); border-radius: 50%;" />
          </template>
          <template #description>
            <div>曲丽丽</div>
            <div>2016-12-12 12:32</div>
          </template>
        </el-step>
        <el-step title="部门初审">
          <template #icon>
            <div style="width: 14px; height: 14px; background-color: var(--el-color-success); border-radius: 50%;" />
          </template>
          <template #description>
            <div>周毛毛</div>
            <el-text type="primary" style="cursor: pointer;">催一下</el-text>
          </template>
        </el-step>
        <el-step title="财务审核">
          <template #icon>
            <div style="width: 12px; height: 12px; background-color: #ccc; border-radius: 50%;" />
          </template>
        </el-step>
        <el-step title="完成">
          <template #icon>
            <div style="width: 12px; height: 12px; background-color: #ccc; border-radius: 50%;" />
          </template>
        </el-step>
      </el-steps>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div style="font-weight: bold; font-size: 20px;">用户信息</div>
      </template>

      <ProDescriptions :list="list1" style="margin-bottom: 30px;" />

      <ProDescriptions :descriptionsProps="descriptionsProps2" :list="list2" />

      <div style="font-weight: bold;margin-top: 30px; margin-bottom: 15px;">信息组</div>
      <el-card shadow="never">
        <template #header>
          <div style="font-weight: bold; font-size: 20px;">多层级信息组</div>
        </template>

        <ProDescriptions :descriptionsProps="descriptionsProps3" :list="list2" />

        <el-divider />

        <ProDescriptions :descriptionsProps="descriptionsProps3" :list="list2" />

        <el-divider />

        <ProDescriptions :descriptionsProps="descriptionsProps3" :list="list2" />
      </el-card>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div>用户近半年来电记录</div>
      </template>

      <el-empty />
    </el-card>

    <div
      style="
        background-color: var(--el-bg-color-overlay);
        border: 1px solid var(--el-border-color-light);
        border-radius: 4px;
        color: var(--el-text-color-primary);
        overflow: hidden;
        transition: var(--el-transition-duration);
      "
    >
      <el-tabs
        v-model="activeName"
        style="padding: 18px 20px;"
        @tab-click="handleClick"
      >
        <el-tab-pane label="操作日志一" name="first" style="padding-block: 10px;">
          <ProBasicTable :columns="columns" :data="tableData1" />
        </el-tab-pane>
        <el-tab-pane label="操作日志二" name="second" style="padding-block: 10px;">
          <ProBasicTable :columns="columns" :data="tableData2" />
        </el-tab-pane>
        <el-tab-pane label="操作日志三" name="third" style="padding-block: 10px;">
          <ProBasicTable :columns="columns" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-space>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import ProDescriptions from '@/components/ProDescriptions/index.vue';
import ProBasicTable from '@/components/ProBasicTable/index.vue';
import type { IDescriptionItemProps } from '@/components/typings/descriptions';
import type { DropdownInstance, TabsPaneContext } from 'element-plus';
import type { IColumn } from '@/components/typings/table';

const dropdown1 = ref<DropdownInstance>()
function showClick() {
  if (!dropdown1.value) return
  dropdown1.value.handleOpen()
}

const list1 = reactive<IDescriptionItemProps>([
  {
    label: '用户姓名',
    prop: 'prop1',
    value: '付小小',
  },
  {
    label: '会员卡号',
    prop: 'prop2',
    value: '32943898021309809423',
  },
  {
    label: '身份证',
    prop: 'prop3',
    value: '3321944288191034921',
  },
  {
    label: '联系方式',
    prop: 'prop4',
    value: '18112345678',
  },
  {
    label: '联系地址',
    prop: 'prop5',
    value: '曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口',
  },
]);

const descriptionsProps2 = {
  title: '信息组',
};
const list2 = reactive<IDescriptionItemProps>([
  {
    label: '某某数据',
    prop: 'prop1',
    value: '725',
  },
  {
    label: '该数据更新时间',
    prop: 'prop2',
    value: '2017-08-08',
  },
  {
    label: '某某数据',
    prop: 'prop3',
    value: '725',
  },
  {
    label: '该数据更新时间',
    prop: 'prop4',
    value: '2017-08-08',
  },
]);

const descriptionsProps3 = {
  title: '组名称',
};

const activeName = ref('first')
function handleClick(tab: TabsPaneContext, event: Event) {
  console.log(tab, event)
}
const columns = reactive<IColumn[]>([
  {
    prop: 'prop1',
    label: '操作类型',
  },
  {
    prop: 'prop2',
    label: '操作人',
  },
  {
    prop: 'prop3',
    label: '执行结果',
  },
  {
    prop: 'prop4',
    label: '备注',
  },
]);
const tableData1 = ref([
  {
    prop1: '订购关系生效',
    prop2: '曲丽丽',
    prop3: '成功',
    prop4: '2017-10-03 19:23:12',
    prop5: '-',
  },
  {
    prop1: '财务复审',
    prop2: '付小小',
    prop3: '驳回',
    prop4: '2017-10-03 19:23:12',
    prop5: '不通过原因',
  },
  {
    prop1: '部门初审',
    prop2: '周毛毛',
    prop3: '成功',
    prop4: '2017-10-03 19:23:12',
    prop5: '-',
  },
  {
    prop1: '提交订单',
    prop2: '林东东',
    prop3: '成功',
    prop4: '2017-10-03 19:23:12',
    prop5: '很棒',
  },
  {
    prop1: '创建订单',
    prop2: '汗牙牙',
    prop3: '成功',
    prop4: '2017-10-03 19:23:12',
    prop5: '-',
  },
]);
const tableData2 = ref([
  {
    prop1: '订购关系生效',
    prop2: '曲丽丽',
    prop3: '成功',
    prop4: '2017-10-03 19:23:12',
    prop5: '-',
  },
]);
</script>