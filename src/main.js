import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/assets/styles/base.css'
import '@/assets/iconfont/iconfont.css'
import db from '@/utils/indexedDB'

Vue.config.productionTip = false

Vue.prototype.db = db; //* 全局挂载 indexedDB

Vue.use(VueRouter).use(ElementUI)

const dbInfo = {
  dbName: 'passwordmanagement',
  dbVersion: 2,
  dbInstance: {
    pswObjectStore: 'adminPsw', //* 密码信息库
    regObjectStore: 'registerPsw', //* 密码信息库
  }
};

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
