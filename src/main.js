//导入vue
import Vue from 'vue'
//1.1导入vue-router
import VueRouter from 'vue-router'
//1.2手动安装VueRouter
Vue.use(VueRouter)

//导入根组件app组件
import App from './App.vue'
//1.3导入自己的路由模块（路由的抽离）
import router from './router.js'
    
//2.1导入vue-resource
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)
//2.3设置全局接口地址
Vue.http.options.root = 'http://www.liulongbin.top:3005';

//全局设置post表单数据格式
Vue.http.options.emulateJSON = true;

//导入bootstrap样式表
import 'bootstrap/dist/css/bootstrap.css'

//导入mui
import './lib/mui/css/mui.min.css'
//导入mui中的扩展图标样式
import './lib/mui/css/icons-extra.css'

// //1.1按需导入Mint-UI
// import { Header ,Swipe, SwipeItem, Button, lazyload} from 'mint-ui'
// //1.2注册组件
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Header.name, Header);
// Vue.component(Button.name, Button);
// Vue.component(lazyload.name, lazyload);

// 完整导入mint-ui
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入图片预览插件 貌似不能用呦~~~~
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入格式化时间组件
import moment from 'moment'
//创建全局日期时间过滤器 pattern样式为YYYY-MM-DD hh:mm:ss
Vue.filter('dateFormat',function(dateStr,pattern="YYYY-MM-DD hh:mm:ss"){
    return moment(dateStr).format(pattern)
})

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次进入网站，从本地存储中把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state:{
        car:car //将购物车中商品的数据用一个数组存储起来，在car中存储一些商品的对象，对象包括：id，count，price，selected
    },
    mutations:{
        addToCar(state,good){
            //判断购物车中是否有此商品
            var flag = false
            state.car.some(item => {
                if(item.id === good.id){
                    // 购物车中已经有此商品，则只需要增加商品数量就行了
                    item.count += parseInt(good.count)
                    flag = true
                    // console.log(state.car)
                    return true
                }

            })
            //如果car中无此商品，则将此商品信息push到car中
            if(!flag) {
                state.car.push(good)
                // console.log(state.car)
            }
            //将商品存储到浏览器的localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateCar(state,obj){
            state.car.some(item => {
                if(item.id === obj.id){
                    // 购物车中已经有此商品，则只需要增加商品数量就行了
                    item.count = parseInt(obj.count)
                    return true
                }
            })
            //当修改完购物车数据后，把最新的数据放到localhost中
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            state.car.some((item,i)=>{
                if(item.id === id){
                    state.car.splice(i,1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id === info.id){
                    item.selected = info.selected
                    return
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state){
            var o = []
            state.car.forEach(item=>{
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state){
            var o = {}
            state.car.forEach(item=>{
                o[item.id] = item.selected
            })
            return o
        },
        getSelectedCountAndPrice(state){
            var c = {
                selectedCount:0,
                selectedPrice:0
            }
            state.car.forEach(item=>{
                if(item.selected == true){
                    c.selectedCount += item.count
                    c.selectedPrice += item.price * item.count
                }
            })
            return c
        }
    }
})
//创建vue实例
var vm = new Vue({
    el:'#app',//指向index.html中id为app的div标签
    data:{
        //定义数据
    },
    router,//挂载路由，这是缩写形式，完整写法是：router:router
    render:c=>c(App),//挂载App.vue组件。render会将App.vue组件替换掉index.html中id为app的div标签。这是缩写形式，完整写法是：
    // function(createElements){
    //     var html = createElements(App)
    //     return html
    // }
    store,
})