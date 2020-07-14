<template>
    <div class="shopcar_container">
        <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- 购物车列表 -->
                    <div class="goodlist">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h3>{{item.title}}</h3>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numbox :initCount="$store.getters.getGoodsCount[item.id]" :goodId="item.id"></numbox>
                                <!-- 删除商品按钮 -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
	    </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="total">
                        <div>
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span>{{$store.getters.getSelectedCountAndPrice.selectedCount}}</span> 件，
                            总价：<span>￥{{$store.getters.getSelectedCountAndPrice.selectedPrice}}</span></p>
                        </div>
                        
                        <mt-button type="danger">结算</mt-button>
                    </div>
                </div>
            </div>
	    </div>
    </div>
    
    
</template>
<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return {
            goodslist:[], //存储购物车列表信息
        }
    },
    created(){
        this.getGoodsList()
    },
    methods:{
        getGoodsList(){
            // 从car中拿到购物车中商品id,放到arrayId中
            var arrayId = []
            this.$store.state.car.forEach(item=>{
                arrayId.push(item.id)
            })
            // 判断arrayId是否为空
            if(arrayId.length <= 0){
                return;
            }
            this.$http.get("api/goods/getshopcarlist/" + arrayId.join(",")).then(result=>{
                if(result.body.status === 0){
                    this.goodslist = result.body.message
                    // console.log(this.goodslist)
                }
            })
        },
        remove(id,index){
            this.goodslist.splice(index,1)
            this.$store.commit("removeFromCar",id)
        },
        selectedChanged(id,val){
            this.$store.commit("updateGoodsSelected",{id:id,selected:val})
        }
    },
    components:{
        numbox
    }
}
</script>
<style lang="scss" scoped>
.shopcar_container{
    background-color: #eee;
    overflow: hidden;
    .goodlist{
        img{
            height: 60px;
            width: 60px;
            margin: 0 3px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
                font-weight: bold;
            }
            h3{
                font-size: 13px;
            }
        }
        display: flex;
        align-items: center;
    }
    .total{
        display: flex;
        justify-content: space-between;
        align-items: center;
        p{
            font-size: 16px;
            span{
                color: red;
                font-weight: bold;
            }
        }
        
    }
}
</style>