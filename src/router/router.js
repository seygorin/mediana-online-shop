import { createRouter, createWebHistory } from 'vue-router'

import ProductDetails from '../views/ProductDetails.vue'
import ViewCart from '../views/ViewCart.vue';
import ViewFavorites from '../views/ViewFavorites.vue';

import FilteredResult from '../views/FilteredResult.vue';
import SearchResults from '../views/SearchResults.vue';
import NotFoundView from '../views/404View.vue';

// Создание маршрутов приложения
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/ProductList.vue') // Асинхронный импорт компонента, можно и так, ускоряет начальную загрузку
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: ViewCart,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: ViewFavorites,
  },
  {
    path: '/:catchall(.*)*',
    name: 'Not Found',
    component: NotFoundView,
  },
  {
    path: '/category/:category',
    name: 'Category',
    component: FilteredResult,
    props: (route) => ({ category: route.params.category}), // Передача параметра категории в компонент
  },
  {
    path: '/search',
    component: SearchResults,
    props: (route) => ({ query: route.query.q }), // Передача параметра запроса в компонент
  },
]

const router = createRouter({
  history: createWebHistory(), 
  routes 
})

export default router
