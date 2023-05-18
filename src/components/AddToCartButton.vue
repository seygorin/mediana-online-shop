<template>
  <button class="btn btn-outline-secondary" @click="addToCart">
    <i class="bi bi-cart2"></i> Add to cart
  </button>
</template>

<script setup>

import { defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps(['data']); // получаем данные от родителя используя Composition API
const store = useStore();

const addToCart = () => {
  const product = {
    thumbnail: props.data.thumbnail,
    name: props.data.title,
    price: props.data.price,
  };
  store.dispatch('cart/addToCart', product);
};
</script>
