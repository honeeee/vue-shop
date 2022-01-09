<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {addItemToCart} from '../service/products';


function addToCart() {
  const item =  {
    id: 10,
    qty: 5
  }
  addItemToCart(item)
}
</script>

<template>
  <h1> home! </h1>
  <button @click="addToCart">장바구니에 담기</button>


</template>

<style scoped>
button {@apply px-2 py-1 border bg-blue-100 rounded;}
</style>
