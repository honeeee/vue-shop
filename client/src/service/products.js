import axios from 'axios';

// 2021.12.21
function abc (data){
    return data.map(d => {
        // return {...d}
        // return d -> 이것도 같은데 위에는 복사개념이다
        // ...은 다 풀어서 넘겨주는거 
        return {
            ...d,
            price: d.price // 이렇게 하면 기존값에 엎어친다.
        }
    })
}

function getProduct(){
    return fetch('http://localhost:3000/products')
    .then(res => res.json()) // .then(data => data)
                            // then안에는 functiond을써야하고 무조건 리턴해줘야함 제발..
    .then(abc) // 이렇게 쓰려면 안에가 함수여야한다!! 함수는 위에
                // map도 받는 인자가 function임
}
// promise 는  return 을 해줘야 그게 프로미스임.

async function getProducts2(){      // async는 무조건 promise함수임!!
    const res = await fetch('http://localhost:3000/products')
    return await res.json(); // res도 promise이니까 이것도 await붙여줘!!
}

// 받는건 똑같이 받는다 구현문법만 다를뿐
// 글로벌 ㅅ콥에서는 await은 못쓴다! -> function으로 감싸줘

// 데이터는 언제 오는지 상관없다 

// id받아서 id별 정보 보여주기
async function getProductId(id){ 
    const res = await fetch(`http://localhost:3000/products/${id}`)
    return await res.json(); 
}


// 1/4일
// axios버전
async function getProducts3(){
    const res = await axios('http://localhost:3000/products')
    return res.data(); //
}

// 타입스크립트는 위에 객체 타입 domian처럼 선언 
// fetch, axios 같은 post 방식이지만 형태가 좀 다름
// 1. fetch
async function addProductFetch(product){
    return await fetch('http://localhost:3000/products',{
        method: 'post',
    headers: {
        'Content-Type': 'apllication/json'
    },
    body: JSON.stringify(product)

    });
}
// axios
async function addProduct(product){
    return await axios.post('http://localhost:3000/product', product,{
        headers:{
            'Content-Type': 'application/json'
        },
    });
}

// cart에 아이템 추가
async function addItemToCart(item){
    return await axios.post('http://localhost:3000/cart', item, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}

// cart목록조회
async function getAllCartItem() {
    const res = await axios.get('http://localhost:3000/cart')
    return res.data;
}

// cart아이템 삭제
async function deleteCartItem(id){
    try{
        await axios.delete(`http://localhost:3000/cart/${id}`)
        return true;
    }catch (e) {
        return false;
    }
}


export {
    getProduct, 
    getProducts2,
    getProductId,
    addProductFetch, // fetch형식으로 아이템추가
    addProduct, // axios형식으로 아이템 추가
    addItemToCart,
    getAllCartItem,
    deleteCartItem,

}

// vue파일은 실제로 글로벌스콥에서 실행되는게 아니다.

