<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {getProductId} from '../service/products';

const route = useRoute()
const router = useRouter()
const id = route.query.id as string

const product = ref<any[]>({})
async function loadProdout(){
  product.value = await getProductId(id)
}
loadProdout()

function addCart(){
  
}

</script>

<template>
  
<h1>제품정보</h1>

<div>
  <button class="bg-gray-200 px-4 py-2 rounded" @click="router.back">뒤로가기</button>
</div>
    <ul> 
      <li>ID : {{ product.id }}</li>
      <li>제품명 : {{ product.name }}</li>
      <li>가격 : {{ product.price }}원</li>
      <hr style="size: 9"/>
      <li>{{ product.explan }}</li>
    </ul>
    <div>
      <button class="bg-gray-200 px-4 py-2 rounded" @click="addToCart">장바구니 추가</button>
    </div>

</template>

<style scoped>

</style>
