<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {getProductId, getCategoryProduct} from '../service/products';

const route = useRoute()
const router = useRouter()




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


    </section>
  </main>



</template>

<style scoped>

</style>
