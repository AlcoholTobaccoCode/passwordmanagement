# 这里为项目配置说明

[TOC]

## electron 配置

 electron 相关配置存放在 vue build 之后的 dist 文件夹中,
 其中 main.js 以及 package.json 为关键文件.

## 首页模板配置

 webpack.dev.conf -- 开发时引用
 webpack.prod.conf -- 打包时引用

 ``` js
  //* webpack.dev.conf
  new HtmlWebpackPlugin({
    filename: 'index.html', //* 模板名称
    template: 'public/index.html', //* 模板路径
  }),
  //* webpack.prod.conf
  new HtmlWebpackPlugin({
    filename: config.build.index,
    template: 'public/index.html',
  })
 ```