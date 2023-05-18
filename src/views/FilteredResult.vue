<template>
  <div class="container mt-5">
    <h2 class="mb-4">Filter results for "{{ category }}"</h2>
    <div class="row">
      <!-- Компонент ProductCard для отображения отфильртованных продуктов -->
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :data="product"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  props: {
    category: String, // Пропс для передачи выбранной категории
  },
  components: {
    ProductCard, // Импорт компонента ProductCard для использования в шаблоне
  },
  setup(props) {

    const products = ref([]);

    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/category/${props.category}`); // получаем данные о категории через пропс
        const data = await response.json();
        products.value = data.products; 
      } catch (error) {
        console.error(error);
      }
    };

    // Вызов функции загрузки продуктов при монтировании компонента
    onMounted(fetchProducts);

    return {
      products,
    };
  },
};
</script>
