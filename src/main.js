import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import VueResource from 'vue-resource'
/* eslint-disable no-new */


Vue.use(VueRouter);//安装插件
Vue.use(VueResource);


 let app=Vue.extend(App);


let router=new VueRouter({
	linkActiveClass:'active'
});

router.map({
	'/goods':{
		component:goods
	},
	'/ratings':{
		component:ratings
	},
	'/seller':{
		component:seller
	}
})

router.start(app,'#app');
//router.go('/goods');