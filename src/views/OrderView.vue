<script setup>
import BaseButton from "@/components/BaseButton.vue"
</script>
<template>
  <div class="order-complete-div">
    <p>
      Thank you! <br />
      Your order has been received
    </p>

    <i class="bi bi-cart-check"></i>
    <router-link to="/">
      <BaseButton>Go Home</BaseButton>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.order-complete-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  p {
    text-align: center;
    font-size: 20px;
  }

  i {
    font-size: 50px;
    margin-bottom: 20px;
  }
}
</style>
