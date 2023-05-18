<template>
  <div class="container mt-5">
    <h2 class="mb-6">Cart</h2>
    <ul class="list-group" v-if="cartItems.length > 0">
      <!-- Перебираем уникальные элементы в корзине -->
      <li class="list-group-item" v-for="(item, index) in uniqueCartItems" :key="index">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <img
              :src="item.thumbnail"
              class="card-img-top img-fluid mr-3"
              alt="img of product"
              style="max-width: 75px; max-height: 75px;"
            />
            <p>{{ item.name }}</p>
          </div>
          <div>
            <p>{{ item.price }}$ x {{ item.quantity }}</p>
            <p>Total: {{ calculateTotal(item) }}$</p>
          </div>
          <!-- Кнопка для удаления одного элемента из корзины -->
          <button class="btn btn-danger" @click="removeFromCart(item)">
            X
          </button>
        </div>
      </li>
    </ul>
    <div v-else>
      <p>You haven't added anything to your cart yet.</p>
    </div>
    <div v-if="cartItems.length > 0">
      <!-- Отображение общей суммы покупки -->
      <p class="mt-3">Total Purchase Amount: {{ calculateCartTotal() }}$</p>
      <!-- Кнопка для полной очистки корзины -->
      <button class="btn btn-danger mt-3" @click="clearCart">Clear Cart</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    // Получение элементов корзины из глобального состояния с использованием геттера
    cartItems() {
      return this.$store.getters['cart/cartItems'];
    },
    // Получение уникальных элементов корзины
    uniqueCartItems() {
      const uniqueItems = [];
      const addedItems = new Set();

      for (const item of this.cartItems) {
        if (!addedItems.has(item.name)) {
          // Если элемент не был добавлен ранее, добавляем его в список уникальных элементов
          uniqueItems.push({
            ...item,
            quantity: 1
          });
          addedItems.add(item.name);
        } else {
          // Если элемент уже присутствует в списке уникальных элементов, увеличиваем его количество
          const existingItem = uniqueItems.find((uniqueItem) => uniqueItem.name === item.name);
          existingItem.quantity++;
        }
      }

      return uniqueItems;
    }
  },
  methods: {
    // Удаление элемента из корзины используя состояние
    removeFromCart(item) {
      const index = this.cartItems.findIndex((cartItem) => cartItem.name === item.name);
      if (index !== -1) {
        this.$store.commit('cart/removeFromCart', index);
      }
    },
    // Вычисление общей суммы для конкретного элемента
    calculateTotal(item) {
      return item.price * item.quantity;
    },
    // Вычисление общей суммы покупки
    calculateCartTotal() {
      let total = 0;
      for (const item of this.uniqueCartItems) {
        total += this.calculateTotal(item);
      }
      return total;
    },
    // Полная очистка корзины
    clearCart() {
      this.$store.commit('cart/clearCart');
    },
  },
};
</script>
