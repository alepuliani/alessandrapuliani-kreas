<script setup>
import { useCartStore } from "@/stores/cartStore"
import { computed } from "vue"
import BaseButton from "@/components/BaseButton.vue"
import CartProduct from "@/components/CartProduct.vue"

const cartStore = useCartStore()
const cart = computed(() => cartStore.getCartProducts)

// The clearCart function commits a Vuex mutation called "clearCart," which clears the shopping cart by removing all products from it.
const clearCart = function () {
  cartStore.clearCart()
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
const totalQuantity = computed(() => cartStore.totalCartQuantity)

// This function is essentially a handler for confirming an order and clearing the cart in the process.
const confirmOrder = function () {
  clearCart()
}
</script>
<template>
  <div class="cart-div">
    <div class="empty-cart" v-if="cart.length === 0">
      <i class="bi bi-cart"></i>
      <p><strong>Your Cart is empty</strong></p>
      <router-link to="/">
        <BaseButton>Start Shopping</BaseButton>
      </router-link>
    </div>

    <div v-else>
      <div class="cart-start">
        <h1>Cart</h1>
        <BaseButton @click="clearCart">Clear Cart</BaseButton>
      </div>
      <div class="cart-container">
        <div
          class="prod-container"
          v-for="cartProduct in cart"
          :key="cartProduct.name"
        >
          <CartProduct :cartProduct="cartProduct" />
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

            <router-link to="/order">
              <BaseButton
                @click="confirmOrder"
                :customClass="'confirm-order-btn'"
                >Confirm Order</BaseButton
              >
            </router-link>
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
    justify-content: space-between;
    align-items: baseline;

    h1 {
      font-size: 40px;
      margin-right: 150px;
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
      border-radius: 25px;
      font-size: 20px;
    }
  }
}

@media screen and (min-width: 768px) {
  .cart-div {
    font-size: 18px;
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
      flex-direction: column;
      align-items: baseline;

      .checkout-div {
        margin-left: 50px;
        width: 400px;
        padding: 30px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 20px;
      }
    }
  }
}
</style>
