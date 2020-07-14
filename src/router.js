import VueRouter from 'vue-router'

//导入组件
import home from './components/tabbar/homeContainer.vue'
import member from './components/tabbar/memberContainer.vue'
import shopcar from './components/tabbar/shopcarContainer.vue'
import search from './components/tabbar/searchContainer.vue'

import newsList from './components/news/newsList.vue'
import newsInfo from './components/news/newsInfo.vue'

import photoList from './components/photos/photoList.vue'
import photoInfo from './components/photos/photoInfo.vue'

import goodsList from './components/goods/goodsList.vue'
import goodInfo from './components/goods/goodInfo.vue'
import goodDesc from './components/goods/goodDesc.vue'
import goodComment from './components/goods/goodComment.vue'
//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/member',component:member},
        {path:'/shopcar',component:shopcar},
        {path:'/search',component:search},
        {path:'/home/newslist',component:newsList},
        {path:'/home/newsInfo/:id',component:newsInfo},
        {path:'/home/photoList',component:photoList},
        {path:'/home/photoInfo/:id',component:photoInfo},
        {path:'/home/goodsList',component:goodsList},
        {path:'/home/goodsInfo/:id',component:goodInfo,name:'goodsInfo'},
        {path:'/home/goodsDesc/:id',component:goodDesc},
        {path:'/home/goodComment/:id',component:goodComment,name:'goodComment'}
    ],
    linkActiveClass:'mui-active',//在点击导航栏的时候，让被点击的那一个有背景色，其他的没有背景色
})

export default router