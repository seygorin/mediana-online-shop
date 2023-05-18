<template>
  <div class="container mt-5">
    <!-- Отображает заголовок с запросом поиска получаемы через route -->
    <h2 class="mb-4">Search results for "{{ query }}"</h2> 
    <div class="row">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :data="product"
      />
    </div>
  </div>
</template>

<script >

import { ref, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  props: {
    query: String, // определяет пропс query, который приходит от родительского компонента
  },
  components: {
    ProductCard,
  },

  setup(props) {
    const products = ref([]);

    const searchProducts = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${props.query}`
        );
        const data = await response.json();
        products.value = data.products;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(searchProducts);

    return {
      products,
    };
  },
};
</script>
