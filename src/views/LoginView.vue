<template>
  <div class="login-view">
    <h1>INICIAR SESIÓN</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <!-- icono -->
        <input v-model="email" type="email" placeholder="Correo o username" required />
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Contraseña" required />
      </div>
      
      
      <button type="submit">Ingresar</button>
    </form>
    <p>
      ¿No tienes cuenta? 
      <router-link to="/register">Regístrate</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
// LOGIN REAL (comentado por ahora)
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/firebase';

import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const error = ref('');

    const handleLogin = async () => {
      // ================================
      // LOGIN TEMPORAL / MOCK
      // ================================
      if (email.value === 'admin' && password.value === 'Password123!') {
        console.log('Login mock exitoso');
        router.push('/welcome');
        return;
      }

      // ================================
      // LOGIN REAL CON FIREBASE (COMENTADO)
      // ================================
      /*
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/welcome');
      } catch (err) {
        error.value = err.message;
        console.error('Error al iniciar sesión:', err);
      }
      */

      // Si no coincide con el mock
      error.value = 'Credenciales inválidas';
    };

    return {
      email,
      password,
      error,
      handleLogin
    };
  }
};
</script>

<style scoped>
h1 {
  color: var(--color-primario);
  font-weight: 400;
}

button {
  background-color: var(--color-primario);
  color: var()
}
</style>