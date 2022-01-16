<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import {useRouter } from 'vue-router';

const userId = ref<string>();
const password = ref<string>();
const router = useRouter()

async function login(){
    if(!userId.value){
        const fo = document.getElementById('userId');
        fo?.focus();
        alert('아이디를 입력하세요');
        return false;
    }
    
    if(!password.value){
        const fo = document.getElementById('password');
        fo?.focus();
        alert('비밀번호를 입력하세요');
        return false;
    }

    idYn()

    async function idYn(){
        const res = await axios.get('http://localhost:3000/user/?userId='+userId.value);
        //const pw = res.data[0].password; --> res가 null이면 에러.

        if(res.data.length == 0){
            alert('존재하지않는 ID입니다.');
            return false;
        }else if(res.data[0].password != password.value){
                alert('비밀번호가 일치하지 않습니다.');
                return false;
        }
        alert('로그인 성공');
        userId.value="";
        password.value="";
        router.push('/products');
    }
}

</script>

<template>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
<div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
    <h3 class="text-2xl font-bold text-center">Login</h3>
    <form action="">
    <div class="mt-4">
        <div>
        <label class="block" for="userId">UserId</label>
            <input type="text" placeholder="UserId" v-model="userId" name="userId"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>        
        <div class="mt-4">
        <label class="block">Password</label>
            <input type="password" placeholder="Password" v-model="password" autocomplete="on" name="password"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>        
        <div class="flex">
        <button @click.prevent="login" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
            Login</button>
        </div>      
    </div>
    </form>
</div>
</div>
</template>


<style scoped>
</style>