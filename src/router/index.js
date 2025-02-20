import { createRouter, createWebHistory } from 'vue-router';
import CatalogPage from '@/components/CatalogPage.vue';
import AboutPage from '@/components/AboutPage.vue';
import UserAccount from '@/components/UserAccount.vue';
import LoginPage from '@/components/LoginPage.vue';
const routes = [
  { path: '/', redirect: '/catalog' },
  { path: '/catalog', name: 'CatalogPage', component: CatalogPage },
  { path: '/about', name: 'AboutPage', component: AboutPage },
  { path: '/login',name: 'LoginPage', component: LoginPage }, 
  { path: '/account',name: 'UserAccount', component: UserAccount },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
