<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {getProductId, getCategoryProduct} from '../service/products';

const route = useRoute()
const router = useRouter()
const id = route.query.id as string

const product = ref<any[]>({})
const recommList = ref<any[]>({})

async function loadProdout(){
  product.value = await getProductId(id)

  // 같은 카테고리 상품 추천목록
  recommList.value = await getCategoryProduct(product.value.category)
// console.log(recommList.value.length)

  for(var i = 0; i < recommList.value.length; i++){ 
    if (recommList.value[i].id === product.value.id) { 
      recommList.value.splice(i, 1); 
      i--; 
    }
  }
}

loadProdout()

</script>

<template>
  <div>
    <button class="bg-gray-200 px-4 py-2 rounded" @click="router.back">뒤로가기</button>
  </div>
  <div style="text-align:center">
    <a class="items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">제품정보</a>
    <br/>
    <br/>
  </div>

  <main class="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">
    <section class="bg-white py-8">
      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <ul> 
          <li>ID : {{ product.id }}</li>
          <li>제품명 : {{ product.name }}</li>
          <li>가격 : {{ product.price }}원</li>
          <hr style="size: 9"/>
          <li>[{{ product.category }}]</li>
          <li>{{ product.explan }}</li>
        </ul>
        <!-- <div>
        <button class="bg-gray-200 px-4 py-2 rounded" @click="addToCart">장바구니 추가</button>
        </div> -->
      </div>
    </section>
    <section class="bg-white py-8">
      <div style="text-align:center">
        <a class="items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-l">비슷한 상품을 확인하세요</a><br/><br/>
      </div>
<div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
      <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col" v-for="recomm in recommList" :key="recomm.id">
        <router-link :to="`/product?id=${recomm.id}`">
          <img class="hover:grow hover:shadow-lg" src="https://images.unsplash.com/photo-1555982105-d25af4182e4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&h=400&q=80">
            <div class="pt-3 flex items-center justify-between">
                <p class="">{{recomm.name}}</p>
            </div>
        </router-link>
      </div>
</div>

    </section>
  </main>



</template>

<style scoped>

</style>
