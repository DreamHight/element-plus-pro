<template>
  <div>
    <h2 style="font-weight: bold;">分步表单</h2>

    <div style="margin-block: 10px;">
      <el-text>将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。</el-text>
    </div>

    <el-card shadow="never">
      <el-steps
        finish-status="success"
        :active="activeStep"
      >
        <el-step title="填写转账信息" />
        <el-step title="确认转账信息" />
        <el-step title="完成" :status="activeStep === 2 ? 'finish' : 'wait'" />
      </el-steps>

      <QueryFilter
        v-show="activeStep === 0"
        ref="QueryFilterRef1"
        label-position="top"
        separator=""
        :rules="formRules"
        :form-item-data="formItemData1"
        :form-styles="formStyles"
        :show-operate="false"
      >
        <template #prefix="slotProps">
          <span v-if="slotProps.column.prop === 'prop4'">￥</span>
        </template>

        <template #prepend="slotProps">
          <el-select
            v-if="slotProps.column.prop === 'prop2'"
            v-model="paymentMethod"
            style="width: 100px;"
          >
            <el-option label="支付宝" value="zhifubao" />
            <el-option label="微信" value="weixin" />
            <el-option label="银行账户" value="bank" />
          </el-select>
        </template>
      </QueryFilter>

      <div v-if="activeStep === 1" :style="formStyles">
        <el-alert
          title="确认转账后，资金将直接打入对方账户，无法退回。"
          type="warning"
          show-icon
          style="margin-bottom: 20px;"
        />

        <ProDescriptions
          separator=""
          :descriptionsProps="descriptionsProps1"
          :list="descriptionsList1"
        >
          <template #prop4="slotProps">
            <el-space :size="2">
              <span style="font-size: 22px;">{{ slotProps.column.value }}</span>
              <span style="font-size: 12px;">元</span>
            </el-space>
          </template>
        </ProDescriptions>

        <el-divider />

        <QueryFilter
          ref="QueryFilterRef2"
          label-position="top"
          separator=""
          :form-item-data="formItemData2"
          :form-styles="formStyles2"
          :show-operate="false"
        />
      </div>

      <div v-if="activeStep === 2" :style="formStyles">
        <el-result
          icon="success"
          title="操作成功"
          sub-title="预计两小时内到账"
        >
          <template #extra>
            <el-button type="primary" @click="againHandler">再转一笔</el-button>
            <el-button>查看账单</el-button>
          </template>
        </el-result>
      </div>

      <div v-show="activeStep < 2" :style="stepOperateStyles">
        <el-space>
          <el-button v-if="activeStep > 0" @click="prevHandler">上一步</el-button>
          <el-button type="primary" @click="nextHandler">下一步</el-button>
        </el-space>
      </div>

      <div v-if="activeStep === 2" :style="descriptionsStyles">
        <ProDescriptions
          :descriptionsProps="descriptionsProps2"
          :list="descriptionsList2"
        >
          <template #prop4="slotProps">
            <el-space :size="2">
              <span style="font-size: 22px;">{{ slotProps.column.value }}</span>
              <span style="font-size: 12px;">元</span>
            </el-space>
          </template>
        </ProDescriptions>
      </div>

      <el-divider />

      <h3 style="font-weight: bold;">说明</h3>
      <h4 style="font-weight: bold; margin-block: 5px;">转账到支付宝账户</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>

      <h4 style="font-weight: bold; margin-block: 20px 5px;">转账到银行卡</h4>
      <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, type CSSProperties } from 'vue';
import type { IFormItemFieldProps } from '@/components/typings/queryFilter';
import QueryFilter from '@/components/QueryFilter/QueryFilter.vue';
import ProDescriptions from '@/components/ProDescriptions/index.vue';
import type { IDescriptionItemProps } from '@/components/typings/descriptions';
import type { FormInstance, FormRules } from 'element-plus';

const formStyles: CSSProperties = {
  minWidth: '440px',
  width: '440px',
  margin: '40px auto auto',
};
const formStyles2: CSSProperties = {
  minWidth: '440px',
  width: '440px',
  margin: 'auto',
};
const stepOperateStyles: CSSProperties = {
  minWidth: '440px',
  width: '440px',
  margin: '10px auto auto',
};
const descriptionsStyles: CSSProperties = {
  width: '500px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: 'var(--el-fill-color-light)',
};

