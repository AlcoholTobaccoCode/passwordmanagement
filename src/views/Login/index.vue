<template>
<div class="login">
  <el-row>
    <el-form :model="setData" ref="setData">
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
        <el-tooltip class="tooltip-item" effect="light" :content="pswTips" placement="right">
          <el-link type="primary">提示</el-link>
        </el-tooltip>
        <el-link type="warning" v-if="showForgot" @click="forgotPswFun">忘记密码</el-link>
      </div>
    </el-col>
  </el-row>
  <el-link type="warning" class="formatData" @click="formatData">格式化</el-link>
</div>
</template>

<script>
import AES from '@/utils/AES/index'

//* 管理员密码
const adminPsw = JSON.parse(localStorage.getItem('adminPsw'));

export default {
  name: 'login',
  data() {
    return {
      inputType: 'password', //* 输入框类型
      pswTips: '提示文字',
      setData: {
        password: '', //* 密码
        pswErrorNums: 0 //* 密码错误次数
      },
      showForgot: false
    }
  },
  beforeCreate() {
    /* if (adminPsw.status) { //* 如果登录状态有效, 直接进入根模块
      this.$router.push({
        name: 'root'
      });
    } */
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
      if (adminPsw.psw) {
        psw = adminPsw.psw;
      } else {
        next({
          path: '/register'
        })
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
      console.info('forgotPswFun')
    },
    formatData() { //* 格式化数据库
      console.info('formatData');
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
  margin-right: .2rem ;
}

</style>
