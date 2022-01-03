import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import {createRouter,createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import Products from './views/Products.vue'
import Product from './views/Product.vue'
import { createStore } from 'vuex'

// const Home = { template: '<div>Home</div>' }
// const Product = { template: '<div>Product</div>' }

// 2. Define some routes
// vue-route : url주소를 특정컴포넌트에 매핑시켜주는곳 -> client에 npm install ver-router 해줌
// npm install vue-router@4 뷰3 qhwhs
const routes = [
  { path: '/', component: Home },
  { path: '/product', component: Product },
  { path: '/products', component: Products }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })


// Create a new store instance.
const store = createStore<{cart: number[]}>({
  state () {
    return {
      cart: [ 1,2 ],
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
