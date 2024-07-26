import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

export const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: HomeOutlinedIcon,
    }
  ]
}

export const pages = {
  id: 'authentication',
  title: 'Company',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Employee',
      type: 'item',
      url: '/',
      icon: PeopleAltOutlinedIcon,
      target: true
    },
    {
      id: 'use',
      title: 'User',
      type: 'item',
      url: '/',
      icon: PeopleAltOutlinedIcon,
      target: true
    }
  ]
}