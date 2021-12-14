<script setup lang="ts">
import {ref} from 'vue';

const users2 = ref([
  {"id": 1, "name": "홍길동", "age": 22},
  {"id": 2, "name": "강감찬123", "age": 43},
  {"name": "바붕이", "age": 99, "id": 3},
]);

// fetch ~ promise
let users3 = ref<any[]>([]);
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(json => users3.value = json);

const promise = fetch('http://localhost:3000/users');
promise
    .then(function(response) {
      return response.json()
    })
    .then(json => users3.value = json);

// async ~ await
let users = ref<any[]>([]);

async function loadUsers() {
  const response = await fetch('http://localhost:3000/users');
  users.value = await response.json();
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
