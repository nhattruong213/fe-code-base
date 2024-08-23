'use client';

import { Card, IconButton, Table, TableBody, TableContainer, TableRow, Tooltip } from '@mui/material';

import { CheckBox } from '@/components/atoms/checkbox';
import { Iconify } from '@/components/atoms/iconify';
import { SimpleBarScroll } from '@/components/atoms/simpleBar';
import { TableCell } from '@/components/atoms/table/tableCell';
import { BreadcrumbsNNT } from '@/components/molecules/breadcrumbs';
import { TableHeadNNT } from '@/components/molecules/table/tableHeadNNT';
import { TableNoData } from '@/components/molecules/table/tableNoData';
import { TablePanigationNNT } from '@/components/molecules/table/tablePanigationNNT';
import { TableSelectActionNNT } from '@/components/molecules/table/tableSelectActionNNT';
import { navPaths } from '@/constants/path';

import { UserTableFiltersResult } from './components/tableFilterResult';
import { UserTableToolbar } from './components/useToolbar';
import { useLogic } from './hooks/useLogic';

export const UserList = () => {
  const {
    data,
    header,
    selected,
    page,
    rowsPerPage,
    order,
    orderBy,
    notFound,
    filters,
    roles,
    canReset,
    status,
    onSelectRow,
    onChangeRowsPerPage,
    onSelectAllRows,
    onSort,
    onChangePage,
    handleFilters,
    handleResetFilters,
  } = useLogic();

  return (
    <>
      <BreadcrumbsNNT links={[{ name: 'Home', href: navPaths.dashboard }, { name: 'User', href: navPaths.user.root }, { name: 'List' }]} />
      <Card sx={{ mt: 4 }}>
        <UserTableToolbar statusOptions={status} filters={filters} onFilters={handleFilters} roleOptions={roles} />
        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            onFilters={handleFilters}
            onResetFilters={handleResetFilters}
            results={data.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectActionNNT
            numSelected={selected.length}
            rowCount={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                data.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary">
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />
          <SimpleBarScroll>
            <Table size={'medium'} sx={{ minWidth: 960 }}>
              <TableHeadNNT
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => row.id)
                  )
                }
                rowCount={data.length}
                numSelected={selected.length}
                headLabel={header}
                order={order}
                orderBy={orderBy}
                onSort={onSort}
              />

              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover selected={selected.includes(row.id)} key={row.id}>
                    <TableCell padding="checkbox">
                      <CheckBox checked={selected.includes(row.id)} onClick={() => onSelectRow(row.id)} />
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.company}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.role}</TableCell>
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.status}</TableCell>
                  </TableRow>
                ))}
                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </SimpleBarScroll>
        </TableContainer>
        <TablePanigationNNT
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </>
  );
};
