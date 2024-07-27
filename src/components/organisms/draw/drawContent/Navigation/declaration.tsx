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
  title: 'Home',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/',
      icon: HomeOutlinedIcon,
    }
  ]
}

export const pages: MenuGroup = {
  id: 'authentication',
  title: 'Company',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Employee',
      type: 'collapse',
      url: '/employees',
      icon: PeopleAltOutlinedIcon,
      children: [
        {
          id: 'employee2',
          title: 'Official',
          type: 'item',
          url: '/employees/official',
        },
        {
          id: 'employee3',
          title: 'Probationary',
          type: 'item',
          url: '/employees/probationary',
        }
      ]
    },
    {
      id: 'use',
      title: 'Job',
      type: 'item',
      url: '/users',
      icon: WorkOutlineOutlinedIcon,
    }
  ]
}


export const style: MenuGroup = {
  id: 'style',
  title: 'Style',
  type: 'group',
  children: [
    {
      id: 'typography',
      title: 'Typography',
      type: 'collapse',
      url: '/typography',
      icon: TypeSpecimenOutlinedIcon,
      children: [
        {
          id: 'typography1',
          title: 'Heading 1',
          type: 'item',
          url: '/typography/h1',
        },
        {
          id: 'typography2',
          title: 'Heading 2',
          type: 'item',
          url: '/typography/h2',
        }
      ]
    }
  ]
}