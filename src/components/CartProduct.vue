<script setup>
import { useCartStore } from "@/stores/cartStore"

const props = defineProps({
  cartProduct: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

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
  cartStore.removeFromCart(cartProduct.name)
}
</script>

<template>
  <div class="cart-element">
    <img :src="cartProduct.image" alt="" />
    <div class="prod-info">
      <h2>{{ cartProduct.name }}</h2>
      <div class="price-quantity">
        <div class="quantity">
          <button
            :class="['quantity-btn', { disabled: cartProduct.quantity === 1 }]"
            @click="decreaseQuantity(cartProduct)"
          >
            -
          </button>
          <p>{{ cartProduct.quantity }}</p>

          <button @click="increaseQuantity(cartProduct)" class="quantity-btn">
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
</template>
<style lang="scss" scoped>
.cart-element {
  margin: 20px 0;
  background-color: white;
  display: flex;

  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

  img {
    height: 100px;
  }

  .prod-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 16px;

    h2 {
      font-size: 20px;
      margin-bottom: 10px;
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
          display: flex;
          justify-content: center;
          align-items: center;
          width: 25px;
          height: 25px;
          border: none;
          border-radius: 15px;
          margin: 0 5px;
          color: black;
          font-size: 18px;

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

@media screen and (min-width: 768px) {
  .cart-element {
    .delete-item {
      margin-right: 40px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .cart-element {
    width: 400px;
  }
}
</style>
