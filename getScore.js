/*=============================================
浙江省高校招生考试信息管理系统 成绩获取API
-----------------------------------------------
Tianhai Information Technology(T.H.I.T.)
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

var request=require('request');
var await=require('await');

var 饼干罐头=request.jar();
var 打=request.defaults({
	jar: 饼干罐头
});
var 垃圾站='http://pgzy.zjzs.net:8011';

var 数据处理转换助手={
	'xuekao': [
		'chinese',
		'math',
		'english',
		'politics',
		'history',
		'geography',
		'physics',
		'chemistry',
		'biology',
		'technology',
		'technologyInformation',
		'technologyGeneral',
		'comprehensive'
	],
	'xuankao': [
		'politics',
		'history',
		'geography',
		'physics',
		'chemistry',
		'biology',
		'technology'
	],
};

var 爸爸的请求头={
	'Accept': 'application/json, text/javascript, */*; q=0.01',
	'Accept-Encoding': 'gzip, deflate',
	'Accept-Language': 'en,zh-CN;q=0.8,zh;q=0.6,en-US;q=0.4',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive',
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'Host': 'pgzy.zjzs.net:8011',
	'Origin': 'http://pgzy.zjzs.net:8011',
	'Pragma': 'no-cache',
	'Referer': 'http://pgzy.zjzs.net:8011/login.htm',
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
	'X-Requested-With': 'XMLHttpRequest'
};
var 你的欧洲成绩={
	'historic': {
		'xuekao': [],
		'xuankao': []
	},
	'final': {
		'xuekao': {},
		'xuankao': {}
	}
};

