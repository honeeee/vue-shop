import axios from 'axios';// 


// 최종 회원정보 저장(회원가입)
async function addUserInfo(user){
    return await axios.post('http://localhost:3000/user', user, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
}




export {
    addUserInfo,
}
