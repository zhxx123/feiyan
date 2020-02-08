## 简介

基于 [vue](https://github.com/vuejs/vue) 和 [element-ui](https://github.com/ElemeFE/element)实现。。

**不支持低版本浏览器(如 ie)**

### 前序准备

本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。本项目技术栈基于 [ES2015+](http://es6.ruanyifeng.com/)、[vue](https://cn.vuejs.org/index.html)、[vuex](https://vuex.vuejs.org/zh-cn/)、[vue-router](https://router.vuejs.org/zh-cn/) 、[vue-cli](https://github.com/vuejs/vue-cli) 、[axios](https://github.com/axios/axios) 和 [element-ui](https://github.com/ElemeFE/element)

### 测试数据
的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟

## 目录结构
```
./
├── build             --------------------> 构建目录
├── mock           --------------------> mock server 目录
├── plop-templates
│   ├── component
│   └── view
├── public
├── src
│   ├── api    --------------------> api 请求文件目录
│   ├── assets --------------------> 静态资源 png 文件目录
│   │   ├── 401_images
│   │   ├── 404_images
│   │   ├── custom-theme
│   │   │   └── fonts
│   │   └── hash
│   ├── common       --------------------> 多语言以及用户 token 存储操作相关函数
│   │   └── lang
│   ├── components   --------------------> 公共组件，很多没有使用，也包含网站首页 header,footer,登录，注册页面
│   │   ├── DragSelect
│   │   ├── Dropzone
│   │   ├── ErrorLog
│   │   ├── ImageCropper
│   │   │   └── utils
│   │   ├── Kanban
│   │   ├── Pagination
│   │   ├── PanThumb
│   │   └── SvgIcon
│   ├── directive --------------------> 波纹特效样式
│   │   └── waves
│   ├── filters  --------------------> 日期和数字样式过滤转换
│   ├── icons  --------------------> svg 图标
│   │   └── svg
│   ├── router  --------------------> 路由
│   ├── store  --------------------> 存储
│   │   └── modules
│   ├── styles  --------------------> 样式
│   ├── utils  --------------------> 常用工具函数
│   ├── vendor  --------------------> table  导出 excel函数
│   └── views  --------------------> 具体页面样式
│       ├── consolePage  --------------------> 用户个人中心相关页面
│       │   └── components
│       ├── hashrate  --------------------> 云算力页面
│       │   └── components
│       ├── helpPage  --------------------> 帮助中心
│       ├── homePage  --------------------> 首页
│       ├── miner   --------------------> 矿机租赁页面
│       │   └── components
│       └── notice  --------------------> 公告页面
└── tests
    └── unit
        ├── components
        └── utils
```
## 开发

```bash
# 克隆项目
git clone https://github.com/massgrid/nodeweb.git

# 进入项目目录
cd nodeweb

# 安装依赖
npm install

# 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:8090

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```