<template>
<div class="login">
  <el-row>
    <el-form :model="setData" ref="setData" @submit.native.prevent>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="password">
            <el-input :type="inputType" v-model="setData.password" placeholder="密码" autocomplete="off">
              <i class="iconfont icon-enter3 enter" style="margin-right: 0.04rem;" @click="enter" slot="suffix"></i>
            </el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-form>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content bg-purple form-item form-link-el">
        <el-link type="warning" v-if="showForgot" @click="forgotPswFun">忘记密码</el-link>
        <el-tooltip class="tooltip-item" effect="light" :content="pswRemind" placement="right">
          <el-link type="primary">提示</el-link>
        </el-tooltip>
      </div>
    </el-col>
  </el-row>
  <el-link type="warning" class="formatData" @click="formatData">格式化</el-link>

  <el-dialog title="找回密码" :visible.sync="dialogFindPswFormVisible" @close="closeFindPswForm" :close-on-click-modal="false">
    <el-form :model="findPsw" v-loading="loading">
      <el-form-item label="密钥">
        <el-input v-model="findPsw.findPswKey" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" v-if="response">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple-light">
          <el-tag type="success">您要找的密码可能为:</el-tag>
          <el-link type="success" :underline="false">{{findPsw.findedPsw}}</el-link>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple-light">
          <el-tag type="info">新的密钥已更新, 请保存:</el-tag>
          <input type="text" hidden :value="secretKey" ref="secretKey">
          <el-link type="info" @click="copySecretKey">{{secretKey}}</el-link>
          <el-link type="info" @click="saveSecretKey">导出密钥</el-link>
        </div>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFindPswFormVisible = false" v-if="footerBtn">取 消</el-button>
      <el-button type="primary" @click="findPswRrquest" v-if="footerBtn">确 定</el-button>
      <el-button @click="closeFindPswForm" v-if="!footerBtn">关 闭</el-button>
    </div>
  </el-dialog>

</div>
</template>

<script>
import AES from '@/utils/AES/index'
import $base from '@/assets/scripts/base.js'

//* 管理员密码
const adminPsw = JSON.parse(localStorage.getItem('adminPsw'));

export default {
  name: 'login',
  data() {
    return {
      inputType: 'password', //* 输入框类型
      pswRemind: '', //* 提示
      setData: {
        password: '', //* 密码
        pswErrorNums: 0 //* 密码错误次数
      },
      footerBtn: true, //* 底部按钮切换
      showForgot: false, //* 显示'忘记密码'
      dialogFindPswFormVisible: false, //* 忘记密码 dialog
      response: false, //* 显示密码与密钥框
      secretKey: '', //* 密钥
      loading: false, //* 加载动画(确定按钮上)
      findPsw: {
        findPswKey: '', //* 密钥
        findedPsw: ''
      }
    }
  },
  beforeCreate() {
    /* if (adminPsw.status) { //* 如果登录状态有效, 直接进入根模块
      this.$router.push({
        name: 'root'
      });
    } */
    if (adminPsw) {
      this.pswRemind = decodeURI(adminPsw.pswRemind); //* 密码提示
    }
  },
  created() { //* 绑定回车事件(@keydown.enter.native 在 el-x 元素上会失效)
    const _self = this;
    document.onkeydown = function (e) {
      let key = window.event.keyCode;
      if (key === 13) {
        _self.enter();
      }
    }
  },
  methods: {
    enter() { //* 表单提交
      if (this.setData.password.trim().length <= 0) {
        return;
      }
      let psw = '';
      if (adminPsw) {
        if (adminPsw.psw) {
          psw = adminPsw.psw;
        } else {
          $this.$message.error('未检测到密码, 跳转注册页面');
          setTimeout(() => {
            $this.$router.push({
              name: 'register'
            });
          }, 1000);
          return;
        }
      } else {
        this.$message.error('未检测到密码, 跳转注册页面');
        setTimeout(() => {
          this.$router.push({
            name: 'register'
          });
        }, 1000);
        return;
      }
      const savePsw = AES.decrypt(psw);
      if (this.setData.password == savePsw) {
        //* 改变登录状态
        if (adminPsw.status) {
          adminPsw.status = true;
        }
        localStorage.setItem('adminPsw', JSON.stringify(adminPsw))
        this.$message({
          type: 'success',
          showClose: true,
          message: '登录成功'
        });
        setTimeout(() => {
          this.$router.push({
            name: 'root'
          })
        }, 800);
      } else {
        this.$message({
          type: 'error',
          showClose: true,
          message: '密码错了哦'
        });
        this.setData.pswErrorNums += 1;
        if (this.setData.pswErrorNums >= 3) {
          this.showForgot = true;
        }
      }
    },
    forgotPswFun() { //* 忘记密码
      this.dialogFindPswFormVisible = true;
      // console.info('forgotPswFun')
    },
    formatData() { //* 格式化数据库
      console.info('formatData');
    },
    findPswRrquest() { //* 找回密码 '确定' 按钮
      this.loading = true;
      // const findPswKey = localStorage.getItem('findPswKey');
      // if (this.findPsw === findPswKey) { //* 密钥对的上
      setTimeout(() => { //* 美好的结果都值得等待
        this.loading = false;
        this.response = true;
        this.findPsw.findedPsw = AES.decrypt(adminPsw.psw); //* 显示密码
        this.secretKey = 'miyao';
        this.footerBtn = false;
      }, 1000);
      // }
    },
    closeFindPswForm() { //* 关闭找回密码 dialog
      this.loading = false;
      this.response = false;
      this.findPsw.findedPsw = '';
      this.footerBtn = true;
      this.dialogFindPswFormVisible = false;
      console.info('closeFindPswForm')
    },
    copySecretKey() { //* 密钥复制
      this.$refs.secretKey.select();
      document.execCommand('Copy');
      this.$message({
        type: 'success',
        showClose: true,
        message: '复制成功'
      });
    },
    saveSecretKey() { //* 导出密钥
      console.info(this.$moment().format('MMMM Do YYYY, h:mm:ss a'));
      debugger
      return;
      const blob = {
        content: ['密钥: <' + this.secretKey + '>; 保存时间: ' + 'shijian'],
        type: 'text/plain;chartset=utf-8'
      };
      $base.saveFile(blob, 'PASSWORDMANAGEMENT');
    }
  },
  computed: {}
}
</script>

<style scoped>
.login {
  background-color: rgba(51, 51, 51, 1);
  transition: all ease-in-out .3s;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.form-item {
  margin: 0 auto;
  max-width: 5rem;
  min-width: 5rem;
  margin: .25rem 0;
  margin: 0 auto;
}

.form-item i {
  cursor: pointer;
}

.formatData {
  position: absolute;
  bottom: .09rem;
  text-align: center;
}

.form-link-el {
  text-align: center;
}

.tooltip-item {
  margin: .2rem;
}

.el-row .el-col {
  margin: .03rem 0;
}
</style>
