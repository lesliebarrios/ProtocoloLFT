<template>
    <h1>BIENVENIDO</h1>
    <button v-on:click="push('/login')">login</button>
    <button v-on:click="push('/editar-archivo')">Editar archivo</button>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const push = (path) => {
  router.push(path);
};

</script>

