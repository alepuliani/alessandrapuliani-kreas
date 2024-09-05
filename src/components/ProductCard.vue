<script>
import BaseButton from "./BaseButton.vue"

export default {
  components: { BaseButton },

  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="card-container">
    <router-link
      :to="{
        name: 'product',
        params: {
          name: product.name
        }
      }"
      v-for="(product, index) in products"
      :key="index"
    >
      <button class="card">
        <img :src="product.image" alt="" class="product-img" />
        <h1 class="product-title">{{ product.name }}</h1>
        <div class="product-details">
          <p class="product-price">{{ product.price.toFixed(2) }} €</p>
          <BaseButton :customClass="'bla'">View</BaseButton>
        </div>
      </button></router-link
    >
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(150px, 1fr));
  gap: 20px;

  .card {
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
    color: black;
    border: none;
    font-family: "Mulish", sans-serif;

    &:hover {
      cursor: pointer;
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
}

@media screen and (min-width: 768px) {
  .card-container {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
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
}
@media screen and (min-width: 1025px) {
  .card-container {
    .card {
      max-width: 300px;
      .product-title {
        font-size: 22px;
        padding: 0 5px;
      }
      .product-details {
        font-size: 18px;
      }
    }
  }
}
</style>
