<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- item in LunbotuList 中LunbotuList是由父组件传过来的 -->
            <mt-swipe-item v-for="item in LunbotuList" :key="item.id">
                <!-- isFull也是由父组件传过来的。 另外class属性用到了v-bind指令绑定数据和元素属性，其中full的引号可加可不加-->
                <img :src="item.img" :class="{'full':isFull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    },
    // 用于接收从父组件传过来的变量，放到数组props中
    props:["LunbotuList","isFull"]
}
</script>
<style lang="scss" scoped>
    .mint-swipe{
        height: 100px;
        .mint-swipe-item{
            text-align:center;
            // &:nth-child(1){
            //    background-color: red; 
            // }
            // &:nth-child(2){
            //    background-color: blue; 
            // }
            // &:nth-child(3){
            //    background-color: cyan; 
            // }
            img{
                height:100%;
                //width:100%;
            }
        }
    }
    .full{
        width:100%;
    }
</style>