<template>
    <div>
        <!-- 调用com-box组件，并给评论盒子组件传递物品id，针对这一id进行加载评论信息，其中商品，图片和新闻评论公用一个组件 -->
        <com-box :id="id"></com-box>
    </div>
</template>
<script>
    import comment from '../subcomponents/comment.vue'
    export default {
        data(){
            return{
                id:this.$route.params.id
            }
        },
        components:{
            'com-box':comment
        }
    }
</script>
<style></style>