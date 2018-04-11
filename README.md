## QingBlog后端
Koa2套件 + mongoose
前端项目为：[QingBlog前端](https://github.com/li-xiaojun/QingBlogFrontend)


## 结构说明
- `app.js`负责加载router、middlewares，连接db
- router层只负责映射路由，调用controller层，然后响应success数据，不应该抛出异常，不应该响应错误的数据
- controller层为router层服务，负责执行业务逻辑，参数检查，读取db，返回数据，抛出异常
- 中间件负责处理所有的错误返回
- model为数据结构层



## 中间件说明
- `rest_handler.js`负责给ctx安装success方法和error方法，分别是返回成功的数据和失败的数据
- `err_handler.js`是全局的错误处理中间件，负责处理所有错误的返回，包括api级别，数据库级别，其他未知错误
- `auth_handler.js`是负责验证token
- `permission_handler.js`是负责权限检查



## RestfulAPI设计

> code采用字符串，目的是不用查表。

- 成功只有一种，msg只是辅助客户端，所以http响应码为200，内容是：

  ```javascript
  { code: "success", msg: "成功", data: xx }
  ```

- 失败响应码采用400：错误码按照模块分类：

  ```javascript
  { code: "errCode", msg: "errMsg" }
  ```
  比如errCode设计如下：
  ```
  TokenNotExist - token不存在
  TokenInvalidToken - token失效
  AuthUsernamePswNotMatched - 用户名或密码错误
  AuthUserNotExist - 用户不存在
  BlogNameExist - 名字已存在
  BlogNotFound - 博客不存在
  ```

  ​

##  全局错误处理

所有的中间件都将错误抛出，由最外层的`error_handler`中间件来处理，包括数据库异常，最后将错误信息封装为json返回。


## 启动和部署
使用pm2。