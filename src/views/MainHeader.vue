<template>
  <header class="bg-light p-3">
    <nav class="navbar navbar-light bg-light">
      <!-- Ссылка на домашнюю страницу, переадресация через name в route -->
      <RouterLink :to="{ name: 'Home' }">
        <a class="navbar-brand">Back to home</a>
      </RouterLink>
      <ul class="navbar-nav flex-row">
        <!-- Элемент навигации для избранных товаров -->
        <li class="nav-item">
          <RouterLink :to="{ name: 'Favorites' }">
            <button class="btn btn-outline-secondary">
              <i class="bi bi-heart"></i>
            </button>
          </RouterLink>
        </li>
        <!-- Элемент навигации для корзины -->
        <li class="nav-item">
          <RouterLink :to="{ name: 'Cart' }">
            <button class="btn btn-outline-secondary">
              <i class="bi bi-cart2"></i>
              <span>{{ cartItemCount }}</span>
            </button>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {

    const store = useStore();
    // Вычесляем колличество товаров в корзине динамически, данные получаем через store
    const cartItemCount = computed(() => store.getters['cart/cartItems'].length);

    return {
      cartItemCount,
    };
  },
};
</script>

<style scoped>
.nav-item {
  margin-left: 2vw;
}
a {
  text-decoration: none;
}
</style>
