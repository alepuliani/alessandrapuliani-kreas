<script>
export default {
  props: {
    customClass: {
      type: String,
      default: ""
    }
  },
  emits: "click",

  setup(props, { emit }) {
    const handleClick = () => {
      emit("click")
    }

    return {
      handleClick,
      customClass: props.customClass
    }
  }
}
</script>

<template>
  <button :class="customClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  padding: 5px 10px;
  background-color: #89b088;
  color: #fff;
  border: none;
  border-radius: 15px;
  font-family: "Mulish", sans-serif;
  font-size: 14px;
  box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.3);

  &:hover {
    background-color: #849e76;
    cursor: pointer;
  }
}
@media screen and (min-width: 768px) {
  button {
    text-align: center;
    padding: 8px 15px;
    font-size: 18px;
    border-radius: 20px;
  }
}
</style>
