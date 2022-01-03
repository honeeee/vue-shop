import vue from 'vue'
import vuex from 'vuex'
import DB from '../db.json'

vue.use(vuex)
// 뷰의 상태관리기능

export const store = new vuex.store({

    state:{
        db:[],
        cart:[],

    },
    actions:{
        dbInit({commit}){
            const res = DB
            const data = res.data.map(d =>({
                id: d.id,
                name:d.name,
                price:d.price
            }))
            commit('setDB',data)
        },

        // 추가버튼 클릭시
        addToCart({state, commit}, product){
            const item = state.db.find(item => item.id === product.id);
            commit('pushToCart',item)
        }

    },
    mutations:{
        setDB(state, data){
            state.db = data;
        },
        pushToCart(state, product){
            state.cart.push({
                id: product.id,
                name:product.name,
                price = product.price,
                quantity: 1,

                
            });
        },

    },
    getters:{

    }

})