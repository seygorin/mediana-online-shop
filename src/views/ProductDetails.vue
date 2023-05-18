<template>
   <!-- Проверяет данные о продукте, и если есть, то отображает контейнер.  -->
  <div v-if="product" class="container my-5">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3">
        <h1>{{ product.title }}</h1>
        <img :src="product.images[0]" class="img-fluid rounded mx-auto d-block mb-3" alt="img of product">
        <div class="row">
          <div class="col-4">
            <img :src="product.images[1]" class="img-fluid rounded mx-auto d-block mb-3" alt="img of product">
          </div>
          <div class="col-4">
            <img :src="product.images[2]" class="img-fluid rounded mx-auto d-block mb-3" alt="img of product">
          </div>
        </div>
        <p>{{ product.description }}</p>
        <p>Price: {{ product.price }} $</p>

        <div class="d-flex justify-content-evenly align-items-center">
          <!-- Кнопка для добавления в корзину
          с передачей данных в компонент корзина -->
          <AddToCartButton :data="product"/> 
          <!-- Кнопка для добавления в избранное
          с передачей данных в компонент избранное -->
          <AddToFavoritesButton :data="product" />
        </div>
      </div>
    </div>
  </div>
  <!-- Проверяет загрузку данных, если значение пустое, то "Не найдено"  -->
  <div v-else-if="!loading">
    <h1 class="text-center my-5">
      Not Found
    </h1>
  </div>
  <div v-else>
    <h1 class="text-center my-5">
      Loading...
    </h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import AddToFavoritesButton from '../components/AddToFavoritesButton.vue';
import AddToCartButton from '../components/AddToCartButton.vue';

// Получаем текущий маршрут
const route = useRoute();
// Получаем id продукта из параметров маршрута 
const productId = route.params.id;

// Инициализация реактивной переменной для хранения данных о продукте
const product = ref(null);
// Инициализация флага загрузки данных
let loading = ref(true);

// Функция для получения данных о продукте
const getProduct = async () => {
  try {
    // Отправляем запрос на получение данных о продукте с помощью id продукта
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    // Проверяем успешность запроса
    if (response.ok) {
      // Если запрос успешен, получаем данные в формате JSON
      const data = await response.json();
      // Присваиваем данные о продукте переменной product
      product.value = data;
    } else {
      // Если запрос не успешен, выводим ошибку в консоль, 
      // с более подробными данными об ошибке
      console.error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Если происходит ошибка при выполнении запроса, выводим ошибку в консоль
    console.error(error);
  } finally {
    // Устанавливаем флаг загрузки в значение false, т.к. загрузка данных завершена
    loading.value = false;
  }
};

// Вызываем функцию getProduct при монтировании (отображении) компонента на странице
onMounted(getProduct);

</script>
