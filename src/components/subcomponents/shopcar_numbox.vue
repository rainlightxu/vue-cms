<template>
        <div class="mui-numbox" data-numbox-min='0' style="height:25px;width:110px">
            <!-- "-"按钮，点击可减小当前数值 -->
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" :value="initCount" 
            @change="countChanged" ref="numbox" readonly/>
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
                this.$store.commit("updateCar",{
                    id:this.goodId,
                    count:this.$refs.numbox.value
                })
            }
        },
        props:["max","initCount","goodId"],
            
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