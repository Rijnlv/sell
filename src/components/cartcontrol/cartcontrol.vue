<template>
	<div class="cartcontrol">
		<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0"
            @click.stop.prevent="decreaseCart" transition="move">-
             
            </div>
              
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click="addCart">+</div>
	</div>
</template>


<script type="text/javascript">
import Vue from 'vue';
export default{
   props:{
   	food:{
   		type:Object
   	}
   },
   created(){
    
   },
   methods:{
   	addCart(event){
   		if(!event._constructed){
   			return;
   		}
   		 
   		if(!this.food.count){
   			Vue.set(this.food,'count',1);//=this.food.count=1;
   		}else{
   			this.food.count++;
   		}
   		this.$dispatch('cart.add',event.target);
   	},
   	decreaseCart(event){
   		if(!event._constructed){
   			return;
   		}
         if(this.food.count){
         	this.food.count--;
         }

   	}
   }
};
	
</script>

<style lang="stylus" rel="stysheet/stylus">
.cartcontrol
 font-size:0


 .cart-decrease
  display:inline-block
  padding:6px
  border-radius:50%
  border:2px solid  rgb(0,160,220)
  color: rgb(0,160,220) 
  line-height:10px
  font-size:16px
    
  
   
   

 .cart-count
  display:inline-block
  vertical-align:top
  width:14px
  padding-top:6px
  line-height:10px
  text-align:center
  font-size:10px
  color:rgb(147,153,159)
 .cart-add
  display:inline-block
  padding:6px
  line-height:10px
  font-size:16px
  
  border-radius:50%
   
  background:rgb(0,160,220)
  color:#fff
  
   
  
	
</style>