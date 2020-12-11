import Vue from 'vue' //* 根
import App from './App' //* 根页面
import VueRouter from 'vue-router' //* 路由依赖
import ElementUI from 'element-ui' //* 如名
import 'element-ui/lib/theme-chalk/index.css' //* elementUI 样式
import router from './router' //* 路由配置
import '@/assets/styles/base.css' //* 基础公共样式
import '@/assets/iconfont/iconfont.css' //* 自定义 iconfont 仓
import db from '@/utils/indexedDB' //* indexedDB 依赖
import Moment from 'moment' //* 日期格式化依赖


Vue.config.productionTip = false

Vue.prototype.db = db; //* 全局挂载 indexedDB

Vue.use(VueRouter).use(ElementUI) //* 导入 elementUI

const dbInfo = { //* indexedDB 配置
  dbName: 'passwordmanagement',
  dbVersion: 2,
  dbInstance: {
    pswObjectStore: 'adminPsw', //* 密码信息库
    regObjectStore: 'registerPsw', //* 密码信息库
  }
};

Vue.prototype.$moment = Moment; //* 全局挂载 moment 时间处理方法

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  async created() { //* 创建数据库
    await this.db.createOrOpenDb(dbInfo.dbName, dbInfo.dbVersion);
    await this.db.createObjectStore(dbInfo.dbInstance.pswObjectStore, {
      keyPath: 'id',
      autoIncrement: true, //* 自增
      id: true,
      psw: false, //* 记录密码
      url: false, //* 目标网址
      remark: false //* 描述
    });
    await this.db.createObjectStore(dbInfo.dbInstance.regObjectStore, {
      keyPath: 'id',
      id: true,
      psw: false //* 登录密码
    });
    //* 创建对象结构所属的方法
    await this.db.createObjectStoreOperations(dbInfo.dbInstance.pswObjectStore);
    await this.db.createObjectStoreOperations(dbInfo.dbInstance.regObjectStore);

  },
  render: h => h(App)
})
