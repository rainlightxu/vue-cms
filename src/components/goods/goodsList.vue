<template>
    <div class="goods_list">
        <!-- 使用vue-router实现页面的跳转如下 -->
        <!-- <router-link class="goods_item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsInfo/' + item.id" tag="div">
            <img :src="item.img_url" alt="" >
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>特卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->
        <!-- 使用编程式导航实现页面的跳转如下 -->
        <div class="goods_item" v-for="item in goodsList" :key="item.id" @click="goDetails(item.id)">
            <img :src="item.img_url" alt="" >
            <h3 class="title">{{item.title}}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>特卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMoreGoods">加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            //组件私有数据
            pageindex:1, //当前页数，初始值是1
            goodsList:[], //商品列表数据
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        // 获取图片列表，保存到goodsList数组中,数据格式为：
        // [{id:87,img_url:"",title:"",zhaiyao:"",market_price:3455,sell_price:2344,stock_quantity:34,click:1,add_time:""}]
        getGoodsList(){
            this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
                if(result.body.status === 0){
                    // this.goodsList = result.body.message;
                    // 使用concat函数来连接第一页和第二页，第三页...的数据
                    this.goodsList = this.goodsList.concat(result.body.message);
                }
            })
        },
        // 点击加载更多按钮后，调用此函数
        getMoreGoods(){
            this.pageindex++;
            this.getGoodsList();
        },
        //使用导航式路由实现页面的跳转
        goDetails(id){
            //编程式导航实现方式
            //最简单的方式
            // this.$router.push("/home/goodsInfo/" + id);
            //传递对象
            // this.$router.push({path:"/home/goodsInfo/" + id});
            //传递命名的路由
            this.$router.push({name:"goodsInfo",params:{id:id}})
        }
    }
}
</script>
<style lang="scss" scoped>
.goods_list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods_item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 16px;
            font-weight: bold;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 14px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 15px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}

</style>