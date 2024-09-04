<script>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "vuex"

export default {
  setup() {
    const store = useStore()
    const route = useRoute()

    // These lines of code are using the `computed` function from Vue to create reactive computed
    // properties.
    const products = computed(() => store.getters.getProducts)
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
        await store.dispatch("fetchProducts")
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
        total:
          Number(selectedProduct.value.price) * Number(productQuantity.value)
      }

      addBtnText.value = "Added!"
      store.commit("addToCart", productToAdd)
      setTimeout(() => {
        addBtnText.value = "Add to Cart"
      }, 2000)

      showCheckout.value = true
    }

    return {
      addBtnText,
      selectedProduct,
      productQuantity,
      showCheckout,
      addNewProduct,
      increaseQuantity,
      decreaseQuantity
    }
  }
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
          <button @click="addNewProduct()" class="add-btn">
            {{ addBtnText }}
          </button>
          <router-link to="/cart"
            ><button v-if="showCheckout === true" class="checkout-btn">
              <i class="bi bi-cart"></i> Checkout
            </button></router-link
          >
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
    position: absolute;
    top: 20px;
    left: 20px;
    background-color: transparent;
    border: none;
    z-index: 200;
    font-size: 60px;
    color: rgba($color: #ffffff, $alpha: 0.8);

    &:hover {
      color: white;
      cursor: pointer;
    }

    &:active {
      color: rgba($color: #ffffff, $alpha: 0.5);
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

    background-color: rgb(255, 255, 255);
    padding: 30px;
    margin: auto;
    border-radius: 30px;
    width: 100%;
    text-align: center;
    z-index: 100;

    .product-title {
      font-size: 40px;
      font-weight: 900;
    }

    .product-description {
      font-size: 20px;
      padding: 15px 0;
    }

    .price-quantity {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 20px 0;

      .product-price {
        font-size: 30px;
        font-weight: bold;
      }

      .quantity {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;

        button {
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
      .add-btn {
        padding: 10px 35px;
        background-color: #89b088;
        border: none;
        border-radius: 25px;
        color: rgb(245, 244, 239);
        font-weight: 600;
        font-size: 20px;
        font-family: "Mulish", sans-serif;
        margin-bottom: 30px;

        &:hover {
          cursor: pointer;
          background-color: #849e76;
        }
      }

      .checkout-btn {
        background-color: #ddc78d;
        border: none;
        padding: 8px 15px;
        border-radius: 25px;
        color: white;
        font-size: 13px;
        margin: 20px 0;
        font-family: "Mulish", sans-serif;
        margin-left: 10px;

        &:hover {
          cursor: pointer;
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
    position: static;
    margin-top: 100px;
    height: 85vh;

    .go-back-btn {
      top: 150px;
    }

    .product-img {
      height: 80%;
      position: static;
      z-index: 0;
    }

    .product-info {
      position: absolute;
      height: 340px;
    }
  }
}
@media screen and (min-width: 1024px) {
  .product-container {
    flex: 1;
    display: flex;
    justify-content: center;

    .prod-div {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: auto;
      margin-top: 20px;
      border-radius: 50px;
      overflow: hidden;
      position: relative;

      .go-back-btn {
        top: 10px;
      }

      .product-img {
        height: 500px;
        width: 500px;
      }
      .product-info {
        position: static;
        height: 500px;
        width: 500px;
        margin: 0;
        border-radius: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .add-btn {
          margin: 0;
        }
      }
    }
  }
}
</style>
