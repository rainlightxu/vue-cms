<template>
    <div class="goodDesc-container">
        <h3>{{goodDesc.title}}</h3>
        <hr>
        <div class="content" v-html="goodDesc.content">
        </div>
    </div>

</template>
<script>
export default {
    data(){
        return {
            goodDesc:{} //存储某个商品的图文介绍信息
        }
    },
    created(){
        this.getGoodDesc();
    },
    methods:{
        // 得到某一个商品的图文介绍
        getGoodDesc(){
            this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(result => {
                if(result.body.status === 0){
                    // 注意：返回值是一个数组，数组中就包含一个对象
                    this.goodDesc = result.body.message[0]
                }
            })
        }
    }
}
</script>
<style lang="scss" >
.goodDesc-container{
    padding:5px;
    h3{
        font-size:16px;
        color:blue;
        text-align:center;
        margin:10px 0;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>