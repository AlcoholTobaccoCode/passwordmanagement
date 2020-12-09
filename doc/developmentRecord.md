# 开发记录

[TOC]

## `2020129162009` 搭建基础框架

 1. 使用 `vue-cli@2.9.6` 作为页面开发基础;
 2. 在打包(`dist`)文件夹配置中 `electron` 基础启动 main.js、package.json;
 3. 修改打包时配置, 主要文件: `config-index.js-build-assetsPublicPath: './'(不修改会导致页面空白)`;
 4. 建立文档;
 5. 建立文件树:
 passwordmanagement
 ├── build <!-- 打包时依赖 -->
 │   ├── build.js
 │   ├── check-versions.js
 │   ├── logo.png
 │   ├── utils.js
 │   ├── vue-loader.conf.js
 │   ├── webpack.base.conf.js
 │   ├── webpack.dev.conf.js
 │   └── webpack.prod.conf.js
 ├── config <!-- vue 配置 -->
 │   ├── dev.env.js
 │   ├── index.js
 │   └── prod.env.js
 ├── dist <!-- vue 打包后的产物 & electron 配置 -->
 │   ├── index.html
 │   ├── main.js <!-- electron 入口 js -->
 │   ├── package.json <!-- electron 程序包配置 -->
 │   └── static <!-- vue 打包后的静态文件 -->
 ├── doc <!-- 文档 -->
 │   ├── config.md
 │   ├── developmentRecord.md
 │   ├── errorlog.md
 │   └── plugins.md
 ├── package.json <!-- vue 程序包配置 -->
 ├── public
 │   ├── index.html <!-- vue 模板 -->
 │   └── static
 ├── README.md <!-- 入口文档 -->
 ├── src
 │   ├── api <!-- 接口相关 -->
 │   ├── App.vue <!-- 入口 -->
 │   ├── assets <!-- 静态资源 -->
 │   ├── components <!-- 小组件 -->
 │   ├── main.js <!-- vue 程序入口 js -->
 │   ├── router <!-- 路由 -->
 │   ├── store <!-- 全局状态管理 -->
 │   ├── utils <!-- 工具类 -->
 └── └── views <!-- 页面级组件 -->
