'use client';

import { alpha } from '@mui/material';
import { isEqual } from 'lodash';
import { useCallback, useState } from 'react';

import { Card } from '@/components/atoms/card';
import { Label } from '@/components/atoms/label';
import { Tab, Tabs } from '@/components/atoms/tabs';
import { BreadcrumbsNNT } from '@/components/molecules/breadcrumbs';
import { DataTableNNT } from '@/components/molecules/table';
import { useTableNNT } from '@/components/molecules/table/hooks/useTableNNT';
import { TableColumnsType } from '@/components/molecules/table/type';
import { navPaths } from '@/constants/path';

import { UserTableFiltersResult } from '../../users/lists/components/tableFilterResult';
import { UserTableToolbar } from '../../users/lists/components/useToolbar';
import { IUserItem, IUserTableFilters, IUserTableFilterValue } from '../../users/lists/type';

export const ProductList = () => {
  const data: IUserItem[] = [
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
  const columns: TableColumnsType<IUserItem>[] = [
    {
      id: 'name',
      label: 'Name',
    },
    { id: 'company', label: 'Company', width: 180, orderBy: false },
    { id: 'role', label: 'Role', width: 220 },
    { id: 'status', label: 'Status', width: 180 },
  ];
  const defaultFilters: IUserTableFilters = {
    name: '',
    role: [],
    status: 'all',
  };
  const table = useTableNNT();
  const roles = [...new Set(data.map((item) => item.role))];
  const [filters, setFilters] = useState(defaultFilters);
  const canReset = !isEqual(defaultFilters, filters);

  const applyFilter = ({ inputData, filters }: { inputData: IUserItem[]; filters: IUserTableFilters }) => {
    const { name, status, role } = filters;

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

  const dataOrder: IUserItem[] = table.applyOrderby<IUserItem>(data);
  const dataFiltered = applyFilter({ inputData: dataOrder, filters });
  const handleFilters = useCallback(
    (name: string, value: IUserTableFilterValue) => {
      table.onResetPage();
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

  const STATUS_OPTIONS = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'banned', label: 'Banned' },
    { value: 'rejected', label: 'Rejected' },
  ];

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  return (
    <>
      <BreadcrumbsNNT links={[{ name: 'Home', href: navPaths.dashboard }, { name: 'Product', href: navPaths.product.root }, { name: 'List' }]} />
      <Card sx={{ mt: 2 }}>
        <Tabs
          value={filters.status}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile={true}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'}
                  color={
                    (tab.value === 'active' && 'success') ||
                    (tab.value === 'pending' && 'warning') ||
                    (tab.value === 'banned' && 'error') ||
                    'default'
                  }
                >
                  {tab.value === 'all' && data.length}
                  {tab.value === 'active' && data.filter((user) => user.status === 'active').length}

                  {tab.value === 'pending' && data.filter((user) => user.status === 'pending').length}
                  {tab.value === 'banned' && data.filter((user) => user.status === 'banned').length}
                  {tab.value === 'rejected' && data.filter((user) => user.status === 'rejected').length}
                </Label>
              }
            />
          ))}
        </Tabs>
        <UserTableToolbar onFilters={handleFilters} filters={filters} roleOptions={roles} />
        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}
        <DataTableNNT rowsPerPageOptions={[5, 10, 25]} panigation={true} columns={columns} items={dataFiltered} {...table} />
      </Card>
    </>
  );
};
