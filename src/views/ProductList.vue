<template>
  <div class="container mt-3">
    <div class="row">
      <!-- Блок сортировки продуктов,  
        выполняется при срабатывании события сортировки 
        и принимает в качестве аргумента порядок сортировки. -->
      <div class="col-md-2">
        <SortBar @sort="handleSort" />
      </div>
      <!-- Блок фильтрации продуктов -->
      <div class="col-md-2">
        <FilterBar />
      </div>
      <!-- Блок поиска продуктов, 
        вызывается с передачей результата поиска в качестве аргумента. -->
      <div class="col-md-8">
        <SearchBar :handleSearch="handleSearch" />
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <h2 class="mb-4">Product List</h2>
    <div class="row">
      <!-- Вывод списка продуктов в карточку -->
      <ProductCard v-for="data in sortedDatas" :key="data.id" :data="data" />
    </div>
    <div ref="infiniteScroll"></div>
  </div>
</template>

<script setup>

import { ref, computed } from 'vue';

import SearchBar from '../components/SearchBar.vue';
import SortBar from '../components/SortBar.vue';
import FilterBar from '../components/FilterBar.vue';
import ProductCard from './ProductCard.vue';

// Реактивная переменная для хранения списка 
// продуктов полученных по API
const datas = ref([]);

// Количество продуктов, запрашиваемых за один раз
const PAGE_SIZE = 10;

// Количество пропущенных продуктов (для кастомной бесконечной прокрутки)
let skip = 0;

// Функция для получения списка продуктов по API
const getProducts = async () => {
  try {
    // Если количество пропущенных продуктов достигло 100, то счетчик сбрасывается
    if (skip >= 100) {
      skip = 0;
    }

    // Запрос на получение продуктов с сервера
    const response = await fetch(
      `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`
    );

    // Преобразование ответа в формат JSON
    const data = await response.json();

    // Обновление списка продуктов
    datas.value = datas.value.concat(data.products);

    // Увеличение счетчика пропущенных продуктов
    skip += PAGE_SIZE;
  } catch (error) {
    console.error(error);
  }
};

// Вызов функции для получения первоначального списка продуктов
getProducts();

// Обработчик для поиска продуктов
const handleSearch = (searchResults) => {
  datas.value = searchResults;
};

// Копия массива с данными с сервера, нужен для избежания изменений исходного массива
// Ну, и чтобы сортировка работала по списку
const sortedDatas = computed(() => {
  const sorted = [...datas.value];

  // Сортировка по цене в соответствии с порядком сортировки (возрастание или убывание)
  if (sortOrder.value === 'asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOrder.value === 'desc') {
    sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
});

// Реактивная переменная для хранения порядка сортировки, без сортировки по-умолчанию
let sortOrder = ref(null);

// Обработчик для изменения порядка сортировки
const handleSort = (order) => {
  sortOrder.value = order;
};

// Функция для определения, находится ли пользователь внизу страницы, для бесконечной прокрутки
const atBottom = () => {
  const windowHeight = window.innerHeight;
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  return windowHeight + scrollTop >= scrollHeight;
};

// Обработчик прокрутки страницы
window.onscroll = async () => {
  if (atBottom()) {
    // Загрузка дополнительных продуктов при достижении конца страницы
    await getProducts();
  }
};
</script>
