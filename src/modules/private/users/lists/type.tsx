export type IUserItem = {
  id: string | number;
  name: string;
  role: string;
  status: string;
  company: string;
};

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

export type IUserTableFilterValue = string | string[];
