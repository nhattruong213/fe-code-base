export type UseTableProps = {
  defaultOrder?: 'asc' | 'desc';
  defaultOrderBy?: string;
  defaultSelected?: string[];
  defaultRowsPerPage?: number;
  defaultCurrentPage?: number;
};

export type HeaderLabelItem = {
  id: string;
  label: string;
  orderBy?: boolean;
  width?: number;
  align?: 'center' | 'left' | 'right' | 'inherit' | 'justify';
  minWidth?: number;
};
