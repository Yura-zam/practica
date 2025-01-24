// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import Dashboard from '@/views/Dashboard.vue';
import AdminPage from '@/views/AdminPage.vue';
import UserPage from '@/views/UserPage.vue';
import DirectorPage from '@/views/DirectorPage.vue';
import store from '@/store'; // для перевірки ролей

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      { path: 'admin', component: AdminPage, meta: { role: 'admin' } },
      { path: 'user', component: UserPage, meta: { role: 'user' } },
      { path: 'director', component: DirectorPage, meta: { role: 'director' } },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Перевірка ролей і аутентифікації
router.beforeEach((to, from, next) => {
  const loggedIn = store.getters.isLoggedIn;
  const userRole = store.getters.userRole;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      return next('/login');
    }
    if (to.meta.role && to.meta.role !== userRole) {
      return next('/dashboard'); // перенаправлення, якщо немає доступу до ролі
    }
  }
  next();
});

export default router;
