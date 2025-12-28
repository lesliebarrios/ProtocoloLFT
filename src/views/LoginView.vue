<template>
  <div class="login-view">
    <h1>INICIAR SESIÓN</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <div class="icon-container">
          <User/>
        </div>
        <input v-model="email" type="email" placeholder="Correo o username" required />
      </div>
      <div>
        <div class="icon-container">
          <Lock/>
        </div>

        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Contraseña"
          required
        />

        <button
          type="button"
          class="eye-button"
          @click="togglePassword"
          :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
        >
          <Eye v-if="!showPassword" :size="18" />
          <EyeOff v-else :size="18" />
        </button>
      </div>
      <button type="submit">Ingresar</button>
    </form>
    <!--  
    <p>
      ¿No tienes cuenta? 
      <router-link to="/register">Regístrate</router-link>
    </p>
    -->
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { User, Lock, Eye, EyeOff } from 'lucide-vue-next';

// ================================
// LOGIN REAL (COMENTADO POR AHORA)
// ================================
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase/firebase';

const email = ref('');
const password = ref('');
const error = ref('');

const router = useRouter();

const handleLogin = async () => {
  // ================================
  // LOGIN TEMPORAL / MOCK
  // ================================
  if (email.value === 'leslielisabm@gmail.com' && password.value === 'Password123!') {
    console.log('Login mock exitoso');
    router.push('/');
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

  error.value = 'Credenciales inválidas';
};

const showPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

</script>

<style scoped>
h1 {
  color: var(--color-primario);
  font-weight: 350;
}

button {
  background-color: var(--color-secundario);
  color: var(--color-fondo);
  border: 0;
  border-radius: 10px;
  padding: 8px 14px;  
}

input {
  border: 0;
  padding: 10px;
  margin: 10px 0;
  border-radius: 8px;
}

input:focus {
  outline: none;
  border-bottom: 2px solid var(--color-secundario);
}

.icon-container {
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: var(--color-primario);
}

.login-view form > div {
  display: flex;
  align-items: center;
}

.eye-button {
  background: transparent;
  border: 0;
  cursor: pointer;
  color: var(--color-primario);
  padding: 4px;
}

.eye-button:hover {
  opacity: 0.8;
}


</style>