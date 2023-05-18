import { createStore } from 'vuex';

const store = createStore({
  modules: {
    cart: {
      namespaced: true,
      state: {
        // Состояние корзины, начальное значение - пустой массив
        cartItems: [], 
      },
      mutations: {
        // Мутация для добавления элемента в корзину
        addToCart(state, product) {
          state.cartItems.push(product);
        },
        // Мутация для удаления элемента из корзины по индексу
        removeFromCart(state, index) {
          state.cartItems.splice(index, 1);
        },
        // Мутация для очистки корзины
        clearCart(state) {
          state.cartItems = [];
        },
      },
      actions: {
        // Действие для добавления элемента в корзину
        addToCart({ commit }, product) {
          commit('addToCart', product);
        },
        // Действие для удаления элемента из корзины по индексу
        removeFromCart({ commit, state }, index) {
          if (index >= 0 && index < state.cartItems.length) {
            commit('removeFromCart', index);
          }
        },
      },
      getters: {
        // Геттер для получения элементов корзины из состояния
        cartItems(state) {
          return state.cartItems;
        },
      },
    },
  },
});

export default store;
