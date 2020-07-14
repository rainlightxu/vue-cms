<template>
    <div class="photo_container">
        <!-- 大标题 -->
        <h4 class="photo_title">
            {{photoInfo.title}}
        </h4>
        <!-- 子标题 -->
        <p class="photo_subtitle">
            <span>发表时间：{{photoInfo.add_time | dateFormat}}</span>
            <span>点击次数: {{photoInfo.click}}次</span>
        </p>
        <hr/>
        <!-- 图片缩略图 -->
        <div class="thumbs">
            <!-- 使用下列方法时，图片无法点击预览 -->
            <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
            <!-- 使用下列方法时，图片无法正常显示 -->
            <!-- <vue-preview :slides="list" @close="handleClose"></vue-preview> -->
        </div>
        <!-- 内容 -->
        <div class="photo_content" v-html="photoInfo.content"></div>
        <!-- 评论区 -->
        <cmt-box :id="id"></cmt-box>
    </div>    
</template>
<script>
import comment from '../subcomponents/comment.vue'
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
          id: this.$route.params.id, //当前图片id
          photoInfo:{}, //存储某一张图片信息
          list:[]  //存储缩略图
        }
        
    },
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    },
    methods:{
        // 获取图片详细信息，保存到photoInfo中
        getPhotoInfo(){
            this.$http.get("api/getimageInfo/" + this.id).then(result => {
                if(result.body.status === 0){
                    this.photoInfo = result.body.message[0];
                }else {
                    Toast("获取图片详情失败");
                }
            })
        },
        // 获取当前图片的缩略图，保存到数组list中
        getThumbs(){
            this.$http.get("api/getthumimages/" + this.id).then(result => {
                if(result.body.status === 0) {
                    //循环每个图片数据，补足图片属性宽和高，目的是为了能够与图片预览插件preview-img适配
                    result.body.message.forEach(item => {
                        item.msrc = '';
                        item.alt = '';
                        item.title = '';
                        item.w = 600;
                        item.h = 400;
                    })
                    this.list = result.body.message;
                }else{
                    Toast("获取缩略图失败");
                }
            })
        },

    },
    components:{
        'cmt-box':comment
    }
}
</script>
<style lang="scss" scoped>
.photo_container{
    .photo_title{
    text-align: center;
    color: #26a2ff;
    padding: 10px;
    }
    .photo_subtitle{
    color: #ccc;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    }
    .photo_content{
    padding-left: 5px;
    padding-right: 5px;
    line-height:30px;
    }
    .thumbs{
        img{
            margin:10px;
            box-shadow:0 0 8px #999;
        }
    }
}
</style>