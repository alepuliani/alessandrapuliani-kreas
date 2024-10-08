<script setup>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useProductsStore } from "@/stores/productStore"
import { useCartStore } from "@/stores/cartStore"
import BaseButton from "../components/BaseButton.vue"

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

// These lines of code are using the `computed` function from Vue to create reactive computed
// properties.
const products = computed(() => productsStore.getProducts)
const name = computed(() => route.params.name)

const productQuantity = ref(1)
const selectedProduct = ref(null)
const showCheckout = ref(false)
const addBtnText = ref("Add to Cart")

// Finding and setting the `selectedProduct` based on the `name` parameter from the route. It uses the `computed` properties `products` and
// `name` to find a product with a matching name in the list of products. Once a product with the
// matching name is found, it assigns that product to the `selectedProduct` ref variable.
const findSelectedProduct = function () {
  selectedProduct.value = products.value.find(
    (product) => product.name === name.value
  )
}

// Asynchronous function for loading products from the store if the `products` array is empty.
const loadProducts = async function () {
  if (products.value.length === 0) {
    await productsStore.fetchProducts()
  }
  findSelectedProduct()
}

// The `onMounted(loadProducts)` line in the Vue setup function is using the `onMounted` lifecycle
// hook provided by Vue to call the `loadProducts` function when the component is mounted to the DOM.
onMounted(loadProducts)

// Functions responsible for changing the `productQuantity` value by 1 each time one is called. They directly modifie the value stored in the `productQuantity` ref variable.
const increaseQuantity = function () {
  productQuantity.value++
  addBtnText.value = "Add to Cart"
}

const decreaseQuantity = function () {
  if (productQuantity.value > 1) {
    productQuantity.value--
    addBtnText.value = "Add to Cart"
  }
}

// Function responsible for adding the selected product to the cart
const addNewProduct = function () {
  const productToAdd = {
    name: selectedProduct.value.name,
    price: Number(selectedProduct.value.price),
    image: selectedProduct.value.image,
    quantity: Number(productQuantity.value),
    total: Number(selectedProduct.value.price) * Number(productQuantity.value)
  }

  addBtnText.value = "Added!"
  cartStore.addToCart(productToAdd)
  setTimeout(() => {
    addBtnText.value = "Add to Cart"
  }, 1000)
  productQuantity.value = 1
  showCheckout.value = true
}
</script>
<template>
  <div class="product-container" v-if="selectedProduct">
    <div class="prod-div">
      <router-link to="/"
        ><button class="go-back-btn">
          <i class="bi bi-arrow-left-short"></i></button
      ></router-link>
      <img class="product-img" :src="selectedProduct.image" />
      <div class="product-info">
        <h1 class="product-title">{{ selectedProduct.name }}</h1>
        <p class="product-description">{{ selectedProduct.description }}</p>
        <div class="price-quantity">
          <p class="product-price">{{ selectedProduct.price.toFixed(2) }} €</p>
          <div class="quantity">
            <button
              @click="decreaseQuantity"
              :class="['quantity-btn', { disabled: productQuantity === 1 }]"
            >
              -
            </button>
            <p>{{ productQuantity }}</p>
            <button @click="increaseQuantity" class="quantity-btn">+</button>
          </div>
        </div>
        <div class="btn-div">
          <BaseButton @click="addNewProduct" :customClass="'add-btn'">{{
            addBtnText
          }}</BaseButton>

          <router-link to="/cart">
            <BaseButton
              v-if="showCheckout === true"
              :customClass="'checkout-btn'"
              >Checkout</BaseButton
            >
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-container {
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;

  .go-back-btn {
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    z-index: 200;
    font-size: 60px;
    color: rgba(#ffffff, 0.8);

    &:hover {
      color: white;
      cursor: pointer;
    }

    &:active {
      color: rgba(#ffffff, 0.5);
    }
  }

  .product-img {
    position: absolute;
    height: 65%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 60;
  }

  .product-info {
    position: absolute;
    bottom: -20px;
    background-color: #ffffff;
    padding: 50px 30px;
    margin: auto;
    border-radius: 30px;
    width: 100%;
    text-align: center;
    z-index: 100;

    .product-title {
      font-size: 30px;
      font-weight: 900;
    }

    .product-description {
      font-size: 18px;
      padding-top: 15px;
    }

    .price-quantity {
      display: flex;
      justify-content: space-around;
      padding-top: 20px;

      .product-price {
        font-size: 20px;
        font-weight: bold;
      }

      .quantity {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;

        button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 15px;
          margin: 0 10px;
          color: black;
          font-size: 20px;

          &:hover {
            cursor: pointer;
          }

          &.disabled {
            opacity: 0.2;
            cursor: default;
          }
        }
      }
    }

    .btn-div {
      margin: 20px 0;

      .add-btn {
        padding: 10px 35px;
        border-radius: 25px;
        font-size: 20px;
      }

      .checkout-btn {
        background-color: #ddc78d;
        padding: 10px 35px;
        border-radius: 25px;
        font-size: 20px;
        margin-left: 10px;

        &:hover {
          background-color: #cdb883;
        }

        i {
          font-size: 15px;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .product-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    flex: 1;
    position: static;

    .prod-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
      border-radius: 50px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);
      height: 800px;
      width: 500px;

      .go-back-btn {
        position: absolute;
        top: 10px;
      }

      .product-img {
        position: static;
        height: 450px;
      }

      .product-info {
        height: 500px;
        width: 500px;
        margin: 0;
        position: static;
        border-radius: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .product-container {
    .prod-div {
      flex-direction: row;
      margin: 30px 0;
      border-radius: 50px;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      height: 400px;
      width: auto;

      .product-img {
        width: 400px;
      }

      .product-info {
        width: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
