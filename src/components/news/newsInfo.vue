<template>
  <div class="news_container">
    <!-- 头部区域 -->
    <h4 class="news_title">{{newsInfo.title}}</h4>
    <p class="news_subTitle">
      <span>发表时间：{{newsInfo.add_time | dateFormat}}</span>
      <span>点击次数：{{newsInfo.click}}</span>
    </p>
    <hr />
    <!-- 内容区 用v-html渲染-->
    <div class="news_content" v-html="newsInfo.content"></div>
    <!-- 评论区 父组件向子组件传值id-->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import comment from '../subcomponents/comment.vue'
export default {
  data() { 
    return {
      id: this.$route.params.id, //获取路径中的id
      newsInfo: {} //存储某一条新闻详细信息，是一个对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    // 获取某一条新闻详细信息保存到newsInfo中，数组数据格式为：
    // {id:12,title:"",content:"",click:1,add_time:""}
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.newsInfo = result.body.message[0];
        } else {
          Toast("获取数据失败");
        }
      });
    }
  },
  components: {
    'comment-box' :comment
  }
};
</script>
// 为了使img标签样式生效，去掉scoped
<style lang="scss"> 
.news_container {
  .news_title {
    text-align: center;
    color: red;
    padding: 10px;
  }
  .news_subTitle {
    color: blue;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
  .news_content {
    padding-left: 5px;
    padding-right: 5px;
    img{
        width: 100%;
    }
  }
}
</style>