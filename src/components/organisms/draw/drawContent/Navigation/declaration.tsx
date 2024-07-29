import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';

export type MenuGroup = {
  id: string;
  title: string;
  type: 'group';
  children: MenuItem[];
};

export type MenuItem = {
  id: string;
  title: string;
  type: 'item' | 'collapse';
  url: string;
  icon?: React.ElementType;
  target?: boolean;
  external?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
};

export const dashboard: MenuGroup = {
  id: 'group-dashboard',
  title: 'home',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'dashboard',
      type: 'item',
      url: '/',
      icon: HomeOutlinedIcon,
    },
  ],
};

export const pages: MenuGroup = {
  id: 'authentication',
  title: 'company',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'employee',
      type: 'collapse',
      url: '/employees',
      icon: PeopleAltOutlinedIcon,
      children: [
        {
          id: 'employee2',
          title: 'official',
          type: 'item',
          url: '/employees/official',
        },
        {
          id: 'employee3',
          title: 'probationary',
          type: 'item',
          url: '/employees/probationary',
        },
      ],
    },
    {
      id: 'use',
      title: 'job',
      type: 'item',
      url: '/users',
      icon: WorkOutlineOutlinedIcon,
    },
  ],
};

export const style: MenuGroup = {
  id: 'style',
  title: 'style',
  type: 'group',
  children: [
    {
      id: 'typography',
      title: 'typography',
      type: 'collapse',
      url: '/typography',
      icon: TypeSpecimenOutlinedIcon,
      children: [
        {
          id: 'typography1',
          title: 'heading1',
          type: 'item',
          url: '/typography/h1',
        },
        {
          id: 'typography2',
          title: 'heading2',
          type: 'item',
          url: '/typography/h2',
        },
      ],
    },
  ],
};
