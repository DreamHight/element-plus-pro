import { type CSSProperties } from 'vue';
import type { PaginationProps } from 'element-plus';

export interface IPagination {
  paginationStyles?: CSSProperties;

  alignment?: 'left' | 'center' | 'right';
}
export type IPaginationProps = IPagination & Partial<PaginationProps>;