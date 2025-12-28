import { createRouter, createWebHashHistory } from 'vue-router';
//import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import WelcomeView from '../views/WelcomeView.vue';
import LoginView from '../views/LoginView.vue';
// import RegisterView from '../views/RegisterView.vue';
import EditarArchivoView from '../views/EditarArchivoView.vue';

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: WelcomeView,
    //meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
//   {
//     path: '/register',
//     name: 'register',
//     component: RegisterView
//   },

  {
    path: '/editar-archivo',
    name: 'editar-archivo',
    component: EditarArchivoView,
  },
];

const router = createRouter({
  history: createWebHashHistory("/ProtocoloLFT/"),
  routes
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
//   onAuthStateChanged(auth, (user) => {
//     if (requiresAuth && !user) {
//       next('/login');
//     } else if ((to.name === 'login' || to.name === 'register') && user) {
//       next('/welcome');
//     } else {
//       next();
//     }
//   });
// });

export default router;