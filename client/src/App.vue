<script setup lang="ts">
import {ref} from 'vue';

const users2 = ref([
  {"id": 1, "name": "홍길동1", "age": 22},
  {"id": 2, "name": "홍길동2", "age": 43},
  {"name": "홍길동3", "age": 11, "id": 3},
]);


// fetch ~ promise
let users3 = ref<any[]>([]);
fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(json => users3.value = json);

const promise = fetch('http://localhost:3000/users');//패치가 실행되서 프라미스가 리턴되면
promise  //그게 오면 
  .then(response => response.json())//json으로 호출하면 json으로 데이터 줌
  // .then(function(response) {
  //    return response.json()
  //  }) 
  .then(json => users3.value = json);
//패치가 프라미스를 리턴
//데이터를 받으면 

// ajax
// $.ajax( success ~~ ) 문법이 위에처럼 바뀐거임


// async ~ await
let users3 = ref<any[]>([]);
async function loadUsers() {
  const response = await fetch('http://localhost:3000/users');
  return await response.json();

}

loadUsers();
</script>

<template>
  <ul>
    <li v-for="user in users" :key="user.id">{{user.id}}. {{user.name}} / {{user.age}}</li>
  </ul>
</template>

<style>
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 3rem;
  padding: 0 2rem;
  background: #38ada9;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
