<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import {addUserInfo} from '../service/user';
import {useRouter} from 'vue-router';

const userId = ref<string>();
const email = ref<string>();
const password = ref<string>();
const password2 = ref<string>();
const router = useRouter()

const error = ref<string>();
const messege = ref<string>();

async function signupUser(){
    // 값이 없으면 focus.........
    if(!userId.value){
        const fo = document.getElementById('userId');
        fo?.focus();
        alert('아이디를 입력하세요');
        return false;
    }
    if(!email.value){
        const fo = document.getElementById('email');
        fo?.focus();
        alert('이메일을 입력하세요');
        return false;
        
    }
    if(!password.value){
        const fo = document.getElementById('password');
        fo?.focus();
        alert('비밀번호를 입력하세요');
        return false;
    }
    if(!password2.value){
        const fo = document.getElementById('password2');
        fo?.focus();
        alert('확인 비밀번호를 입력하세요');
        return false;
    }
    checkId()
}

// userId 중복체크
async function checkId(){
    const res = await axios.get('http://localhost:3000/user/?userId='+userId.value);

    if(res.data.length > 0){
        alert('이미 등록된 아이디입니다.');
        return;
    }
    
    // password 같은지체크
    if(password.value != password2.value){
        alert('비밀번호가 일치하지않습니다.');
        return false;
    }

    const userInfo = {
            userId:userId.value,
            email:email.value,
            password:password.value
        }
    await addUserInfo(userInfo)
    alert('회원가입이 완료되었습니다!');

    userId.value="";
    email.value="";
    password.value="";
    password2.value="";
    router.push('/login');

}

</script>

<template>
<div class="flex items-center justify-center min-h-screen bg-gray-100">
<div class="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
    <h3 class="text-2xl font-bold text-center">Join us!!</h3>
    <form action="">
    <div class="mt-4">
        <div>
        <label class="block" for="userId">UserId</label>
            <input type="text" placeholder="UserId" v-model="userId"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <div class="mt-4">
        <label class="block" for="email">Email</label>
            <input type="text" placeholder="Email" v-model="email"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <div class="mt-4">
        <label class="block">Password</label>
            <input type="password" placeholder="Password" v-model="password"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <div class="mt-4">
        <label class="block">Confirm Password</label>
            <input type="password" placeholder="Password" v-model="password2"
                    class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600">
        </div>
        <!-- <span class="text-xs text-red-400">Password must be same!</span> -->
        <div class="flex">
        <button @click.prevent="signupUser" class="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
            Create Account</button>
        </div>
        <div class="mt-6 text-grey-dark">
        Already have an account?
        <a class="text-blue-600 hover:underline" href="#">
            Log in
        </a>
        </div>
    </div>
    </form>
</div>
</div>
</template>


<style scoped>
</style>