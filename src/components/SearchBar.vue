<template>
  <div class="mt-3 col-md-5 float-end">
    <div class="input-group col-md-4">
      <input type="text" class="form-control" v-model="search" placeholder="Search..." @keyup.enter="searchProducts">
      <button class="btn btn-primary" @click="searchProducts">Search</button>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const search = ref('');

    const searchProducts = () => {
      if (search.value.trim() !== '') { // Проверка на пустую строку
        router.push({ path: '/search', query: { q: search.value } });
      }
    };

    return {
      search,
      searchProducts,
    };
  },
};
</script>
