<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import {addItemToCart, deleteCartItem, getProduct} from '../service/products'
import { useStore } from 'vuex'
import axios from 'axios';
// 상세 페이지까지 만들었음
// 스크림트에서 라우터 쓰는 방법
// useRouter: link로 보낼때, 뒤로가기앞으로 가기 등등 여러 기능있음
// useRoute: 현재 이 페이지의 정보를 담고있는 객체, 변경을 감지
// fullpath
// query =내가 보낸 값들이 들어있음

// 상세페이지-넘어온 id를 받아서-tsalcuTek. const route = UseRoute()-const id = route.query.id
/** 
 * 네비에 링크 라우터로 변경해주고
 * 푸터도 나눠줌->컴포넌트 생성
 * 어바웃도 나눠주고, nav
 */
const products = ref<any[]>([])
const store = useStore();
const cart = computed(()=> store.state.cart)
// const searchText = ref<string>();
const searchText = ref("");

async function loadProducts(){
    products.value = await getProduct()
}

onMounted(()=> {
    console.log(store.state.cart)
})
async function toggleCart(id:number){
    if(cart.value.includes(id)){
        await deleteCartItem(id);
    }else{
        await addItemToCart({
            id,qty:1,
        });
    }
    store.commit('toggleItem',id);
}

async function searchProducts(){
    await loadProducts();
    // console.log(searchText.value);
    const search = computed(() => {
        return products.value.filter( poke => {
            return poke.name.toLowerCase().includes(searchText.value);
        })
    })
    return products.value = search.value;
}

function lowPrice(){
    products.value  = products.value.sort((a, b) => (a['price'] > b['price'] ? 1 : -1));
}

function sortPrice(sortName : string){
    if(sortName == 'high'){
        products.value = products.value.sort((a, b) => (a[sortName] < b[sortName] ? 1 : -1));
    }else{
        console.log('gg~')
    }
}


loadProducts();

</script>

<template>
<main class="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
    <section class="bg-white py-8">

        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">

            <nav id="store" class="w-full z-30 top-0 px-6 py-1">
                <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

                    <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
				Store
			</a>

                    <div class="flex items-center" id="store-nav-content">
                    <button @click="lowPrice">가격 낮은순</button>
                    <button @click="sortPrice('high')">가격 높은순</button>
                        <a class="pl-3 inline-block no-underline hover:text-black" href="#">
                            <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                            </svg>
                        </a>
                        <input type="text" placeholder="제품명 검색" v-model="searchText" name="searchText" @keyup.enter="searchProducts()"
                        class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">

                        <a class="pl-3 inline-block no-underline hover:text-black" @click.prevent="searchProducts()">
                            <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                            </svg>
                        </a>

                    </div>
                </div>
            </nav>
            
            <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col" 
                v-for="prd in products" :key="prd.id">
                <!-- <div v-if="prd.name.includes(searchText)"> -->
                    <router-link :to="`/product?id=${prd.id}`">
                        <img class="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80">
                        <div class="pt-3 flex items-center justify-between">
                            <p class="">{{prd.name}}</p>
                            <svg class="h-6 w-6 fill-current text-gray-500"
                                :class="{'text-red-500': cart.includes(prd.id)}"
                                @click.prevent="toggleCart(prd.id)"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
                            </svg>
                        </div>
                        <p class="pt-1 text-gray-900">{{prd.price}}</p>
                    </router-link>
                <!-- </div> -->
            </div>

        </div>

    </section>

</main>


</template>

<style scoped>
.work-sans {
  font-family: 'Work Sans', sans-serif;
}
#menu-toggle:checked + #menu {
  display: block;
}
.hover\:grow {
  transition: all 0.3s;
  transform: scale(1);
}
.hover\:grow:hover {
  transform: scale(1.02);
}
.carousel-open:checked + .carousel-item {
  position: static;
  opacity: 100;
}
.carousel-item {
  -webkit-transition: opacity 0.6s ease-out;
  transition: opacity 0.6s ease-out;
}
#carousel-1:checked ~ .control-1,
#carousel-2:checked ~ .control-2,
#carousel-3:checked ~ .control-3 {
  display: block;
}
.carousel-indicators {
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 2%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
}
#carousel-1:checked ~ .control-1 ~ .carousel-indicators li:nth-child(1) .carousel-bullet,
#carousel-2:checked ~ .control-2 ~ .carousel-indicators li:nth-child(2) .carousel-bullet,
#carousel-3:checked ~ .control-3 ~ .carousel-indicators li:nth-child(3) .carousel-bullet {
  color: #000;
  /*Set to match the Tailwind colour you want the active one to be */
}

button {@apply px-2 py-1 border bg-blue-100 rounded;}
</style>
