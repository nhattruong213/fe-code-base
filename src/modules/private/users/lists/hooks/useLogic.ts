import { isEqual } from 'lodash';
import { useCallback, useState } from 'react';

import { useTableNNT } from '@/components/molecules/table/hooks/useTableNNT';
import { getComparator } from '@/components/molecules/table/utils';

import { IUserItem, IUserTableFilters, IUserTableFilterValue } from '../type';

export const useLogic = () => {
  const defaultFilters: IUserTableFilters = {
    name: '',
    role: [],
    status: 'all',
  };

  const header = [
    { id: 'name', label: 'Name' },
    { id: 'company', label: 'Company', width: 180 },
    { id: 'role', label: 'Role', width: 220 },
    { id: 'status', label: 'Status', width: 180 },
  ];

  const data = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      role: 'Quản lý nhân sự',
      company: 'Công ty Lê và Con trai',
      status: 'active',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      role: 'Nhà phân tích dữ liệu',
      company: 'Công ty Hoàng, Minh và Thành',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Phạm Quốc C',
      role: 'Luật sư',
      company: 'Công ty Nam - Hùng',
      status: 'banned',
    },
    {
      id: 4,
      name: 'Đinh Thị D',
      role: 'Thiết kế UX/UI',
      company: 'Công ty Hà, Duy và Thắng',
      status: 'pending',
    },
    {
      id: 5,
      name: 'Lê Văn E',
      role: 'Quản lý dự án',
      company: 'Công ty Lâm Inc',
      status: 'banned',
    },
    {
      id: 6,
      name: 'Ngô Thị F',
      role: 'Quản lý tài khoản',
      company: 'Công ty Dương - Hòa',
      status: 'pending',
    },
    {
      id: 7,
      name: 'Bùi Văn G',
      role: 'Y tá',
      company: 'Công ty Hưng, Phát và Nam',
      status: 'rejected',
    },
    {
      id: 8,
      name: 'Hoàng Thị H',
      role: 'Nhà phân tích kinh doanh',
      company: 'Công ty Long Group',
      status: 'pending',
    },
    {
      id: 9,
      name: 'Vũ Văn I',
      role: 'Giám đốc sáng tạo',
      company: 'Công ty Mạnh, Nam và Phong',
      status: 'banned',
    },
    {
      id: 10,
      name: 'Phan Thị K',
      role: 'Nhà hoạch định tài chính',
      company: 'Công ty Thắng - Hải',
      status: 'pending',
    },
    {
      id: 11,
      name: 'Đoàn Văn L',
      role: 'Điều phối viên sự kiện',
      company: 'Công ty Phúc, Sơn và Dũng',
      status: 'banned',
    },
    {
      id: 12,
      name: 'Đặng Thị M',
      role: 'Giám đốc marketing',
      company: 'Công ty Hiếu và Con trai',
      status: 'pending',
    },
    {
      id: 13,
      name: 'Phùng Văn N',
      role: 'Nhà phát triển phần mềm',
      company: 'Công ty An, Thiên và Huy',
      status: 'active',
    },
    {
      id: 14,
      name: 'Trịnh Thị O',
      role: 'Nhà khoa học nghiên cứu',
      company: 'Công ty Khánh - Cường',
      status: 'pending',
    },
    {
      id: 15,
      name: 'Nguyễn Thị P',
      role: 'Chiến lược gia nội dung',
      company: 'Công ty Minh, Anh và Duy',
      status: 'banned',
    },
    {
      id: 16,
      name: 'Lý Văn Q',
      role: 'Quản lý hoạt động',
      company: 'Công ty Nhật - Thanh',
      status: 'pending',
    },
    {
      id: 17,
      name: 'Trần Thị R',
      role: 'Đại diện bán hàng',
      company: 'Công ty Tâm Inc',
      status: 'banned',
    },
    {
      id: 18,
      name: 'Võ Văn S',
      role: 'Nhà phân tích chuỗi cung ứng',
      company: 'Công ty Huy Inc',
      status: 'pending',
    },
    {
      id: 19,
      name: 'Phan Thị T',
      role: 'Điều phối viên hoạt động',
      company: 'Công ty Tùng và Con trai',
      status: 'rejected',
    },
    {
      id: 20,
      name: 'Ngô Văn U',
      role: 'Nhân viên dịch vụ khách hàng',
      company: 'Công ty Bảo Group',
      status: 'pending',
    },
  ];

  const roles = [...new Set(data.map((item) => item.role))];
  const status = [...new Set(data.map((item) => item.status))];

  const [tableData] = useState(data);
  const [filters, setFilters] = useState(defaultFilters);
  const table = useTableNNT();
  const { selected, page, rowsPerPage, order, orderBy, onSelectRow, onChangeRowsPerPage, onSelectAllRows, onSort, onChangePage, onResetPage } = table;

  const applyFilter = ({
    inputData,
    comparator,
    filters,
  }: {
    inputData: IUserItem[];
    comparator: (a: any, b: any) => number;
    filters: IUserTableFilters;
  }) => {
    const { name, status, role } = filters;

    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;

      return a[1] - b[1]; // giu nguyen
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (name) {
      inputData = inputData.filter((user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }

    if (status !== 'all') {
      inputData = inputData.filter((user) => user.status === status);
    }

    if (role.length) {
      inputData = inputData.filter((user) => role.includes(user.role));
    }

    return inputData;
  };

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filters,
  });

  const canReset = !isEqual(defaultFilters, filters);
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return {
    data: dataFiltered,
    header: header,
    selected,
    page,
    rowsPerPage,
    order,
    orderBy,
    canReset,
    notFound,
    filters,
    roles,
    status,
    onSelectRow,
    onChangeRowsPerPage,
    onSelectAllRows,
    onSort,
    onChangePage,
    handleFilters,
    handleResetFilters,
  };
};
