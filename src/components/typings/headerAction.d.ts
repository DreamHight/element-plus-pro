import { type Component } from 'vue';

export interface IHeaderAction {
  icon: string | Component;
  tooltip?: string;
  className?: string;
}