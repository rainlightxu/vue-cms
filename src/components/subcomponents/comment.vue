<template>
    <div class="cmt-container">
        <!-- title -->
        <h3>发表评论</h3>
        <hr>
        <!-- 评论内容输入区域 -->
        <textarea placeholder="请输入评论内容" maxlength="120" v-model="msg"></textarea>
        <!-- 发表评论按钮 -->
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <!-- 评论列表 -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                  第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                  {{item.content === '' ? '此用户很懒，啥都没说': item.content}}
                </div>
            </div>
        </div>
        <!-- 加载更多按钮 -->
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
      return{
        pageindex: 1,
        comments:[], //存储评论信息
        msg:""  //评论内容
      }
    },
    created(){
      this.getComments()
    },
    methods:{
      getComments(){
        this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageindex+"").then(result =>{
          if(result.body.status === 0){
            // concat() 方法用于连接两个或多个数组。当点击加载更多时重新调用getComments()方法，然后拼接评论内容
            this.comments = this.comments.concat(result.body.message);
          } else{
            Toast("获取评论失败");
          }
        })
      },
      getMore() {
        this.pageindex ++;
        this.getComments();
      },
      postComment(){
        if(this.msg.trim().length === 0) {
          return Toast("评论内容不能为空");
        }
        this.$http.post("api/postcomment/"+this.id,{content: this.msg.trim()}).then(result => {
          if(result.body.status === 0) {
             // 评论内容封装成对象提交
             var cmt = {
               user_name:'匿名用户',
               add_time: Date.now(),
               content: this.msg.trim()
             };
            //  unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
             this.comments.unshift(cmt);
             this.msg = "";
          }
        })
      }
    },
    // id用于接收父组件传递过来的参数
    props: [
      "id"
      ]
}
</script>
<style lang="scss" scoped>
.cmt-container{
  h3{
    font-size: 18px;
    font-weight: bold;
  }
  textarea{
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list{
    margin: 10px 0;
    .cmt-item{
      font-size: 13px;
      .cmt-title{
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body{
        line-height: 30px;
        text-indent: 2em;
      }
    }
  }
}
</style>