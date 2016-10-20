# 浙江省高校招生考试信息管理系统 成绩获取API

模拟登陆然后正则匹配页面获取历史和最终成绩。姐妹项目pgzy_zjzs_net_8011-auto

## 用法

	$ npm install
	$ SBPGZY_PORT=3000 node app.js

环境变量`SBPGZY_PORT`控制服务端口，若没有这个变量自动使用缺省值8000

## 获取成绩

POST /get
id={{身份证号}}&pwd={{密码}}
