import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import WelcomeView from '../views/WelcomeView.vue';
import LoginView from '../views/LoginView.vue';
// import RegisterView from '../views/RegisterView.vue';

const routes = [
  {
    path: '/ProtocoloLFT/',
    name: 'welcome',
    component: WelcomeView
  },
  {
    path: '/ProtocoloLFT/login',
    name: 'login',
    component: LoginView
  },
//   {
//     path: '/register',
//     name: 'register',
//     component: RegisterView
//   },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next('/login');
    } else if ((to.name === 'login' || to.name === 'register') && user) {
      next('/dashboard');
    } else {
      next();
    }
  });
});

export default router;