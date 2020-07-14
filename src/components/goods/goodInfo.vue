<template>
    <div class="goodsInfo-container">
        <!-- 加入购物车半场小球动画 -->
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
            <p class="ball" v-show="ballFlag" ref="ball"></p>
        </transition>
        <!-- 轮播图 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <swiper :LunbotuList="lunbotuList" :isFull="false"></swiper>
					</div>
				</div>
		</div>
        <!-- 商品购买 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodInfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>
                            市场价：<del>￥{{goodInfo.market_price}}</del>&nbsp;&nbsp;&nbsp;
                            折扣价：<span class="sell_price">￥{{goodInfo.sell_price}}</span>
                        </p>
                        <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodInfo.stock_quantity"></numbox> </p>
                        <div>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                            <!-- 子组件向父组件传值 -->
                        </div>
					</div>
				</div>
			</div>
        <!-- 商品参数信息 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品编号：{{goodInfo.goods_no}}</p>
                        <p>库存情况：{{goodInfo.stock_quantity}}</p>
                        <p>上架时间：{{goodInfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
// 导入组件
import swiper from '../subcomponents/swiper.vue'
import numbox from '../subcomponents/goodinfo_numbox.vue'

export default {
    data(){
        return{
            id:this.$route.params.id, //当前商品id
            lunbotuList:[], //存储轮播图信息，并传递给swiper组件
            goodInfo:{}, //存储某个商品信息，是一个对象
            ballFlag:false,//控制小球显示与隐藏
            selectedCount:1 //选择商品的数量，默认是1
        }
    },
    
    created(){
        this.getLunbotu();
        this.getGoodInfo();
    },
    methods:{
        // 获取某一商品下的商品详情页中的图片轮播图
        getLunbotu(){
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0){
                    // 先循环轮播图数组的每一项，为item添加img属性，，因为轮播图组件中，只认识item.img
                    // 不认识item.src
                    result.body.message.forEach(item => {
                        item.img = item.src
                    })
                    this.lunbotuList = result.body.message;
                }
            })
        },
        // 获取某一商品详细信息,保存到goodInfo中
        getGoodInfo(){
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
                if(result.body.status === 0) {
                    // 注意：返回值是一个数组，拿到数组的第一个即为此商品信息
                    this.goodInfo = result.body.message[0];
                }
            })
        },
        // 点击图文介绍按钮，响应此函数
        goDesc(id){
            //使用编程式导航跳转到图文介绍页面
            this.$router.push("/home/goodsDesc/" + id);
        },
        // 点击商品评论按钮，响应此函数
        goComment(id){
            //使用编程式导航跳转到商品评论页面
            this.$router.push({name:"goodComment",params:{id}})
        },
        // 点击加入购物车按钮，响应此函数
        addToShopCar(){
            this.ballFlag = !this.ballFlag;
            //点击加入购物车按钮，将商品信息保存到一个数组中
            var good = {
                id:this.id,
                count:this.selectedCount,
                price:this.goodInfo.sell_price,
                selected:true
            }
            // 调用vuex store中addToCar
            this.$store.commit("addToCar",good)
        },
        // 实现小球动画
        beforeEnter(el){
            el.style.transform = "translate(0,0)"
        },
        enter(el,done){
            //当滑动页面后，小球的最终到达位置不是在购物车的徽标上
            // 解决方案：分别获取小球和徽标的dom元素的top值和left值，然后相减，就得到了小球和徽标之间的距离
            // 定义小球的ref值为ball，并用this.$refs获取
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标的位置
            const badgePosition = document.getElementById("badge").getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.offsetWidth //必须加上这一行代码
            // el.style.transform = "translate(90px, 312px)"
            el.style.transform = `translate(${xDist}px,${yDist}px)`
            el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)"
            done() //afterEnter()函数的引用
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag
        },
        //拿到numbox中的初始值
        getSelectedCount(count){
            // 拿到numbox子组件传过来的购买数量count
            this.selectedCount = count;
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss" scoped>
.goodsInfo-container{
    background-color:#ccc;
    overflow:hidden;
    .sell_price{
         color:red;
         font-size:16px;
         font-weight:bold;
    }
    .mui-card-footer{
        display:block;
        button{
            margin:10px 0;
        }
    }
    .ball{
        height:15px;
        width:15px;
        background-color:red;
        border-radius:50%;
        position:absolute;
        z-index:99;
        top:309px;
        left:148px;
    }
}

</style>