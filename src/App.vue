<script setup>
import { RouterView } from 'vue-router';

import MainHeader from './views/MainHeader.vue';
import MainFooter from './views/MainFooter.vue';
</script>

<template>
  <MainHeader />

  <RouterView />
  
  <MainFooter />
</template>
