import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || []
  }),
  actions: {
    addToCart(newProduct) {
      // Finding an existing product in the `cartProducts` array based on the `name`property of the new product being added to the cart.
      const existingProduct = this.cartProducts.find(
        (product) => product.name === newProduct.name
      )

      // Handling the logic for adding a new product to the cart
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity
        existingProduct.total = existingProduct.quantity * existingProduct.price
      } else {
        this.cartProducts.push(newProduct)
      }

      // Storing the `cartProducts` array into the browser's local storage.
      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts))
    },
    // Removes a product from the cart based on the product name provided as an argument.
    removeFromCart(productName) {
      const index = this.cartProducts.findIndex(
        (product) => product.name === productName
      )
      if (index !== -1) {
        this.cartProducts.splice(index, 1)
      }
      localStorage.setItem("cartProducts", JSON.stringify(this.cartProducts))
    },
    // Clears the cart products in the state and also clears the local storage.
    clearCart() {
      this.cartProducts = []
      localStorage.removeItem("cartProducts")
    }
  },
  getters: {
    getCartProducts(state) {
      return state.cartProducts
    },
    totalCartQuantity(state) {
      let sum = 0
      state.cartProducts.forEach((product) => {
        sum += product.quantity
      })
      return sum
    }
  }
})