const QueryFilterRef1 = ref();
const formItemData1 = reactive<IFormItemFieldProps[]>([
  {
    prop: 'prop1',
    label: '付款账户',
    formItemProps: {
      required: true,
    },
    fieldProps: {
      componentType: 'select',
      valueEnum: [
        {
          label: 'element-plus-pro@qq.com',
          value: 'element-plus-pro@qq.com',
        },
      ],
      initialValue: 'element-plus-pro@qq.com',
    },
  },
  {
    prop: 'prop2',
    label: '收款账户',
    fieldSlot: true,
    formItemProps: {
      required: true,
    },
    fieldProps: {
      initialValue: 'test@example.com',
    },
  },
  {
    prop: 'prop3',
    label: '收款人姓名',
    formItemProps: {
      required: true,
    },
    fieldProps: {
      initialValue: 'Alex',
    },
  },
  {
    prop: 'prop4',
    label: '转账金额',
    fieldSlot: true,
    formItemProps: {
      required: true,
    },
    fieldProps: {
      componentType: 'input-number',
      componentProps: {
        controlsPosition: 'right',
        min: 0,
      },
      initialValue: 500,
    },
  },
]);
interface RuleForm1 {
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
}
const formRules = reactive<FormRules<RuleForm1>>({
  prop1: [
    { required: true, message: '请选择付款账户', trigger: 'blur' },
  ],
  prop2: [
    { required: true, message: '请输入收款人账户', trigger: 'blur' },
  ],
  prop3: [
    { required: true, message: '请输入收款人姓名', trigger: 'blur' },
  ],
  prop4: [
    { required: true, message: '请输入转账金额', trigger: 'blur' },
  ],
});

const descriptionsList1 = reactive<IDescriptionItemProps>([]);
const descriptionsList2 = reactive<IDescriptionItemProps>([]);
const descriptionsProps1 = {
  column: 1,
  border: true,
};
const descriptionsProps2 = {
  column: 1,
};
function setDescriptionData(): void {
  const fields = QueryFilterRef1.value.getFields();
  descriptionsList1.length = 0;
  descriptionsList2.length = 0;
  let itemJson = null;
  formItemData1.forEach(item => {
    itemJson = {
      prop: item.prop,
      label: item.label,
      value: fields[item.prop],
      valueSlot: item.prop,
    };
    descriptionsList1.push(itemJson);

    itemJson = {
      prop: item.prop,
      label: item.label,
      value: fields[item.prop],
      valueSlot: item.prop,
      labelStyles: {
        textAlignLast: 'justify', width: '70px'
      },
    };
    descriptionsList2.push(itemJson);
  });
}
const QueryFilterRef2 = ref();
const formItemData2 = reactive<IFormItemFieldProps[]>([
  {
    prop: 'password',
    label: '支付密码',
    formItemProps: {
      required: true,
      rules: [
        { required: true, message: '需要支付密码才能进行支付' },
      ]
    },
    fieldProps: {
      componentType: 'password',
    },
  },
]);
const paymentMethod = ref<string>('zhifubao');

const activeStep = ref(0);
function againHandler(): void {
  activeStep.value = 0;
}
function prevHandler(): void {
  if (activeStep.value-- <= 0) {
    activeStep.value = 0;
  }
}
function nextHandler(): void {
  if(activeStep.value === 0) {
    const formEl: FormInstance = QueryFilterRef1.value.getFormEl();
    formEl.validate((valid) => {
      if (valid) {
        if (activeStep.value++ > 2) {
          activeStep.value = 0;
        }

        if(activeStep.value === 1) {
          setDescriptionData();
        }
        console.log('submit!');
      } else {
        console.log('error submit!');
      }
    });
  } else if (activeStep.value === 1) {
    const formEl: FormInstance = QueryFilterRef2.value.getFormEl();
    formEl.validate((valid) => {
      if (valid) {
        if (activeStep.value++ > 2) {
          activeStep.value = 0;
        }
        console.log('submit!', activeStep.value);
      } else {
        console.log('error submit!');
      }
    });
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-input-number .el-input__inner) {
  text-align: left;
}
:deep(.el-input-group__prepend) {
  background-color: var(--el-fill-color-blank);
}
</style>