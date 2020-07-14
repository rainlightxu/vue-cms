<template>
    <div>
        <!-- 顶部滑动区域 -->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']"  v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>
		</div>
        <!-- 图片列表区域 -->
        <ul class="photo_list">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoInfo/' + item.id" tag="li">
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <div class="title">
                            {{item.title}}
                        </div>
                        <div class="body">
                            {{item.zhaiyao}}
                        </div>
                    </div>
            </router-link>
            
        </ul>
    </div>
</template>
<script>
// 1导入mui
import mui from '../../lib/mui/js/mui.min.js'
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            cates:[], //存储图片分类
            list:[] //存储某一类下图片列表
        }
    },
    mounted(){
        // 2初始化scroll控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    created(){
        this.getPhotoCategory();
        this.getPhotoListByCateId(0);
    },
    methods:{
        // 获取图片分类数据：分类有家居生活，摄影设计，明星美女等
        getPhotoCategory() {
            this.$http.get("api/getimgcategory").then(result => {
                if(result.body.status === 0){
                    // 在分类前加上一个分类即全部，指定其id为0
                    result.body.message.unshift({title:"全部",id:0});
                    this.cates = result.body.message;
                }else{
                    Toast("获取图片分类失败");
                }
            })
        },
        // 获取图片列表信息保存到list中，数组格式为：
        // [{add_time: "2015-04-18T04:30:50.000Z",call_index: "",category_id: 17,channel_id: 9,click: 0,
        // content: "",id: 37,img_url: "",is_hot: 0,is_red: 1,...}]
      
        getPhotoListByCateId(cateId) {
            this.$http.get("api/getimages/" + cateId).then(result => {
                if(result.body.status === 0){
                    this.list = result.body.message;
                }else{
                    Toast("获取图片失败");
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
*{
    touch-action:pan-y;
}
.photo_list{
    
    list-style:none;
    margin:0;
    padding:10px;
    padding-bottom:0;
    li{
        text-align:center;
        background-color:#ccc;
        margin-bottom:10px;
        box-shadow:0 0 6px #999;
        position: relative;
        img{
            width:100%;
            vertical-align:middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            background-color: rgba(0,0,0,0.4);
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            max-height: 84px;
            .title{
                font-size: 14px;
                font-weight: bold;
            }
            .body{
                font-size: 13px;

            }
        }
    }
    
}

</style>