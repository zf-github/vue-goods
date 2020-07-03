import Vue from "vue"
import VueRouter from "vue-router"
import Shopping from "./components/Shopping"
import GoodsList from "./components/GoodsList"
import AddGoods from "./components/AddGoods"
import SearchGoods from "./components/SearchGoods"
import GoodsDetail from "./components/GoodsDetail"

Vue.use(VueRouter)

const routes = [
    {
        path:"/",
        component:Shopping,
        name:"shopping",
        children:[
            {
                path:"",
                component:GoodsList,
                name:"goodsList"
            },
            {
                path:"add",
                component:AddGoods,
                name:"addGoods"
            },
            {
                path:"search",
                component:SearchGoods,
                name:"searchGoods"
            },
            {
                path:"detail/:goods_id",
                component:GoodsDetail,
                name:"goodsDetail"
            }
        ]
    }
]

const router = new VueRouter({routes})

export default router