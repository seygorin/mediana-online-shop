<template>
  <div class="mt-3 col-md-3">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{ selectedCategory || 'Select Category' }}
      </button>
      <div class="dropdown-menu"> 
        <!-- Получаем данные из массива категорий -->
        <a class="dropdown-item" v-for="category in categories" :key="category" @click="selectCategory(category)">{{ category }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: null,
      categories: [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "groceries",
        "home-decoration",
        "furniture",
        "tops",
        "womens-dresses",
        "womens-shoes",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
        "womens-jewellery",
        "sunglasses",
        "automotive",
        "motorcycle",
        "lighting"
      ]
    };
  },
  methods: {
    selectCategory(category) {
      this.selectedCategory = category;
      this.$router.push({ name: 'Category', params: { category } }); 
    }
  }
};
</script>
