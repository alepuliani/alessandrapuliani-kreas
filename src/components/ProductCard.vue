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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 25px;

  .card {
    width: 170px;
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
    .card {
      width: 210px;

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
    gap: 50px;
    padding: 50px 200px;
    .card {
      max-width: 300px;
      flex: 1 1 calc(33.333% - 50px);

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
