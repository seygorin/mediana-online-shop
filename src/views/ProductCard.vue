<template>
  <div class="col-lg-4 mb-3">
    <div class="card text-center">
      <img
        :src="data.thumbnail"
        class="card-img-top img-fluid"
        alt="img of product"
      />
      <div class="card-body">
        <h5 class="card-title">{{ data.title }}</h5>
        <p class="card-text">{{ data.price }} $</p>
        <div class="d-flex justify-content-between align-items-center">
          <!-- Кнопка для добавления в избранное
          с передачей данных в компонент избранное -->
          <AddToFavoritesButton :data="data" />
          <!-- Кнопка для перехода на страницу с подробностями о продукте -->
          <button class="btn btn-outline-primary" @click="navigateToDetails">
            Details
          </button>
          <!-- Кнопка для добавления в корзину
          с передачей данных в компонент корзина -->
          <AddToCartButton :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useRouter } from 'vue-router';

  import AddToFavoritesButton from '../components/AddToFavoritesButton.vue'
  import AddToCartButton from '../components/AddToCartButton.vue'

  // Определение пропсов, получаемых из ProductList, используем Composition API
  const props = defineProps(['data']);
  const router = useRouter();

  // Функция для перехода на страницу с подробностями о продукте по id
  const navigateToDetails = () => {
    router.push(`/product/${props.data.id}`);
  };

</script>


<style scoped>
.card {
  height: 50vh; 
}

.card-title {
  font-size: 1.2rem; 
}
.card-img-top {
  height: 65%; 
  object-fit: cover; 
}

a {
  text-decoration: none;
}
</style>
