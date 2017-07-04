<template>
  <div >
  <v-header :seller="seller"></v-header>
  <div class="tab">

   <div class="tab-item">  <a v-link="{path:'/goods'}">商品</a></div>
   
   <div class="tab-item">  <a  v-link="{path:'/ratings'}">评论</a></div>
  
   <div class="tab-item" > <a  v-link="{path:'/seller'}">商家</a></div>
  </div>

<router-view :seller="seller" keep-alive></router-view>
     
  </div>
</template>

<script>
import header from './components/header/header.vue'
//import {urlParse} from 'common/js/util';
const ERR_OK=0;

export default {
  data(){
        return {
          seller:{
            id:(()=>{
              let queryParam=urlParse();
              //console.log(queryParam);
              function urlParse(){
              //把url后的值解析，key=id value:1234,解析Url参数
              //example:?id=12345&a=b,return object{id:12345,a:b}
              let url=window.location.search;
              let obj={};
              let reg=/[?&][^?&]+=[^?&]+/g;//第一个：？或者&，第二个非？/&,第三个：=，第四个非？/&一个或多个
              let arr=url.match(reg);//['?id=12345','&a=b']
              if(arr){
              arr.forEach((item)=>{
              let tempArr=item.substring(1).split('=');
              let key=decodeURIComponent(tempArr[0]);
              let val=decodeURIComponent(tempArr[1]);
              obj[key]=val;     

              });
              }
             return obj;
}
              return queryParam.id;
            })()
          }
        }
  },


  created(){//发送数据
    this.$http.get('/api/seller?id='+this.seller.id).then((response)=>{
      response=response.body;
      if(response.errno===ERR_OK){
        //this.seller=response.data;
        this.seller=Object.assign({},this.seller,response.data);
        console.log(this.seller.id);
      }

    })
  },




  components:{
    'v-header':header
  }
};

</script>
<style lang="stylus" rel="stylesheet/stylus">
 
     .tab
       display:flex
       width:100%
       height:40px
       line-height:40px
 
       border-bottom:1px solid rgba(7,17,27,0.1)
       position:relative
       .tab-item  
           flex:1
           text-align:center
           &>a
             display:block    
             font-size:14px
             color:rgb(77,85,93)
             &.active
                 color:rgb(240,20,20)
</style>
