<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {addItemToCart, getProduct, getCategory, getCategoryProduct} from '../service/products';
import { useStore } from 'vuex'


const products = ref<any[]>([])
const store = useStore();

async function loadCategory(){
    products.value = await getCategory();
    products.value = ([...new Set(products.value.map(JSON.stringify))].map(JSON.parse));

    //js로 중복제거는 일단 완성했는데.. uniqBy로 해보고 싶은데.. 안된다....
    //console.log(([...new Set(products.value.map(JSON.stringify))].map(JSON.parse)))

console.log(products.value);

}

function addToCart() {
  const item =  {
    id: 10,
    qty: 5
  }
  addItemToCart(item)
}





loadCategory();
</script>

<template>

  <div>
    <div class="frame">
      <button v-for="cate in products" :key="cate.category" class="custom-btn btn-2" >
          <router-link :to="`/products?category=${cate.category}`">
            {{cate.category}}
          </router-link>
      </button>
    </div>
  </div>



</template>

<style scoped>
/* button {@apply px-2 py-1 border bg-blue-100 rounded;} */

.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}
button {
  margin: 20px;
}
.custom-btn {
  width: 130px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}

/* 2 */
.btn-2 {
  background: rgb(96,9,240);
  background: linear-gradient(0deg, rgba(96,9,240,1) 0%, rgba(129,5,240,1) 100%);
  border: none;
  
}
.btn-2:before {
  height: 0%;
  width: 2px;
}
.btn-2:hover {
  box-shadow:  4px 4px 6px 0 rgba(255,255,255,.5),
              -4px -4px 6px 0 rgba(116, 125, 136, .5), 
    inset -4px -4px 6px 0 rgba(255,255,255,.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
}

</style>
