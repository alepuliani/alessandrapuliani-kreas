<script>
import { useStore } from "vuex"
import { computed } from "vue"
import SmallButton from "@/components/SmallButton.vue"

export default {
  components: { SmallButton },
  setup() {
    const store = useStore()
    const cart = computed(() => store.getters.getCartProducts)

    // These functions `increaseQuantity` and `decreaseQuantity` are responsible for updating the quantity
    // of a product in the shopping cart.
    const increaseQuantity = function (cartProduct) {
      cartProduct.quantity++
    }

    const decreaseQuantity = function (cartProduct) {
      if (cartProduct.quantity > 1) {
        cartProduct.quantity--
      }
    }

    // The `deleteItem` function is responsible for removing a specific product from the shopping cart by committing a Vuex mutation called "removeFromCart" with the name of the
    // product to be removed as a parameter
    const deleteItem = function (cartProduct) {
      store.commit("removeFromCart", cartProduct.name)
    }

    // The clearCart function commits a Vuex mutation called "clearCart," which clears the shopping cart by removing all products from it.
    const clearCart = function () {
      store.commit("clearCart")
    }

    // This block of code is creating a computed property called `totalPrice` using Vue's `computed` function.
    const totalPrice = computed(() => {
      let sum = 0
      cart.value.forEach((product) => {
        sum += product.price * product.quantity
      })
      return sum
    })

    // The `totalQuantity` constant is created using Vue's `computed` function to calculates the total quantity of products in the shopping cart by iterating over each product in the `cart` array and
    // summing up their individual quantities.
    const totalQuantity = computed(() => {
      let sum = 0
      cart.value.forEach((product) => {
        sum += product.quantity
      })
      return sum
    })

    // This function is essentially a handler for confirming an order and clearing the cart in the process.
    const confirmOrder = function () {
      clearCart()
    }

    return {
      cart,
      increaseQuantity,
      decreaseQuantity,
      deleteItem,
      clearCart,
      totalPrice,
      totalQuantity,
      confirmOrder
    }
  }
}
</script>
<template>
  <div class="cart-div">
    <div class="empty-cart" v-if="cart.length === 0">
      <i class="bi bi-cart"></i>
      <p><strong>Your Cart is empty</strong></p>
      <router-link to="/">
        <SmallButton :label="'Start Shopping'" />
      </router-link>
    </div>

    <div v-else>
      <div class="cart-start">
        <h1>Cart</h1>
        <SmallButton :label="'Clear Cart'" @click="clearCart" />
      </div>
      <div class="cart-container">
        <div class="prod-container">
          <div
            v-for="(cartProduct, index) in cart"
            :key="index"
            class="cart-element"
          >
            <img :src="cartProduct.image" alt="" />
            <div class="prod-info">
              <h2>{{ cartProduct.name }}</h2>
              <div class="price-quantity">
                <div class="quantity">
                  <button
                    :class="[
                      'quantity-btn',
                      { disabled: cartProduct.quantity === 1 }
                    ]"
                    @click="decreaseQuantity(cartProduct)"
                  >
                    -
                  </button>
                  <p>{{ cartProduct.quantity }}</p>

                  <button
                    @click="increaseQuantity(cartProduct)"
                    class="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <p class="price">
                  <strong>
                    {{ cartProduct.price.toFixed(2) }}
                    €</strong
                  >
                </p>
              </div>
            </div>

            <button @click="deleteItem(cartProduct)" class="delete-item">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>

        <div class="checkout-div">
          <div class="discount">
            <i class="bi bi-tags"></i>
            <div v-if="totalQuantity < 4">
              <p>
                <strong>10% Discount</strong> if you buy
                <strong>{{ 4 - totalQuantity }}</strong> more
                <span v-if="4 - totalQuantity === 1">product</span>
                <span v-else>products</span>
              </p>
            </div>

            <div v-else>
              <p><strong>Congratulation!</strong> 10% discount</p>
            </div>
          </div>

          <div class="total-div">
            <p v-if="totalQuantity < 4">
              Total: <strong>{{ totalPrice.toFixed(2) }} €</strong>
            </p>

            <p v-else>
              <del> {{ totalPrice.toFixed(2) }}€</del>
              <br />
              Total:
              <strong
                >{{
                  (totalPrice - (totalPrice / 100) * 10).toFixed(2)
                }}
                €</strong
              >
            </p>

            <router-link to="/order"
              ><button @click="confirmOrder" class="confirm-order-btn">
                Confirm Order
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cart-div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  flex: 1;
  margin-top: 80px;
  padding: 20px;

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    i {
      font-size: 60px;
      color: #89b088;
      margin: 10px;
    }

    p {
      margin-bottom: 20px;
    }
  }

  .cart-start {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    h1 {
      font-size: 40px;
      margin-right: 150px;
    }
  }

  .cart-element {
    margin: 20px 0;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.2);

    img {
      height: 100px;
    }

    .prod-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 0 16px;

      h2 {
        font-size: 20px;
      }

      .price-quantity {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .quantity {
          display: flex;
          align-items: center;
          padding-right: 10px;

          button {
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 15px;
            margin: 0 5px;
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
        .price {
          min-width: 70px;
        }
      }
    }
    .delete-item {
      margin: auto 20px;
      background: none;
      border: none;
      height: 20px;
      color: #000000;

      &:hover {
        cursor: pointer;
      }

      i {
        font-size: 20px;
      }
    }
  }

  .discount {
    background-color: #d6c18b;
    color: white;
    font-size: 14px;
    padding: 10px 12px;
    margin-bottom: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;

    i {
      padding-right: 10px;
    }
  }

  .total-div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .confirm-order-btn {
      padding: 10px 35px;
      background-color: #89b088;
      border: none;
      border-radius: 25px;
      color: rgb(245, 244, 239);
      font-weight: 600;
      font-size: 20px;
      font-family: "Mulish", sans-serif;

      &:hover {
        cursor: pointer;
        background-color: #849e76;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .cart-div {
    font-size: 18px;
    .cart-element {
      .delete-item {
        margin-right: 40px;
      }
    }

    .discount {
      font-size: 16px;
    }
  }
}
@media screen and (min-width: 1024px) {
  .cart-div {
    .cart-start {
      justify-content: flex-start;
    }
    .cart-container {
      display: flex;
      align-items: baseline;
      .cart-element {
        width: 400px;
      }

      .checkout-div {
        margin-left: 50px;
        width: 400px;
        padding: 30px;

        border: 2px solid rgba($color: #ffffff, $alpha: 0.5);
        border-radius: 20px;
      }
    }
  }
}
</style>
