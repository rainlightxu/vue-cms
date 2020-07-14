<template>
    <div>
        <ul class="mui-table-view">
                <!-- 新闻列表 -->
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                    <!-- router-link的to属性参数拼接注意加引号 -->
					<router-link :to="'/home/newsInfo/' + item.id" class="">
                        <!-- src属性绑定newsList里的每一个item的img_url -->
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h4>{{item.title}}</h4>
							<p class="mui-ellipsis">
                                <!-- 全局时间过滤器可传参也可不传默认就是YYYY-MM-DD hh:mm:ss -->
                                <span>发表时间：{{item.add_time | dateFormat(pattern = "YYYY-MM-DD hh:mm:ss")}}</span>
                                <span>点击次数：{{item.click}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>   
    </div>    
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            newsList:[], //存储新闻列表信息
        }
    },
    created(){
        this.getNewsList()
    },
    methods:{
        // 获取新闻列表，并保存到newsList数组中，数组格式为：
        // [{id:1,title:"",img_url:"",zhaiyao:"",click:0,add_time:""},{},{}]
       getNewsList(){
        this.$http.get("api/getnewslist").then(result=>{
            if(result.body.status === 0){
                this.newsList = result.body.message
            }else{
                Toast("获取新闻列表失败")
            }
        })
    } 
    }
    
}
</script>
<style lang="scss" scoped>
.mui-ellipsis{
    font-size:12px;
    color: blue;
    // 下两行代码的作用是行内两端对齐
    display: flex;
    justify-content: space-between;
}
</style>