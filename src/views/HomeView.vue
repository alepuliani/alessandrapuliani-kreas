<script setup>
import { computed, onMounted } from "vue"
import { useProductsStore } from "@/stores/productStore"
import ProductCard from "../components/ProductCard.vue"

const productsStore = useProductsStore()
const products = computed(() => productsStore.getProducts)
const loading = computed(() => productsStore.isLoading)

// Dispatching an action called `fetchProducts` to the Vuex store when the component is mounted.
onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <div class="discount-div">
    <p>
      <i class="bi bi-tags"></i> Buy <strong>4</strong> products and get
      <strong>10% off</strong>
    </p>
  </div>
  <div class="results-container">
    <div class="loading" v-if="loading">
      <span class="spinner"></span>
    </div>
    <div v-else>
      <div class="card-container">
        <router-link
          :to="{
            name: 'product',
            params: {
              name: product.name
            }
          }"
          v-for="product in products"
          :key="product.name"
        >
          <ProductCard :product="product"
        /></router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.discount-div {
  position: fixed;
  top: 80px;
  right: 0;
  left: 0;
  font-size: 14px;
  padding: 4px;
  background-color: #ddc78d;
  text-align: center;
}

.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex: 1;
  padding: 20px;

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
    min-width: 100%;

    .spinner {
      width: 48px;
      height: 48px;
      border: 6px solid #ddc78d;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 20px;
  }
}

@media screen and (min-width: 768px) {
  .discount-div {
    font-size: 16px;
  }
  .results-container {
    margin-top: 130px;
    .card-container {
      grid-template-columns: repeat(3, minmax(200px, 1fr));
    }
  }
}
</style>
