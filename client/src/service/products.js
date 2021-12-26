// 2021.12.21

function abc (data){
    return data.map(d => {
        // return {...d}
        // return d -> 이것도 같은데 위에는 복사개념이다
        // ...은 다 풀어서 넘겨주는거 
        return {
            ...d,
            price: d.price + '원'// 이렇게 하면 기존값에 엎어친다.
        }
    })
}

function getProduct(){
    return fetch('http://localhost:3000/products')
    .then(res => res.json())
                            // .then(data => data)
                            // then안에는 functiond을써야하고 무조건 리턴해줘야함 제발..
    .then(abc)
                        // 이렇게 쓰려면 안에가 함수여야한다!! 함수는 위에
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

// id받는 함수추가!!
async function getProductId(id){ 
    const res = await fetch(`http://localhost:3000/products/${id}`)
    return await res.json(); 
}



export {getProduct, getProducts2,getProductId}

// vue파일은 실제로 글로벌스콥에서 실행되는게 아니다.


// 디자인템플릿 적용
// 장바구니 담기
// 이벤트헨들링
// 
