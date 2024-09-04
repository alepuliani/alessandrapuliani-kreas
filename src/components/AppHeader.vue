<script>
import { useRoute } from "vue-router"
import { computed } from "vue"
import { useStore } from "vuex"

export default {
  setup() {
    const route = useRoute()
    const store = useStore()

    // The code snippet you provided is using Vue 3 Composition API to create reactive properties
    // `isCartView` and `cartQuantity`.
    const isCartView = computed(() => route.path === "/cart")
    const cartQuantity = computed(() => store.getters.getCartProducts.length)

    return {
      route,
      isCartView,
      cartQuantity
    }
  }
}
</script>

<template>
  <div class="header">
    <router-link to="/">
      <button class="home">
        <img src="../assets/kreas-logo.png" alt="kreas logo" class="logo" />
      </button>
    </router-link>

    <router-link to="/cart" v-if="!isCartView">
      <button class="cart-btn">
        <i class="bi bi-cart"></i>
        <span v-if="cartQuantity !== 0" class="cart-quantity">
          {{ cartQuantity }}
        </span>
      </button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 80px;
  padding: 0 30px;
  background-color: rgb(228, 225, 217);
  z-index: 50;

  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .home {
    background: none;
    border: none;

    &:hover {
      cursor: pointer;
    }

    .logo {
      height: 60px;
    }
  }

  .cart-btn {
    position: relative;
    font-size: 30px;
    color: #89b088;
    background: none;
    border: none;

    &:hover {
      cursor: pointer;
      color: #849e76;
    }

    .cart-quantity {
      position: absolute;
      top: -6px;
      right: -7px;
      background-color: #ddc78d;
      color: white;
      font-size: 13px;
      padding: 1px 5px;
      border-radius: 50%;
      text-align: center;
    }
  }
}

@media screen and (min-width: 768px) {
  .header {
    padding: 0 40px;
    .home {
      .logo {
        height: 70px;
      }
    }
    .cart-btn {
      font-size: 35px;
    }
  }
}
</style>
