<template>
    <div>
        <!-- 轮播图 -->
        <!-- 在组件中引用组件三步走：
                1.导入组件 import swiper from '../subcomponents/swiper.vue'
                2.挂载组件 components:{swiper} 这是缩写形式，完整写法是：components:{'swiper-box':swiper}，其中swiper-box是组件的别名
                3.使用<swiper></swiper>
                注意：父组件向子组件传值：用属性绑定:xx="yy",xx是子组件中props中定义的变量，yy是父组件data定义的变量，也即传入子组件的变量
         -->
        <swiper :LunbotuList="LunbotuList" :isFull="true"></swiper>
        <!-- 九宫格 -->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
		                    <img src="../../images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoList">
		                    <img src="../../images/menu2.png" alt="">
		                    <div class="mui-media-body">照片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodsList">
		                    <img src="../../images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></a></li>
		        </ul> 
		</div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import swiper from '../subcomponents/swiper.vue'
export default {
    data(){
        return{
            LunbotuList:[], //轮播图数组，用于存储轮播图数据
        }
    },
    created(){
        this.getLunbotu()
    },
    methods:{
        // 使用vue-resource来获取首页轮播图，保存到LunbotuList数组中，
        // 格式为[{id:1,img:"http://www.itcast.cn/subject/webzly/images/1.jpg",url:"http://www.itcast.cn/subject/phoneweb/index.html"},{},{}]
        getLunbotu(){
            this.$http.get("api/getLunbo").then(result =>{
                if(result.body.status === 0) {
                    this.LunbotuList = result.body.message
                }else {
                    Toast('轮播图加载失败');
                }
            })
        }
    },
    components:{
        swiper
    }
}
</script>
<style lang="scss" scoped>
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        img{
            width: 60px;
            height: 60px;
        }
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size: 13px;
        //text-decoration: none;
    }
    :any-link{
        text-decoration: none;
    }
    
</style>