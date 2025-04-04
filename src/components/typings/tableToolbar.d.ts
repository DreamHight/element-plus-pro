import type { Component } from 'vue';

export interface ITableToolbarProps {
  title?: string;
  showTools?: boolean;
  showAdd?: boolean;
  showDel?: boolean;
  showOperations?: boolean;
  showColumnSetting?: boolean;
}