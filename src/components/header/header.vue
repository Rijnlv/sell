<template>
 <div class="header">
  
   <div class="content-wrapper">
	<div class="avatar">
		<img width="64" height="64"  :src="seller.avatar">
	</div>
 
	<div class="content">
		<div class="title">
	        <img  width="30px" height="18px" background-repeat:no-repeat src="../../components/header/brand@2x.png">
			<span class="brand"></span>
			<span class="name">{{seller.name}}</span>
		</div>

		<div class="description">
			{{seller.description}}/{{seller.deliverTime}}分钟送达
		</div>

		<div v-if="seller.supports" class="support">
			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
			<span class="text">{{seller.supports[0].description}}</span>
		</div>
			
		</div>
  

  <div   v-if="seller.supports"  class="support-count" @click="showDetail">
    <span class="count">{{seller.supports.length}}个</span>
    <i  width="10px" height="10px" class="icon-keyboard_arrow_right" ></i>
  </div>
	</div>



<div class="bullentin-wrapper" @click="showDetail">
  <span class="bullentin-title"><img width="22px" height="12px"  src="../../components/header/bulletin@2x.png"></span>
  <span class="bullentin-text">{{seller.bulletin}}</span>
  <i class="icon-keyboard_arrow_right"></i>
</div>




<div class="backgroundon">
  <img :src="seller.avatar" width="100%" height="100%">
</div>




<div v-show="detailShow"  class="detail"  transition="fade">
  <div class="detail-wrapper  clearfix">
    <div class="detail-main">
      <h1 class="name">{{seller.name}}</h1>
      <div class="star-wrapper">
      <star :size="48"  :score="seller.score"></star>
      </div>

      <div class="title">
        <div class="line"></div>
        <div class="text">优惠信息</div>
        <div class="line"></div>
      </div>

      <ul class="supports" v-if="seller.supports">
        <li class="support-item" v-for="item in seller.supports">
          <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
          <span class="text">{{seller.supports[$index].description}}</span>
        </li>
      </ul>
       <div class="title">
        <div class="line"></div>
        <div class="text">商家公告</div>
        <div class="line"></div>
      </div>
      <div class="bulletin">
        <p class="content">{{seller.bulletin}}</p>
      </div>
    </div>
  </div>
  <div class="clear"></div>
  <div class="detail-close" @click="hideDetail">
   <i class="icon-close">x</i>
  </div>
</div>
</div>
</template>











<script type="text/javascript">
import star from 'components/star/star';
	export default {
      props:{
      	seller:{
      		type:Object
        	
        }
      },
      data(){
              return {
                detailShow:false
              };
      },
      methods:{
           showDetail(){
            this.detailShow=true;
           },
      
            hideDetail(){
              this.detailShow=false;
            } 
          },
      created(){
        this.classMap=['decrease','discount','special','invoice','guarantee'];//根据data的support type
      	},
        components:{
          star
        }
      }
</script>


<style lang="stylus" rel="stylesheet/stylus">
 

.header
   position:relative
   overflow:hidden
   color:#fff
   background:rgba(7,17,27,0.5)
   .content-wrapper
      position:relative
      padding:24px 12px 18px 24px
      font-size:0
      .avatar
         display:inline-block
         vertical-align:top
         img
           border-radius:2px
       .content
          display:inline-block
          font-size:14px
          margin-left:16px

          .title
            margin:2px 0 8px 0
            
            .brand
            display:inline-block
            vertical-align:top
              width:30px
              height:18px

             

             .name
             margin-left:6px
             font-size:16px
             line-height:18px
             font-weight:bold
             
             
             
           
          .description
            margin-bottom:10px
            line-height:12px
            font-size:12px

          .support
             .icon
                display:inline-block
                vertical-align:top
                width:12px
                height:12px
                margin-right:4px
                background-size:12px 12px
                background-repeat:no-repeat
                &.decrease
                  background-image:url("decrease_1@2x.png")
                &.discount
                 background-image:url("discount_1@2x.png")
                &.guarantee
                 background-image:url("special_1@2x.png")
                &.invoice
                background-image:url("invoice_1@2x.png")
                &.special
                 background-image:url("guarantee_1@2x.png")
             .text
               font-size:12px
               line-height:12px
        .support-count
           position:absolute
           right:12px
           bottom:14px
           padding:0 8px
           height:24px
           line-height:24px
           border-radius:14px
           background:grey
           text-align:conter
           .count
             vertical-align:top
             font-size:10px
            .icon-keyboard_arrow_right
              font-size:10px
              line-height:24px
              margin-left:2px
   .bullentin-wrapper
     background:rgba(7,17,27,0.2)
     height:28px
     line-height:28px
     padding:0 22px 0 12px
     white-space:nowrap
     overflow:hidden
     text-overflow:ellipsis
     font-size:0
      .bullentin-title
         vertical-align:top
         margin-top:8px
        display:inline-block
        width:22px 
        height:12px
        background-image:url("bulletin@2x.png")
        background-size:22px 12px
        background-repeat:no-repeat
      .bullentin-text
        vertical-align:top
        margin:0 4px
        font-size:20px
        color:red
      .icon-keyboard_arrow_right
        width:10px
        height:10px
        position:absolute
        font-size:10px
        right:12px
        top:8px
   .backgroundon
     position:absolute
     top:0
     left:0
     width:100%
     height:100%
     z-index:-1
     filter:blur(10px)
   .detail
     position:fixed
     z-index:100
     top:0
     left:0
     width:100%

     height:100%
     overflow:auto
     transition:all 0.5s
     &.fade-transition
       opacity:1
       background:rgba(7,17,27,0.8)
     &.fade-enter,&.fade-leave
      opacity:0 
      background:rgba(7,17,27,0)
     .detail-wrapper
       width:100%
       min-height:100%
     .clear 
        both
     .detail-main
         margin-top:64px
         padding-bottom:64px
         .name
           line-height:16px
           text-align:center
           font-size:16px
           font-weight:700
          .star-wrapper
           margin-top:18px
           padding:2px 0
           text-align:center
          .title
            display:flex
            width:80%
            margin:28px auto 24px auto
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,0.8)
            .text
              padding:0 12px
              font-weight:700
              font-size:14px
          .supports
           width:80%
           margin:0 auto
           .support-item
             padding:0 12px  
             margin-bottom:12px
            
             &:last-child
               margin-bottom:0
             .icon
               display:inline-block
               width:16px
               height:16px
               vertical-align:top
               margin-right:6px
               background-size:16px 16px
               background-repeat:no-repeat  
               &.decrease
                  background-image:url("decrease_2@2x.png")
               &.discount
                 background-image:url("discount_2@2x.png")
               &.guarantee
                 background-image:url("special_2@2x.png")
               &.invoice
                background-image:url("invoice_2@2x.png")
               &.special
                 background-image:url("guarantee_2@2x.png")
          .bulletin
            width:80%
            margin:0 auto
            .content
              line-height:24px
              font-size:14px
              text-align:justify

             


    .detail-close
        position:relative
        width:32px
        height:32px
        margin:-64px auto  0 auto
        font-size:32px

</style>
