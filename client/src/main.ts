import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import {createRouter,createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import Product from './views/Product.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Cart from './views/Cart.vue'

import Join from './views/Join.vue'
import { createStore } from 'vuex'

// const Home = { template: '<div>Home</div>' }
// const Product = { template: '<div>Product</div>' }

// 2. Define some routes
// vue-route : url주소를 특정컴포넌트에 매핑시켜주는곳 -> client에 npm install ver-router 해줌
// npm install vue-router@4 뷰3 qhwhs
const routes = [
  { path: '/', component: Home },
  { path: '/product', component: Product },
  { path: '/products', component: Products },
  { path: '/join', component: Register },
  { path: '/login', component: Login },
  { path: '/cart', component: Cart },

]


const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })


// Create a new store instance.
const store = createStore<{cart: number[]}>({
  state () {
    return {
      cart: [],
      user: [],
    }
  },
  mutations: {
    toggleItem (state, id) {
      const index = state.cart.indexOf(id);

      if(index > -1) { //존재하면 
        state.cart.splice(index,1);
      }else{
        state.cart.push(id);
      }
    },
  }
})

createApp(App).use(router).use(store).mount('#app')
