<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import {getProduct} from '../service/products';

const route = useRoute();
const router = useRouter();
const id = route.query.id as string

const product = ref<any[]>({})
async function loadProdout(){
  product.value = await getProduct(id);
}
loadProdout();

</script>

<template>
  
<h1>제품정보</h1>

<div>
  <button>뒤로가기</button>
</div>

    <ul> 
    <li>제품명 : {{ product.name }}</li>
    <li>제품명 : {{ product.name }}</li>
    <li>제품명 : {{ product.name }}</li>
    </ul>




</template>

<style scoped>

</style>
