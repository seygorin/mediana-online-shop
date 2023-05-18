<template>
  <button class="btn btn-outline-secondary" @click="addToFavorites">
    <i class="bi bi-heart"></i>
  </button>
</template>

<script setup>

import { defineProps } from 'vue';

const props = defineProps(['data']); // получаем данные от родителя используя Composition API

const addToFavorites = () => {
  const favorite = {
    id: props.data.id,
    image: props.data.thumbnail,
    name: props.data.title,
    description: props.data.description,
  };

  // Получаем избранных товаров из LocalStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  // Проверяем есть ли товар уже в избранном
  const existingFavorite = favorites.find((item) => item.id === favorite.id);
  if (!existingFavorite) {
    favorites.push(favorite);
  }

  // Сохранение избранных товаров в LocalStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
};
</script>
