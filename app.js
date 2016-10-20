/*=============================================
浙江省高校招生考试信息管理系统 成绩获取API
-----------------------------------------------
Tianhai Information Technology(T.H.I.T.)
	http://tianhai.info/
Soha King
	https://soha.moe/
=============================================*/

//HTTP服务准备
var express=require('express');
var app=express();
var port=process.env.SBPGZY_PORT ? parseInt(process.env.SBPGZY_PORT) : 8000;
var bodyParser=require('body-parser');
var logger=require('morgan');
var path=require('path');
var getScore=require('./getScore');

//请求处理准备
app.use(logger('dev'));
app.use(express.query());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

//全局Header返回
app.all('*',function (req,res,next){
    res.header("Developed-By",'Tianhai Information Technology');
	res.header("X-Powered-By",'GetScore API');
    next();
});

//App Start
app.all('/',function (req,res,next){
	res.send({
		status: 200,
		messages: [
			'Hello, World!',
			'you can see the repo to get more information: https://github.com/sohaking/zj-pgzy-getscore-api'
		]
	})
});
app.all('/get',function (req,res,next){
	getScore(req.body.id,req.body.pwd,function (data){
		res.send(data);
	});
});
//App End

//404
app.use(function(req, res, next) {
	res.status(404).send({status: 404,return: 'Not Found'});
});
//500
app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send({status: 500,return: 'Something wrong!'});
});

//跑起服务
var server = app.listen(port, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Application is running at http://%s:%s', host, port);
});
