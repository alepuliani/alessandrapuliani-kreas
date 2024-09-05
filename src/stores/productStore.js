import { defineStore } from "pinia"
import axios from "axios"

export const useProductsStore = defineStore("products", {
  state: () => ({
    loading: false,
    products: []
  }),
  actions: {
    setLoading(isLoading) {
      this.loading = isLoading
    },

    setProducts(products) {
      this.products = products
      this.loading = false
    },

    // The function fetches products data from a JSON file using axios in a Vue.js application and updates the state accordingly ('setLoading', 'setProducts').
    async fetchProducts() {
      this.setLoading(true)
      try {
        const response = await axios.get(
          "https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json"
        )
        this.setProducts(response.data)
      } catch (error) {
        console.log(error)
      } finally {
        this.setLoading(false)
      }
    }
  },

  getters: {
    getProducts(state) {
      return state.products
    },
    isLoading(state) {
      return state.loading
    }
  }
})
