<script>
import SmallButton from "./SmallButton.vue"

export default {
  components: { SmallButton },

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
    <div class="card" v-for="(product, index) in products" :key="index">
      <img :src="product.image" alt="" class="product-img" />
      <h1 class="product-title">{{ product.name }}</h1>
      <div class="product-details">
        <p class="product-price">{{ product.price.toFixed(2) }} €</p>

        <router-link
          :to="{
            name: 'product',
            params: {
              name: product.name
            }
          }"
        >
          <SmallButton :label="'View'" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px 30px;

  .card {
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);

    .product-img {
      max-width: 100%;
    }

    .product-title {
      margin-top: 10px;
      font-size: 20px;
      text-align: center;
      font-weight: 800;
    }
    .product-details {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 15px;
    }
  }
}

//MEDIA QUERIES

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
