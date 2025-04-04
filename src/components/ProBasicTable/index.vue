<template>
  <el-table
    ref="TableRef"
    :header-cell-style="headerCellStyle"
    v-bind="$attrs"
  >
    <el-table-column
      v-if="showSerialNumber"
      prop="index"
      label="序号"
      type="index"
      width="55"
      align="center"
      v-bind="indexColumnProps"
    >
      <template #default="scope">
        <TableSerialNumber
          :serial-number="scope.$index + 1"
          v-bind="tableSerialNumberProps"
        />
      </template>
    </el-table-column>

    <template v-for="column in columns" :key="column.prop">
      <el-table-column
        v-if="column.headerSlotName"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #header>
          <slot :name="column.headerSlotName" v-bind="column">
            <span>{{ column.label }}</span>
          </slot>
        </template>

        <template #default="scope">
          <slot :name="column.columnSlotName" v-bind="{row: scope.row, column: scope.column}">
            <span>{{ scope.row[column.prop] }}</span>
          </slot>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.columnSlotName"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <slot :name="column.columnSlotName" v-bind="{row: scope.row, column: scope.column}">
            <span>{{ scope.row[column.prop] }}</span>
          </slot>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="column.copyable"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <ClipBoard
            :text="typeof(column.renderContent) === 'function'
              ? column.renderContent(scope.row, scope.column)
              : scope.row[column.prop]"
            :clipboard-styles="clipboardStyles"
          />
          {{ typeof(column.renderContent) === 'function'
            ? column.renderContent(scope.row, scope.column)
            : scope.row[column.prop] }}
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="column.progressSlotProps"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <el-progress
            v-if="column.progressSlotProps.format"
            :status="
              typeof(column.renderProgressStatus) === 'function'
                ? column.renderProgressStatus(scope.row, scope.column, scope.$index)
                : (column.progressSlotProps.status || 'success')
            "
            :percentage="scope.row[column.prop]"
            v-bind="column.progressSlotProps"
          />
          <el-progress
            v-else
            :status="
              typeof(column.renderProgressStatus) === 'function'
                ? column.renderProgressStatus(scope.row, scope.column, scope.$index)
                : (column.progressSlotProps.status || 'success')
            "
            :percentage="scope.row[column.prop]"
            v-bind="column.progressSlotProps"
          >
            <component
              v-if="typeof(column.render) === 'function'"
              :is="column.render(scope.row, scope.column)"
            />
            <span v-else>
              {{ typeof(column.renderContent) === 'function'
                ? column.renderContent(scope.row, scope.column)
                : scope.row[column.prop] + '%' }}
            </span>
          </el-progress>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.rateSlotProps"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <el-rate
            :model-value="scope.row[column.prop]"
            v-bind="column.rateSlotProps"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.badgeSlotProps"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <el-badge
            is-dot
            badge-style="width: 10px; height: 10px;"
            :offset="[10, -0.5]"
            :type="
              typeof(column.renderBadgeStatus) === 'function'
                ? column.renderBadgeStatus(scope.row, scope.column, scope.$index)
                : (column.badgeSlotProps.type || 'danger')
            "
            v-bind="column.badgeSlotProps"
          >
            <span></span>
          </el-badge>

          <component
            v-if="typeof(column.render) === 'function'"
            style="display: inline-block; margin-left: 20px;"
            :is="column.render(scope.row, scope.column)"
          />
          <span v-else style="display: inline-block; margin-left: 20px;">
            {{ typeof(column.renderContent) === 'function'
              ? column.renderContent(scope.row, scope.column)
              : scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.dotSlotProps"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <PulseDot
            style="display: inline-block;"
            :type="
              typeof(column.renderDotStatus) === 'function'
                ? column.renderDotStatus(scope.row, scope.column, scope.$index)
                : (column.dotSlotProps.type || 'danger')
            "
            :show-halo="
              typeof(column.renderDotHalo) === 'function'
                ? column.renderDotHalo(scope.row, scope.column, scope.$index)
                : column.dotSlotProps.showHalo
            "
            v-bind="column.dotSlotProps"
          />

          <component
            v-if="typeof(column.render) === 'function'"
            style="display: inline-block; margin-left: 8px;"
            :is="column.render(scope.row, scope.column)"
          />
          <span v-else style="display: inline-block; margin-left: 8px;">
            {{ typeof(column.renderContent) === 'function'
              ? column.renderContent(scope.row, scope.column)
              : scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.tagSlotProps"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <el-tag
            :type="
              typeof(column.renderTagStatus) === 'function'
                ? column.renderTagStatus(scope.row, scope.column, scope.$index)
                : (column.tagSlotProps.type || 'primary')
            "
            v-bind="column.tagSlotProps"
          >
            <component
              v-if="typeof(column.render) === 'function'"
              :is="column.render(scope.row, scope.column)"
            />
            <span v-else>
              {{ typeof(column.renderContent) === 'function'
                ? column.renderContent(scope.row, scope.column)
                : scope.row[column.prop] }}
            </span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="column.avatarGroupSlotProps"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <avatar-group
            :avatarGroup="scope.row[column.prop]"
            v-bind="column.avatarGroupSlotProps"
          />
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="column.render"
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      >
        <template #default="scope">
          <component
            v-if="typeof(column.render) === 'function'"
            :is="column.render(scope.row, scope.column)"
          />
          <span v-else>
            {{ typeof(column.renderContent) === 'function'
              ? column.renderContent(scope.row, scope.column)
              : scope.row[column.prop] + '%' }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        v-else-if="column.prop === 'operation'"
        prop="operation"
        label="操作"
        width="130"
        fixed="right"
        v-bind="operationColumnProps"
      >
        <template #default="scope">
          <TableOperation
            @command="commandHandler($event, scope.row, scope.column, scope.$index)"
            v-bind="tableOperationProps"
          />
        </template>
      </el-table-column>

      <el-table-column
        v-else
        :prop="column.prop"
        :label="column.label"
        :column-key="column.prop"
        v-bind="column.columnProps"
      />
    </template>

    <!-- <el-table-column
      v-if="showOperation"
      prop="operation"
      label="操作"
      width="130"
      fixed="right"
      v-bind="operationColumnProps"
    >
      <template #default="scope">
        <TableOperation
          @command="commandHandler($event, scope.row, scope.column, scope.$index)"
          v-bind="tableOperationProps"
        />
      </template>
    </el-table-column> -->

    <template #empty>
      <el-empty />
    </template>

    <template
      v-for="(_slotContent, slotName) in slots"
      :key="slotName"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots, type CSSProperties, type PropType, type Slots } from 'vue';
import type { TableColumnCtx, TableInstance } from 'element-plus';
import type { IColumn } from '../typings/table';
import ClipBoard from '../ClipBoard/ClipBoard.vue';
import TableOperation from '../TableOperation/TableOperation.vue';
import type { ITableOperation, ITableOperationProps } from '../typings/tableOperation';
import TableSerialNumber from '../TableSerialNumber/TableSerialNumber.vue';
import type { ITableSerialNumberProps } from '../typings/tableSerialNumber';
import AvatarGroup from '../AvatarGroup/AvatarGroup.vue';
import PulseDot from '../PulseDot/PulseDot.vue';

const slots: Slots = useSlots();

// defineProps and defineEmits start
const props = defineProps({
  columns: {
    type: Array as () => IColumn[],
    default: () => [],
    validator: (val: IColumn[]) => {
      return Array.isArray(val);
    }
  },

  showSerialNumber: {
    type: Boolean,
  },
  indexColumnProps: {
    type: Object as PropType<Partial<TableColumnCtx<any>>>,
    default: () => ({}),
  },
  tableSerialNumberProps: {
    type: Object as PropType<ITableSerialNumberProps>,
    default: () => ({}),
  },

  showOperation: {
    type: Boolean,
  },
  operationColumnProps: {
    type: Object as PropType<Partial<TableColumnCtx<any>>>,
    default: () => ({}),
  },
  tableOperationProps: {
    type: Object as PropType<ITableOperationProps>,
    default: () => ({}),
  },
});
const emits = defineEmits(['operate']);
// defineProps and defineEmits end

const TableRef = ref<TableInstance>();

const headerCellStyle: CSSProperties = {
  fontSize: '15px',
  paddingBlock: '12px',
  color: 'var(--el-text-color-regular)',
  backgroundColor: 'var(--el-fill-color-light)',
};
const clipboardStyles: CSSProperties = {
  transform: 'translateY(3px)',
}

function commandHandler(item: ITableOperation, row: any, column: any, index: number): void {
  emits('operate', item, row, column, index);
}

onMounted(() => {
  console.log('tableOper=====ationProps1', props.operationColumnProps);
})

function getRef() {
  return TableRef.value;
}
// 暴露ref调用的方法 start
defineExpose({
  getRef: getRef,
});
// 暴露ref调用的方法 end
</script>

<style lang="scss" scoped>
:deep(.el-rate .el-rate__icon) {
  margin-right: 0;
}
:deep(.el-badge__content--primary.is-dot) {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid var(--el-color-primary);
    border-radius: 50%;
    animation: processing 1.2s ease-in-out infinite both;
  }
}
@keyframes processing {
  0%{
    transform: scale(0.8);
    opacity: 0.5;
  }
  100%{
    transform: scale(2.4);
    opacity: 0;
  }
}
</style>