var getMyScore=function (身份证,密码,callback){
	你的欧洲成绩={
		'historic': {
			'xuekao': [],
			'xuankao': []
		},
		'final': {
			'xuekao': {},
			'xuankao': {}
		}
	};
	var 你还好吗=await('toReturn');
	打({
		url: 垃圾站+'/login.htm',
		headers: 爸爸的请求头
	},function (错误,返回,说了啥){
		打({
			url: 垃圾站+'/INC/VerifyCode.aspx',
			headers: 爸爸的请求头
		},function (错误,返回,说了啥){
			var 垃圾儿子给的小饼干=饼干罐头.getCookies(垃圾站);
			var 垃圾儿子自己送的验证码明文='';
			for(var 这块小饼干的名字 in 垃圾儿子给的小饼干){
				if(垃圾儿子给的小饼干[这块小饼干的名字]['key']=='CheckCode'){
					垃圾儿子自己送的验证码明文=垃圾儿子给的小饼干[这块小饼干的名字]['value'];
				}
			}
			//console.log('垃圾儿子自己送的验证码明文: '+垃圾儿子自己送的验证码明文);
			打({
				url: 垃圾站+'/ashx/ajaxHandler.ashx',
				headers: 爸爸的请求头,
				method: 'POST',
				form: {
					shenfenzheng: 身份证,
					mima: 密码,
					title: 'login',
					yzm: 垃圾儿子自己送的验证码明文
				},
				json: true
			},function (错误,返回,说了啥){
				if(说了啥.status=='failed'){
					if(说了啥.des=='验证码输入错误！'){
						你还好吗.keep('toReturn',{
							status: -1,
							cause: 'captcha'
						});
					}else{
						你还好吗.keep('toReturn',{
							status: -1,
							cause: 说了啥.des
						});
					}
				}else{
					打({
						url: 垃圾站+'/xklscj.aspx',
						headers: 爸爸的请求头
					},function (错误,返回,说了啥){
						var 垃圾儿子给的成绩页面=说了啥.replace(new RegExp('<td class="tdright"></td>','gm'),'<td class="tdright">empty</td>');
						if(垃圾儿子给的成绩页面.indexOf('没有查询到学业考试成绩')==(-1)){
							var 正则大法好=new RegExp('考试年月([\\W\\w]*)高考选考历史成绩查询','gim');
							var 学考部分=正则大法好.exec(垃圾儿子给的成绩页面);
							学考部分=学考部分[0];
							var 正则大法好=new RegExp('<tr><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td></tr>','gi');
							var 这个数据=正则大法好.exec(学考部分);
							while(这个数据){
								var 得出的这个数据={
									time: 这个数据[1]
								};
								for(var i=2;i<=14;i++){
									if(这个数据[i]!='empty'){
										得出的这个数据[数据处理转换助手['xuekao'][i-2]]=这个数据[i];
									}
								}
								var 这个数据=正则大法好.exec(学考部分);
								你的欧洲成绩['historic']['xuekao'].push(得出的这个数据);
							}
						}
						if(垃圾儿子给的成绩页面.indexOf('没有查询到高考选考成绩')==(-1)){
							var 正则大法好=new RegExp('高考选考历史成绩查询([\\W\\w]*)</table>','gim');
							var 选考部分=正则大法好.exec(垃圾儿子给的成绩页面);
							选考部分=选考部分[0];
							var 正则大法好=new RegExp('<tr><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td></tr>','gi');
							var 这个数据=正则大法好.exec(选考部分);
							while(这个数据){
								var 得出的这个数据={
									time: 这个数据[1]
								};
								for(var i=2;i<=8;i++){
									if(这个数据[i]!='empty'){
										得出的这个数据[数据处理转换助手['xuankao'][i-2]]=这个数据[i];
									}
								}
								var 这个数据=正则大法好.exec(选考部分);
								你的欧洲成绩['historic']['xuankao'].push(得出的这个数据);
							}
						}
						打({
							url: 垃圾站+'/xkzzcj.aspx',
							headers: 爸爸的请求头
						},function (错误,返回,说了啥){
							var 垃圾儿子给的成绩页面=说了啥.replace(new RegExp('<td class="tdright"></td>','gm'),'<td class="tdright">empty</td>');
							if(垃圾儿子给的成绩页面.indexOf('没有查询到学业考试成绩')==(-1)){
								var 正则大法好=new RegExp('<body>([\\W\\w]*)高考选考最终成绩查询','gim');
								var 学考部分=正则大法好.exec(垃圾儿子给的成绩页面);
								学考部分=学考部分[0];
								var 正则大法好=new RegExp('<tr><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td></tr>','gi');
								var 这个数据=正则大法好.exec(学考部分);
								var 得出的这个数据={
								};
								for(var i=2;i<=14;i++){
									if(这个数据[i]!='empty'){
										得出的这个数据[数据处理转换助手['xuekao'][i-2]]=这个数据[i];
									}
								}
								你的欧洲成绩['final']['xuekao']=得出的这个数据;
							}
							if(垃圾儿子给的成绩页面.indexOf('没有查询到高考选考成绩')==(-1)){
								var 正则大法好=new RegExp('高考选考最终成绩查询([\\W\\w]*)</table>','gim');
								var 选考部分=正则大法好.exec(垃圾儿子给的成绩页面);
								选考部分=选考部分[0];
								var 正则大法好=new RegExp('<tr><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td><td class="tdright">(.+?)</td></tr>','gi');
								var 这个数据=正则大法好.exec(选考部分);
								var 得出的这个数据={
									time: 这个数据[1]
								};
								for(var i=2;i<=8;i++){
									if(这个数据[i]!='empty'){
										得出的这个数据[数据处理转换助手['xuankao'][i-2]]=这个数据[i];
									}
								}
								var 这个数据=正则大法好.exec(选考部分);
								你的欧洲成绩['final']['xuankao']=得出的这个数据;
							}
							打({
								url: 垃圾站+'/logout.aspx',
								headers: 爸爸的请求头
							},function (错误,返回,说了啥){
								你还好吗.keep('toReturn',{
									status: 0,
									data: 你的欧洲成绩
								});
							});
						});
					});
				}
			});
		});
	});

	你还好吗.then(function (data){
		callback(data.toReturn);
	},function (err){

	});
}

module.exports=getMyScore;
