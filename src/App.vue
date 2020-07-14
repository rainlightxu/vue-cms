<template>
    <div class="app-container">
		<!-- header -->
		<div>
			<!-- title -->
        	<mt-header fixed title="Vue项目Demo">
				<!-- 返回按钮 -->
				<span slot="left">
					<mt-button icon="back" @click="goBack" v-show="flag"> </mt-button>
				</span>
			</mt-header>
		</div>
		<!-- footer -->
        <transition>
			<!-- 组件显示占位符 -->
			<router-view></router-view>
		</transition>
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
        
    </div>
</template>
<script>
	export default {
		data(){
			return{
				falg:false
			}
		},
		methods:{
			goBack(){
				// 返回浏览器上一个浏览地址
				this.$router.go(-1)
			}
		},
		created(){
			// 控制返回按钮显示与否
			this.$route.path === '/home' ? this.flag = false : this.flag = true
		},
		watch:{
			// 监听路由地址，控制返回按钮显示与否
			'$route.path': function(newVal){
				if(newVal === '/home'){
					this.flag = false
				}else{
					this.flag = true
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.mint-header{
		z-index: 99;
	}
    .app-container{
    	padding-top: 40px;
		padding-bottom: 50px; 
		overflow-x: hidden; 

		.mint-button{
			display: flex;
			align-items: center;
		}

    }
	// v-enter，v-leave-to，v-enter-active，v-leave-active实现点击主页footer tab切换动画效果
	.v-enter{
		opacity: 0;
		transform: translateX(100%);
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.v-enter-active,.v-leave-active{
		transition: all 0.4s ease;
	}
	:any-link{
        text-decoration: none;
    }
	// 改类名，解决 tabbar 点击无法切换的问题
	.mui-bar-tab .mui-tab-item-llb.mui-active {
		color: #007aff;
	}
	.mui-bar-tab .mui-tab-item-llb {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>