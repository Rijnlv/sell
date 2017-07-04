<template>
	
		<div class="seller-content" v-el:seller>
			<div class="over-view">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<span class="text">
						（{{seller.ratingCount}}）
					</span>
					<span class="text">
						月售{{seller.sellCount}}单
					</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h1>起送价</h1>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h1>商家配送</h1>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h1>平均配送时间</h1>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon" :class="{active:favorite}">❤</span>
					<span class="text" @>{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="supports" v-if="seller.supports">
                  <li class="support-item" v-for="item in seller.supports">
                   <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
                  <span class="text">{{seller.supports[$index].description}}</span>
                  </li>
                </ul>
            <split></split>
            <div class="pics">
            	<h1 class="title">商家实景</h1>
            	<div class="pic-wrapper" v-el:pic-wrapper>
            		<ul class="pic-list" v-el:pic-list>
            			<li class="pic-item" v-for="pic in seller.pics">
            				<img :src="pic" width="120" height="90">
            			</li>
            		</ul>
            	</div>
            </div>
            <split></split>
            <div class="info">
            	<h1 class="title">商家信息</h1>
            	<ul>
            		<li class="info-item" v-for="info in seller.infos">
            		{{info}}
            		</li>
            	</ul>
            </div>
			</div>
		</div>
	
</template>

<script type="text/javascript">
import star from 'components/star/star';
import split from 'components/split/split';
import BScroll from 'better-scroll';
//import {saveToLocal} from 'common/js/store';
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return{
				favorite:(()=>{
					function loadFromLocal(id,key,def){
					let seller=window.localStorage._seller_;
					if(!seller){
						return def;
					}
					seller=JSON.parse(seller)[id];
					if(!seller){
						return def;
					}
					let ret=seller[key];
					return ret||def;
					

				}
					return loadFromLocal(this.seller.id,'favorite',false);
				})()
			}
		},

		
		computed:{
			favoriteText(){
				return this.favorite?'已收藏':'收藏';
			}

		},

		 created(){
		
        this.classMap=['decrease','discount','special','invoice','guarantee'];//根据data的support type
      	},
      	watch:{
      		'seller'(){
      			this._initScroll();
      			this._initPics();


      		}

      	},
      	ready(){
      		 this._initScroll();
      		 console.log(1);
      		 if(this.seller.pics){
      		 	let picWidth=120;
      		 	let margin=6;
      		 	let width=(picWidth+margin)*this.seller.pics.length-margin;
      		 	this.$els.picList.style.width=width;
      		 	this.$nextTick(()=>{
      		 		this.picScroll=new BScroll(this.$els.picWrapper,{
      		 			scrollX:true,
      		 			eventPassthrough:'vertical'
      		 		});
      		 	})

      		 }

      	},
      	methods:{
      		toggleFavorite(event){
      			if(!event._constructed){
      				return;
      			}
      			this.favorite=!this.favorite;
      		function saveToLocal(id,key,value){//存

				let seller=window.localStorage._seller_;
				if(!seller){
					seller={};
					seller[id]={};
					seller[id][key]=value;
				}else{
					seller=JSON.parse(seller);
					if(!seller[id]){
						seller[id]={};
					}

				}
				seller[id][key]=value;

				localStorage._seller_=JSON.stringify(seller);

				};

      			saveToLocal(this.seller.id,'favorite',this.favorite);
      		},
      		_initScroll(){
      			if(!this.scroll){
      		     this.scroll=new BScroll(this.$els.seller,{
      			click:true
      		});
      			// }else
      			// {
      			// 	this.scroll.refresh();
      			// }
      		}},

      	
      	_initPics(){
      		if(this.seller.pics){
      		 	let picWidth=120;
      		 	let margin=6;
      		 	let width=(picWidth+margin)*this.seller.pic.length-margin;
      		 	this.$els.picList.style.width=width;
      		 	this.$nextTick(()=>{
      		 		if(!this.picScroll){
      		 		this.picScroll=new BScroll(this.$els.pic-wrapper,{
      		 			scrollX:true,
      		 			eventPassthrough:'vertical'
      		 		});
      		 	}else{
      		 		this.picScroll.refresh();
      		 	}
      		 	})

      		 }

      	}
      },
		components:{
			star,split
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.seller-content
	 position:absolute
	 top:174px
	 bottom:0
	 left:0
	 width:100%
 
	 .over-view
	  padding:18px
	  position:relative
	  .title
	   font-size:14px
	   line-height:14px
	   margin-bottom:8px
	   color:rgb(7,17,27)
	  .desc
	    
	   padding-bottom:18px
	   font-size:0
	   border-bottom:1px solid rgba(7,17,27,0.1)
	   .star
	    display:inline-block
	    margin-right:8px
	    vertical-align:top
	   .text
	    display:inline-block
	    line-height:18px
	    margin-right:12px
	    font-size:10px
	    color:rgba(7,17,80,93)
	  .remark
	   display:flex
	   padding-top:18px
	   .block
	    flex:1
	    text-align:center
	    border-right:1px solid rgba(7,17,27,0.1)
	    &:last-child
	     border:none
	    h1
	     margin-bottom:10px
	     line-height:10px
	     font-size:10px
	     color:rgb(147,153,159)
	    .content
	     line-height:24px
	     font-size:10px
	     color:rgb(7,17,27)
	     .stress
	      font-size:24px
	  .favorite
	   position:absolute
	   width:50px
	   right:18px
	   top:18px
	   text-align:center
	   .icon
	    display:block
	    margin-bottom:4px
	    color:#d4d6d9
	    font-size:24px
	    line-height:24px
	    &.active
	     color:rgb(240,20,20)
	   .text
	    line-height:10px
	    font-size:14px
	    color:rgba(7,17,25,93)



	 .bulletin
	  
	  width:100%
	  .title
	   padding:18px 18px 0 18px
	   font-size:14px
	   line-height:14px
	   margin-bottom:8px
	   color:rgb(7,17,27)
	  .content-wrapper
	   padding:8px 12px 16px 12px
	   border-bottom:1px solid rgba(7,17,27,0.1)
	   .content
	    padding:8px 18px 0 18px
	    line-height:24px
	    font-size:12px
	    color:rgb(240,10,20)
	  .supports
	   .support-item
	    padding:16px 12px
	    font-size:0
	    border-bottom:1px solid rgba(7,17,27,0.1)
	    &:last-child
	     border:none
	    .icon
	     display:inline-block
	     width:16px
	     height:16px
	     vertical-align:top
	     margin-right:6px
	     background-size:16px 16px
	     background-repeat:no-repeat  
	     &.decrease
	      background-image:url("decrease_4@2x.png")
	     &.discount
	      background-image:url("discount_4@2x.png")
	     &.guarantee
	      background-image:url("special_4@2x.png")
	     &.invoice
	      background-image:url("invoice_4@2x.png")
	     &.special
	      background-image:url("guarantee_4@2x.png")
	    .text
	     line-height:16px
	     font-size:12px
	     color:rgb(7,17,27)
	 .pics
	  padding:18px
	  .title
	   font-size:14px
	   line-height:14px
	   margin-bottom:12px
	   color:rgb(7,17,27)
	  .pic-wrapper
	   width:100%
	   overflow:hidden
	   white-space:nowrap
	   .pic-list
	    font-size:0
	    .pic-item
	     display:inline-block
	     margin-right:6px
	     width:120px
	     height:90px
	     &:last-child
	      margin:0
	 .info
	  padding:18px 18px 0 18px
	  .title
	   font-size:14px
	   line-height:14px
	   padding-bottom:12px
	   color:rgb(7,17,27)
	   border-bottom:1px solid rgba(7,17,27,0.1)
	  .info-item
	    padding:16px 12px
	    line-height:16px
	    font-size:12px
	    border-bottom:1px solid rgba(7,17,27,0.1)
	    &:last-child
	     border:none














</style>