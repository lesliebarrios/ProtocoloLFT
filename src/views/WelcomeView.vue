<template>
    <h1>BIENVENIDO</h1>
    <p>Prueba de autenticación con FIREBASE</p>
    <button v-on:click="push('/login')">login</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const push = (path) => {
  router.push(path);
};

</script>

