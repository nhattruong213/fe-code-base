'use client';

import { Card, IconButton, Table, TableBody, TableContainer, TableRow, Tooltip } from '@mui/material';
import { useCallback, useState } from 'react';

import { CheckBox } from '@/components/atoms/checkbox';
import { Iconify } from '@/components/atoms/iconify';
import { TableCell } from '@/components/atoms/table/tableCell';
import { BreadcrumbsNNT } from '@/components/molecules/breadcrumbs';
import { TableHeadNNT } from '@/components/molecules/table/tableHeadNNT';
import { TablePanigationNNT } from '@/components/molecules/table/tablePanigationNNT';
import { TableSelectActionNNT } from '@/components/molecules/table/tableSelectActionNNT';
import { navPaths } from '@/constants/path';

export const UserList = () => {
  const TABLE_HEAD = [
    { id: 'name', label: 'Name' },
    { id: 'phoneNumber', label: 'Phone Number', width: 180 },
    { id: 'company', label: 'Company', width: 220 },
    { id: 'role', label: 'Role', width: 180 },
  ];

  const fakeData = [
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'HR Manager',
      email: 'nannie_abernathy70@yahoo.com',
      address: '908 Jack Locks',
      name: 'Jayvion Simon',
      isVerified: true,
      company: 'Lueilwitz and Sons',
      country: 'Andorra',
      avatarUrl: 'undefined/assets/images/avatar/avatar_1.jpg',
      phoneNumber: '365-374-4961',
      status: 'active',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Data Analyst',
      email: 'ashlynn_ohara62@gmail.com',
      address: '908 Jack Locks',
      name: 'Lucian Obrien',
      isVerified: true,
      company: 'Gleichner, Mueller and Tromp',
      country: 'United Arab Emirates',
      avatarUrl: 'undefined/assets/images/avatar/avatar_2.jpg',
      phoneNumber: '904-966-2836',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Legal Counsel',
      email: 'milo.farrell@hotmail.com',
      address: '908 Jack Locks',
      name: 'Deja Brady',
      isVerified: true,
      company: 'Nikolaus - Leuschke',
      country: 'Afghanistan',
      avatarUrl: 'undefined/assets/images/avatar/avatar_3.jpg',
      phoneNumber: '399-757-9909',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'UX/UI Designer',
      email: 'violet.ratke86@yahoo.com',
      address: '908 Jack Locks',
      name: 'Harrison Stein',
      isVerified: false,
      company: 'Hegmann, Kreiger and Bayer',
      country: 'Antigua and Barbuda',
      avatarUrl: 'undefined/assets/images/avatar/avatar_4.jpg',
      phoneNumber: '692-767-2903',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Project Manager',
      email: 'letha_lubowitz24@yahoo.com',
      address: '908 Jack Locks',
      name: 'Reece Chung',
      isVerified: false,
      company: 'Grimes Inc',
      country: 'Anguilla',
      avatarUrl: 'undefined/assets/images/avatar/avatar_5.jpg',
      phoneNumber: '990-588-5716',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Account Manager',
      email: 'aditya_greenfelder31@gmail.com',
      address: '908 Jack Locks',
      name: 'Lainey Davidson',
      isVerified: true,
      company: 'Durgan - Murazik',
      country: 'Albania',
      avatarUrl: 'undefined/assets/images/avatar/avatar_6.jpg',
      phoneNumber: '955-439-2578',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Registered Nurse',
      email: 'lenna_bergnaum27@hotmail.com',
      address: '908 Jack Locks',
      name: 'Cristopher Cardenas',
      isVerified: false,
      company: 'Altenwerth, Medhurst and Roberts',
      country: 'Armenia',
      avatarUrl: 'undefined/assets/images/avatar/avatar_7.jpg',
      phoneNumber: '226-924-4058',
      status: 'rejected',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Business Analyst',
      email: 'luella.ryan33@gmail.com',
      address: '908 Jack Locks',
      name: 'Melanie Noble',
      isVerified: false,
      company: 'Raynor Group',
      country: 'Angola',
      avatarUrl: 'undefined/assets/images/avatar/avatar_8.jpg',
      phoneNumber: '552-917-1454',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Creative Director',
      email: 'joana.simonis84@gmail.com',
      address: '908 Jack Locks',
      name: 'Chase Day',
      isVerified: false,
      company: 'Mraz, Donnelly and Collins',
      country: 'Antarctica',
      avatarUrl: 'undefined/assets/images/avatar/avatar_9.jpg',
      phoneNumber: '285-840-9338',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Financial Planner',
      email: 'marjolaine_white94@gmail.com',
      address: '908 Jack Locks',
      name: 'Shawn Manning',
      isVerified: false,
      company: 'Padberg - Bailey',
      country: 'Argentina',
      avatarUrl: 'undefined/assets/images/avatar/avatar_10.jpg',
      phoneNumber: '306-269-2446',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Event Coordinator',
      email: 'vergie_block82@hotmail.com',
      address: '908 Jack Locks',
      name: 'Soren Durham',
      isVerified: true,
      company: 'Heidenreich, Stokes and Parker',
      country: 'American Samoa',
      avatarUrl: 'undefined/assets/images/avatar/avatar_11.jpg',
      phoneNumber: '883-373-6253',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Marketing Director',
      email: 'vito.hudson@hotmail.com',
      address: '908 Jack Locks',
      name: 'Cortez Herring',
      isVerified: true,
      company: 'Pagac and Sons',
      country: 'Austria',
      avatarUrl: 'undefined/assets/images/avatar/avatar_12.jpg',
      phoneNumber: '476-509-8866',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b13',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Software Developer',
      email: 'tyrel_greenholt@gmail.com',
      address: '908 Jack Locks',
      name: 'Brycen Jimenez',
      isVerified: true,
      company: 'Rempel, Hand and Herzog',
      country: 'Australia',
      avatarUrl: 'undefined/assets/images/avatar/avatar_13.jpg',
      phoneNumber: '201-465-1954',
      status: 'active',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b14',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Research Scientist',
      email: 'dwight.block85@yahoo.com',
      address: '908 Jack Locks',
      name: 'Giana Brandt',
      isVerified: false,
      company: 'Dare - Treutel',
      country: 'Aruba',
      avatarUrl: 'undefined/assets/images/avatar/avatar_14.jpg',
      phoneNumber: '538-295-9408',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Content Strategist',
      email: 'mireya13@hotmail.com',
      address: '908 Jack Locks',
      name: 'Aspen Schmitt',
      isVerified: false,
      company: 'Kihn, Marquardt and Crist',
      country: 'Alland Islands',
      avatarUrl: 'undefined/assets/images/avatar/avatar_15.jpg',
      phoneNumber: '531-492-6028',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b16',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Operations Manager',
      email: 'dasia_jenkins@hotmail.com',
      address: '908 Jack Locks',
      name: 'Colten Aguilar',
      isVerified: false,
      company: 'Nolan - Kunde',
      country: 'Azerbaijan',
      avatarUrl: 'undefined/assets/images/avatar/avatar_16.jpg',
      phoneNumber: '981-699-7588',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Sales Representative',
      email: 'benny89@yahoo.com',
      address: '908 Jack Locks',
      name: 'Angelique Morse',
      isVerified: true,
      company: 'Wuckert Inc',
      country: 'Bosnia and Herzegovina',
      avatarUrl: 'undefined/assets/images/avatar/avatar_17.jpg',
      phoneNumber: '500-268-4826',
      status: 'banned',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b18',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Supply Chain Analyst',
      email: 'dawn.goyette@gmail.com',
      address: '908 Jack Locks',
      name: 'Selina Boyer',
      isVerified: false,
      company: 'Dibbert Inc',
      country: 'Barbados',
      avatarUrl: 'undefined/assets/images/avatar/avatar_18.jpg',
      phoneNumber: '205-952-3828',
      status: 'pending',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b19',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Operations Coordinator',
      email: 'zella_hickle4@yahoo.com',
      address: '908 Jack Locks',
      name: 'Lawson Bass',
      isVerified: false,
      company: 'Goyette and Sons',
      country: 'Bangladesh',
      avatarUrl: 'undefined/assets/images/avatar/avatar_19.jpg',
      phoneNumber: '222-255-5190',
      status: 'rejected',
    },
    {
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20',
      zipCode: '85807',
      state: 'Virginia',
      city: 'Rancho Cordova',
      role: 'Customer Service Associate',
      email: 'avery43@hotmail.com',
      address: '908 Jack Locks',
      name: 'Ariana Lang',
      isVerified: false,
      company: 'Feest Group',
      country: 'Belgium',
      avatarUrl: 'undefined/assets/images/avatar/avatar_20.jpg',
      phoneNumber: '408-439-8033',
      status: 'pending',
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);

  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue) ? selected.filter((value) => value !== inputValue) : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback((checked: boolean, inputValue: string[]) => {
    if (checked) {
      setSelected(inputValue);

      return;
    }

    setSelected([]);
  }, []);

  return (
    <>
      <BreadcrumbsNNT links={[{ name: 'Home', href: navPaths.dashboard }, { name: 'User', href: navPaths.user.root }, { name: 'List' }]} />
      <Card sx={{ mt: 4 }}>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectActionNNT
            numSelected={selected.length}
            rowCount={fakeData.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                fakeData.map((row) => row.id)
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

          <Table size={'medium'} sx={{ minWidth: 960 }}>
            <TableHeadNNT
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  fakeData.map((row) => row.id)
                )
              }
              rowCount={fakeData.length}
              numSelected={selected.length}
              headLabel={TABLE_HEAD}
            />

            <TableBody>
              {fakeData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow hover selected={selected.includes(row.id)} key={row.id}>
                  <TableCell padding="checkbox">
                    <CheckBox checked={selected.includes(row.id)} onClick={() => onSelectRow(row.id)} />
                  </TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.company}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.role}</TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePanigationNNT
          count={fakeData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </>
  );
};
