<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
			<span @click="select(1,$event)" class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
		</div>
		<div @click="toggleContent"  class="switch" :class="{'on':onlyContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看内容的评价</span>
		</div>
	</div>
</template>

 

<script>
const POSITIVE=0;
const NEGATIVE=1;
const ALL=2;
	export default{
       props:{
       	ratings:{
       		type:Array,
       		default(){
       			return [];
       		}
       	},
       	selectType:{
          type:Number,
          default:ALL
       	},
       	onlyContent:{
       		type:Boolean,
       		default:false
       	},
       	desc:{
       		type:Object,
       		default(){
       			return{
       				all:'全部',
       				positive:'满意',
       				negative:'不满意'
       			};
       		}
       	}
       },
       methods:{
       	select(type,event){//选中type事件
       		if(!event._constructed){
       			return;
       		}
       		this.selectType=type;
       		this.$dispatch('ratingtype.select',type);//父组件监听事件	 
       	},
       	toggleContent(event){
       		if(!event._constructed){
       			return;
       		}
       		this.onlyContent=!this.onlyContent;
       		this.$dispatch('content.toggle',this.onlyContent);
       	}
       },
       computed:{
       	positives(){
       		return this.ratings.filter((rating)=>{
       			return rating.rateType===POSITIVE;
       			})
       		},
        negatives(){
       		return this.ratings.filter((rating)=>{
       			return rating.rateType===NEGATIVE;
       			})
       		}

       	}
       };
	
</script>

<style lang="stylus" rel="stylesheet/stylus">
 
	.ratingselect
	 .rating-type
	  padding:18px 0
	  margin:0 18px
	  border:1px solid rgba(7,17,27,0.1)
	  font-zise:0
	  .block
	   display:inline-block
	   padding:8px 12px
	   border-radius:1px
	   font-zise:12px
	   margin-right:8px
	   color:rgb(77,85,93)
	   &.active
	    color:#fff
	   .count
	    font-zise:8px
	    margin-left:2px
	    line-height:16px
	   &.positive
	    background:rgba(0,160,220,0.2)
	    &.active
	     background:rgb(0,160,220)
	   &.negative
	    background:rgba(77,85,93,0.2)
	    &.active
	     background:rgb(77,85,93)
	 .switch
	  padding:12px 18px
	  line-height:24px
	  border-bottom:1px solid rgba(7,17,27,0.1)
	  color:rgb(147,153,159)
	  font-zise:0
	  .icon-check_circle
	   display:inline-block
	   font-zise:24px
	   margin-right:4px
	  .text
	   font-zise:12px



	     



</style>