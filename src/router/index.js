import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ProductView from "../views/ProductView.vue"
import CartView from "@/views/CartView.vue"
import OrderView from "../views/OrderView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/product/:name",
      name: "product",
      component: ProductView
    },
    {
      path: "/cart",
      name: "cart",
      component: CartView
    },
    {
      path: "/order",
      name: "order",
      component: OrderView
    }
  ]
})

export default router
