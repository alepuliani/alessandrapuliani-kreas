<script setup>
import { computed, onMounted } from "vue"
import { useStore } from "vuex"

import ProductCard from "../components/ProductCard.vue"

const store = useStore()
const products = computed(() => store.getters.getProducts)
const loading = computed(() => store.getters.isLoading)

// Dispatching an action called `fetchProducts` to the Vuex store when the component is mounted.
onMounted(() => {
  store.dispatch("fetchProducts")
})
</script>

<template>
  <div class="results-container">
    <div class="discount-div">
      <p>
        <i class="bi bi-tags"></i> Buy <strong>4</strong> products and get
        <strong>10% off</strong>
      </p>
    </div>
    <div class="loading" v-if="loading">
      <span class="spinner"></span>
    </div>
    <div v-else>
      <ProductCard :products="products" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.results-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  flex: 1;
  padding: 20px;

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
      transform: translate(-50%, -50%);
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
}

@media screen and (min-width: 768px) {
  .results-container {
    margin-top: 130px;
    display: flex;
    align-items: center;

    .discount-div {
      font-size: 16px;
      padding: 4px;
    }
  }
}
</style>
