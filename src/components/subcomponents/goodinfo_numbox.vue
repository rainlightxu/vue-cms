<template>
        <div class="mui-numbox" data-numbox-min='0'>
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" value="1" @change="countChanged" ref="numbox"/>
            <!-- "+"按钮，点击可增大当前数值 -->
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
</template>
<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        mounted(){
            mui(".mui-numbox").numbox();
        },
        methods:{
            countChanged(){
                // console.log(this.$refs.numbox.value)
                // 用refs来获取当前input框里的数量，然后将值通过函数调用传递给父组件
                this.$emit("getCount",parseInt(this.$refs.numbox.value))
            }
        },
        props:["max"],
            
        watch:{
            //使用js api设置max的最大值
            'max':function (newVal,oldVal) {
                    mui(".mui-numbox").numbox().setOption('max',newVal)
                }
        }
    }
</script>
<style lang="scss" scoped>

</style>