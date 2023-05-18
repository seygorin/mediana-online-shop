
<template>
  <div class="container mt-5">
    <h2 class="mb-6">Favorites</h2>
    <div v-if="favorites.length > 0">
      <div class="row">
        <div v-for="favorite in favorites" :key="favorite.id" class="col-md-4 mb-3">
          <div class="card">
            <img :src="favorite.image" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{{ favorite.name }}</h5>
              <p class="card-text">{{ favorite.description }}</p>
              <button class="btn btn-danger" @click="removeFavorite(favorite)">
                Remove from Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>You haven't added anything to your favorites yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: [],
    };
  },

  mounted() {
    this.loadFavorites();
  },

  methods: {
    loadFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.favorites = favorites;
    },

    removeFavorite(favorite) {
      this.favorites = this.favorites.filter((f) => f.id !== favorite.id);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
  },
};
</script>

<style>
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>