const routes = [
  {
    name: 'index',
    path: '/',
    component: () => import('./view/index.vue'),
  },
  {
    name: 'detail',
    path: '/detail/:id',
    component: () => import('./view/detail.vue'),
  }
];

export default routes;
