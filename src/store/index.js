import { createStore } from "vuex"
import axios from "axios"

const store = createStore({
  state() {
    return {
      /* The code snippet you provided is defining the initial state of the Vuex store. Here's what
      each property is doing: */
      loading: false,
      products: [],
      cartProducts: JSON.parse(localStorage.getItem("cartProducts")) || []
    }
  },
  // Mutations are synchronous operations that take the state as the first argument and optional data as the second argument. They are responsible for actually changing the state based on the payload or other logic.
  mutations: {
    setLoading(state, isLoading) {
      state.loading = isLoading
    },

    setProducts(state, products) {
      state.products = products
      state.loading = false
    },

    addToCart(state, newProduct) {
      // Finding an existing product in the `cartProducts` array based on the `name`property of the new product being added to the cart.
      const existingProduct = state.cartProducts.find(
        (product) => product.name === newProduct.name
      )

      // Handling the logic for adding a new product to the cart in a Vuex store.
      if (existingProduct) {
        existingProduct.quantity += newProduct.quantity
        existingProduct.total = existingProduct.quantity * existingProduct.price
      } else {
        state.cartProducts.push(newProduct)
      }

      // Storing the `cartProducts` array from the Vuex store into the browser's local storage.
      localStorage.setItem("cartProducts", JSON.stringify(state.cartProducts))
    },

    // Removes a product from the cart based on the product name provided as an argument.
    removeFromCart(state, productName) {
      const index = state.cartProducts.findIndex(
        (product) => product.name === productName
      )
      if (index !== -1) {
        state.cartProducts.splice(index, 1)
      }
    },

    // Clears the cart products in the state and also clears the local storage.
    clearCart(state) {
      state.cartProducts = []
      localStorage.clear()
    }
  },

  // Actions are methods used to handle asynchronous operations or any other complex logic
  actions: {
    // The function fetches products data from a JSON file using axios in a Vue.js application and updates the state accordingly ('setLoading', 'setProducts').
    async fetchProducts({ commit }) {
      commit("setLoading", true)
      try {
        const response = await axios.get(
          "https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json"
        )
        commit("setProducts", response.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit("setLoading", false)
      }
    }
  },
  // Getters allow you to retrieve and compute derived state based on the store's state.
  getters: {
    getProducts(state) {
      return state.products
    },
    isLoading(state) {
      return state.loading
    },
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

export default store
