# CloudyCircle智能手环后端
本部分是CloudyCircle智能手环（暂定名字）的前端部分系统。
## 开始
在本目录下开启，需要先安装所需要的node包
```
npm install
```
然后启动
```
npm start
```
## 后端部分介绍
后端部分采用的是koa2框架。  
使用的数据库是MongoDB，在node里使用mongoose连接。  
后端部分主要是api设计，为前端提供接口，连接数据库，进行对数据的读取、写入等操作。  
