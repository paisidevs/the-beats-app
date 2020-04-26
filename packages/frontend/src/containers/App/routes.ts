import { Home, NotFound } from '../../pages';

export const routes: any = [
  {
    exact: true,
    component: Home,
    path: '/',
    title: 'Home',
  },
  {
    path: '*',
    component: NotFound,
  },
];
