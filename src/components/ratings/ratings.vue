<template>
	<div class="ratings" v-el:ratings>
		<div class="ratings-content">
			<div class="overview">
			 <div class="overview-left">
			 	<h1 class="score">{{seller.score}}</h1>
			 	<div class="title">综合评分</div>
			 	<div class="rank">高于周边商家{{seller.rankRate}}%</div>
			 </div>
			 <div class="overview-right">
			 	<div class="score-wrapper">
			 		<span class="title">服务态度</span>
			 		<star :size="36" :score="seller.serviceScore"></star>
			 		<span class="score">{{seller.serviceScore}}</span>
			 	</div>
			 	<div class="score-wrapper">
			 		<span class="title">商品评分</span>
			 		<star :size="36" :score="seller.foodScore"></star>
			 		<span class="score">{{seller.foodScore}}</span>
			 	</div>
			 	<div class="delivery-wrapper">
			 	 <span class="title">送达时间</span>
			 	 <span class="delivery">{{seller.deliveryTime}}分钟</span>
			 		
			 	</div>
			 </div>
			 </div>
			</div>
			<split></split>
			<ratingselect :select-type="selectType"  :only-content="onlyContent"

		    	:desc="desc" :ratings="ratings"></ratingselect>
		    <div class="rating-wrapper">
		    	<ul>
		    		<li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="ratingItem">
		    			<div class="avatar">
		    				<img width="28" height="28" :src="rating.avatar">
		    			</div>
		    			<div class="content">
		    				<h1 class="name">{{rating.username}}</h1>
		    				<div class="star-wrapper">
		    					<star :size="24" :score="rating.score"></star>
		    					<span class="delivery" v-show="rating.deliveryTime"></span>
		    				</div>
		    				<p class="text">{{rating.text}}</p>
		    				<div class="recommend" v-show="rating.recommend.length">
		    					<span class="icon-thumb_up"></span>
		    					<span class="item" v-for="item in rating.recommend" class="icon-thumb_up">{{item}}</span>
		    				</div>
		    				<div class="time">
		    				  {{rating.rateTime | formatDate}}

		    				</div>
		    			</div>
		    		</li>
		    	</ul>
		    </div>
</div>
	
	
	
</template>



<script type="text/javascript">
import star from 'components/star/star'; 
import split from 'components/split/split';
import ratingselect from 'components/ratingselect/ratingselect';
import BScroll from 'better-scroll';

const ALL=2;
const ERR_OK=0;

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
			ratings:[],	
			selectType:ALL,
			onlyContent:true
		};
        },
		created(){
			this.$http.get('/api/ratings').then((response)=>{//取得后台数据ratings
				response=response.body;
				if(response.errno===ERR_OK){
					this.ratings=response.data;
					this.$nextTick(()=>{
						this.scroll=new BScroll(this.$els.ratings,{
							click:true
						});
					});
				}
					 
		});
	},
	 
	methods:{
          needShow(type,text){
				if(this.onlyContent&&!text){
					return false;
				}
				if(this.selectType===ALL){
					return true;
				}
				else{
					return type===this.selectType;

				}
			} 
	},
	events:{//评论联动
				'ratingtype.select'(type) {
					this.selectType = type;
					this.$nextTick(()=>{
						this.scroll.refresh();

					});
					 
				},
				'content.toggle'(onlyContent){
					this.onlyContent=onlyContent;
					this.$nextTick(()=>{
						this.scroll.refresh();

					});

				}
			},
			filters:{
				formatDate(time){
					let date =new Date(time);
					function formatDate(date,fmt){
	                 if(/(y+)/.test(fmt)){
		              fmt=fmt.replace(RegExp.$1,(date.getFullYear()+'').substr(4-RegExp.$1.length));

	               }
				     let o={
					'M+':date.getMonth()+1,
					'd+':date.getDate(),
					'h+':date.getHours(),
					'm+':date.getMinutes(),
					's+':date.getSeconds()
				};
					for(let k in o){
						if(new RegExp(`(${k})`).test(fmt)){
							let str=o[k]+'';
							fmt=fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str));
						}
					}
					return fmt;
				};

			  function padLeftZero(str){
			  return ('00'+str).substr(str.length);
			}
	       return formatDate(date,'yyyy-MM-dd hh:mm');
             }
},
		components:{
			star,split,ratingselect
		}


	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.ratings
	 position:absolute
	 top:174px
	 bottom:0
	 width:100%
	 overflow:hidden
	 left:0
	 
	 .overview
	  display:flex
	  padding:18px 0
	  .overview-left
	   flex:0 0 137
	   padding:6px 0
	   width:137px
	   border-right:1px solid rgba(7,17,27,0.1)
	   text-align:center
	   padding-left:24px

	   .score
	    font-size:24px
	    line-height:28px
	    color:rgb(255,253,0)
	    margin-bottom:6px
	   .title
	    line-height:12px
	    font-size:12px
	    color:rgb(7,17,27)
	    margin-bottom:8px
	   .rank
	    line-height:10px
	    font-size:10px
	    color:rgb(147,153,159)

	  .overview-right
	    flex:1
	    padding:6px 0 6px 24px

	    .score-wrapper
	     margin-bottom:8px
	     line-height:18px
	     font-size:0
	     .title
	      display:inline-block
	      line-height:18px
	      vertical-align:top
	      font-size:12px
	      color:rgb(7,17,27)
	     .star
	      display:inline-block
	      margin:0 12px
	     .score
	       display:inline-block
	       vertical-align:top
	       line-height:18px
	       font-size:12px
	       color:rgb(255,153,0)
	    .delivery-wrapper
	      font-size:0
	      .title
	       line-height:18px
	       font-size:12px
	       color:rgb(7,17,27)
	      .delivery
	       margin-left:12px
	       font-size:12px
	       color:rgb(147,153,159)
	 .rating-wrapper
	  padding:0 18px
	  .ratingItem
	   display:flex
	   border-bottom:1px solid rgba(7,17,27,0.1)
	   padding:18px 0
	   .avatar
	    flex:0 0 28px
	    width:28px
	    margin-right:12px
	    img
	     border-radius:50%
	   .content
	    flex:1
	    position：relative
	    .name
	     line-height:12px
	     font-size:10px
	     color:rgb(7,17,27)
	     margin-bottom:4px
	    .star-wrapper
	     margin-bottom:6px
	     font-size:0
	     .star
	      display:inline-block
	      margin-right:6px
	      vertical-align:top
	     .delivery
	      font-size:10px
	      display:inline-block
	      vertical-align:top
	      color:rgb(147,153,159)
	    .text
	     line-height:18px
	     color:rgb(7,17,27)
	     font-size:12px
	     margin-bottom:8px
	    .recommend
	     font-size:0
	     line-height:16px
	     .icon-thumb_up,.item
	      display:inline-block
	      margin-right:8px
	      margin-bottom:4px
	      font-size:9px
	     .icon-thumb_up
	      color:rgb(0,160,220,)
	     .item
	      padding:0 6px
	      border:1px solid rgba(7,17,27,0.1)
	      border-radius:1px
	      color:rgb(147,153,159)
	      background:#fff
	    .time
	     position:absolute
	     line-height:12px
	     top:0
	     font-size:10px
	     color:rgb(147,153,159)
	    


	    






	    

	   


	
</style>