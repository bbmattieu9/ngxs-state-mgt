export type NzAlignType = 'left' | 'right' | 'center' | null;

export interface ColumnDefinition {
    key: string;
    label: string;
    width?: string;
    nzAlign?: NzAlignType;
  }