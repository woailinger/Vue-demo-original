//工具
var Util = {
	/**
	 * 通过id获取模板内容
	 * @id 		script模板标签id
	 **/ 
	 tpl: function (id) {
	 	return document.getElementById(id).innerHTML;
	 },
	 /**
	 * 异步请求方法
	 * @url 	请求地址
	 * @fn 		请求成功回调函数
	 */ 
	 ajax: function (url,callback) {
	 	var xhr = new XMLHttpRequest();
	 	xhr.onreadystatechange = function () {
	 		if(xhr.readyState == 4){
	 			if(xhr.status == 200){
	 				var data = JSON.parse(xhr.responseText)
	 				callback && callback(data)
	 			}
	 		}
	 	}
	 	xhr.open('GET',url,true);
	 	xhr.send(null);
	 }
}
//过滤器
Vue.filter('date', function (date) {
	 return new Date(date).toLocaleString().replace(/^\d{4}\//, "").replace(/\//," 月 ").replace(/\s[\u4E00-\u9FA5]{2}/, ' 日 ').replace(/\:\d+$/,"");
})
//列表组件 
var ListComponent = Vue.extend({
	template: Util.tpl('tpl_list'),
	data: function () {
		return {
			list:[]
		}
	},
	created: function () {
		var that = this;
		Util.ajax('data/tsconfig.json', function (res) {
			if(res && res.errno === 0) {
				that.list = res.rss.channel.item;
			}
		})
		window.addEventListener('scroll', function() {
			//显
			var h = document.body.scrollHeight - document.documentElement.clientHeight - window.scrollY - 200 < 0;
			if(h) {
				var loadingmore = document.getElementById('loadingmore');
				loadingmore.style.display = 'block';
				Util.ajax('data/tsconfig.json', function (res) {
					if(res && res.errno === 0) {
					loadingmore.style.display = 'none';
						res.rss.channel.item.sort(function(){
		 					return Math.random() > .5 ? 1 : -1 ;
		 				})
						var data = that.list.concat(res.rss.channel.item);
						that.list = data;
					}
				})				
			}
		})
	}
})
//详情页
// var DetailsComponent = Vue.extend({
// 	template: Util.tpl('tpl_details'),
// 	date: function () {
// 		return {

// 		}
// 	}
// })
//注册
Vue.component('list', ListComponent);
// Vue.component('details', DetailsComponent);
//实例化Vue
var app = new Vue({
	el: '#app',
	data: {
		view: 'list'
	},
	methods: {
	
	}
})
// //定义路由
// var router = function () {
// 	//获取  hash
// 	var str = location.hash;
// 	//处理 #
// 	str = str.slice(1);
// 	//处理第一个/  (#/)
// 	str = str.replace(/^\//,'');
// 	//获取  /前面的字符串,
// 	str = str.split('/')
// 	//映射 列表
// 	var map = {
// 		list: true,
// 		details: true
// 	}
// 	//判断 map中是否有  str
// 	if(map[str[0]]){
// 		//要渲染哪个页面   就把 app中的 view 值 变成 str即可
// 		app.view = str[0];
// 	} else {
// 		app.view = 'list';
// 	}
// }
// //监听  load事件
// window.addEventListener('load', router);
// //hash改变的 事件 监听  hashChange事件
// window.addEventListener('hashchange', router);