<script setup>
import BaseButton from "./BaseButton.vue"

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <button class="card">
    <img :src="product.image" alt="" class="product-img" />
    <h1 class="product-title">{{ product.name }}</h1>
    <div class="product-details">
      <p class="product-price">{{ product.price.toFixed(2) }} €</p>
      <BaseButton>View</BaseButton>
    </div>
  </button>
</template>

<style lang="scss" scoped>
.card {
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  color: black;
  border: none;
  font-family: "Mulish", sans-serif;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform 0.4s ease;
  }

  .product-img {
    max-width: 100%;
  }

  .product-title {
    margin-top: 10px;
    font-size: 18px;
    text-align: center;
  }
  .product-details {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 15px;
    font-size: 16px;
  }
}

@media screen and (min-width: 768px) {
  .card {
    .product-title {
      font-size: 22px;
      padding: 0 5px;
    }
    .product-details {
      font-size: 18px;
    }
  }
}

@media screen and (min-width: 1025px) {
  .card {
    max-width: 300px;
    .product-details {
      font-size: 18px;
    }
  }
}
</style>
