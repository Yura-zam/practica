import { createRouter, createWebHistory } from 'vue-router';

import CatalogPage from '@/components/CatalogPage.vue';
import AboutPage from '@/components/AboutPage.vue';
import AccountPage from '@/components/AccountPage.vue';
const routes = [
  { path: '/', redirect: '/catalog' },
  { path: '/catalog', name: 'CatalogPage', component: CatalogPage },
  { path: '/about', name: 'AboutPage', component: AboutPage },
  { path: '/account',name: 'AccountPage', component: AccountPage }, 
  
  ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
