<template>
  <div class="mt-3 col-md-3">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      {{ selectedSortText }}
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item" @click="sortByPrice('asc')">Low to High</a>
      <a class="dropdown-item" @click="sortByPrice('desc')">High to Low</a>
      <a class="dropdown-item" @click="resetSort">Unsorted</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // Выбранный тип сортировки - никакой
      selectedSort: null,
    };
  },
  computed: {
    selectedSortText() {
      // Текст для отображения выбранного типа сортировки
      if (this.selectedSort === 'asc') {
        return 'Low to High';
      } else if (this.selectedSort === 'desc') {
        return 'High to Low';
      } else {
        return 'Sort by Price';
      }
    },
  },
  methods: {
    // Выполняет сортировку по цене в указанном порядке
    sortByPrice(order) {
      this.selectedSort = order;
      // Генерирует событие 'sort' и передает выбранный тип сортировки
      this.$emit('sort', order);
    },
    // Сбрасывает тип сортировки
    resetSort() {
      this.selectedSort = null;
      // Генерирует событие 'sort' без указания типа сортировки (сброс сортировки)
      this.$emit('sort', null);
    },
  },
};
</script>