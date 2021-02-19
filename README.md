# <div align="center">简易博客系统</div>

## 🌳前台页面
> vue全家桶 + vue-cli + sass

**页面设计借鉴于开源项目[白茶](https://raindays.cn/)**

**响应式布局，支持PC端和移动端**

**支持暗夜模式切换**

1. 首页
2. 文章
3. 留言
4. 碎语
5. 关于自己

页面详情在[这里](http://www.shiisme.top/)

## 🏠后台页面
> react全家桶 + umi + antd +less

后台页面自己使用

ui方面就没有很讲究

主要是针对功能方面

**页面内容与前台一一对应**

这里就放一张后台页面图片

<img src="http://shiisme.top/upload/file.1613706433451.png">

页面详情在[这里](http://www.shiisme.top/admin)


## 😍后端代码
> nodejs + koa + mongodb

1. 三层架构模式
     - models 表现层
     - services 服务层
     - routers 路由层
2. Restful Api 风格
3. JWT 权限验证
   - 将Authorization存储在localStorage，每次请求附带在请求头中，天生预防跨站请求伪造(CSRF)
4.  MD5 密码加密
5. XSS 
    - 将评论内容中带有`<>`标签内用进行编译

## 👏部署
> centos + nginx

1. 首先你需要一个服务器，我用的是腾讯云
2. 连接你的服务器，我使用的工具是`git bash`
     ```shell
    # 远程连接命令
    ssh root@域名
    ```
3. 安装`nodejs` `nginx` `mongodb`，这里可能需要自行百度一下了，网上很详细
 - 设置`nodejs`淘宝镜像`npm config set registry https://registry.npm.taobao.org`
4. 将本地文件上传到服务器
    - 将构建好的代码经行压缩，发送到服务器
    ```shell
    # 本地窗口传输文件 
    scp 本地文件路径 root@域名:远程路径

    # 服务器窗口加压文件
    unzip 文件名
    ```
5. 安装pm2(node进程管理工具，代码运行发生错是自动重启)
    ```shell
    # 安装
    npm i pm2 -g

    # 命令
    pm2 start 文件名
    pm2 delete 运行id
    pm2 list 查看运行的程序
    ```
6. 配置nginx
    ```nginx
    # vim /etc/nginx/nginx.conf
    # 每次更改配置后重启nginx服务
    http{
        # 可能上传图片，将请求体内容设置大些
        client_max_body_size 20m;
        server {
            listen 80;
            server_name 你的域名;
            location / {
                # IP是你的服务器IP，1211是nodejs监听的端口
                proxy_pass http://IP:1211
            }
        }
    }
    ```
    ```shell
    # 启动
    nginx
    # 重启
    nginx -s reload
    ```
7. 在腾讯云上开启相应的端口(1211)，这样基于可以访问到页面了

## ✨最后
🐖这是一个小小的全栈项目

🐂内容纯手写

🌽主要是用来检验一下自己的学习成果

🍎如果需要什么bug也可以向我反馈一下

🛴这是我的邮箱`zshi1211@qq.com`

🚗感谢你看到这里！





