<template>
<div class="register" v-loading="loading" element-loading-text="页面跳转中">
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content bg-purple tips header">
        {{ header }}
      </div>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content bg-purple-light tips header-supplement">
        {{ headerSupplement }}
      </div>
    </el-col>
    <el-form :model="setData" :rules="rules" ref="setData">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="password">
            <el-input :type="inputType" v-model="setData.password" maxlength="20" show-word-limit placeholder="设置管理密码" autocomplete="off">
              <i class="iconfont icon-eyedefuben eyedefuben" style="font-size: 0.24rem;" v-show="!eyeShow" @click="eyeChange()" slot="suffix"></i>
              <i class="iconfont icon-eye eye" v-show="eyeShow" style="margin-right: 0.04rem;" @click="eyeChange()" slot="suffix"></i>
            </el-input>
            <el-progress class="pswProcess" :percentage="passwordPercent" :format="passwordPercentFormat"></el-progress>
          </el-form-item>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <!-- ↓ 无校验 -->
          <el-form-item v-if="eyeShow" key="hasProp">
            <el-input type="password" :disabled="eyeShow" placeholder="确认管理密码" autocomplete="off"></el-input>
          </el-form-item>
          <!-- ↓ 校验版本 -->
          <el-form-item v-else prop="checkpassword">
            <el-input type="password" v-model="setData.checkpassword" :disabled="eyeShow" placeholder="确认管理密码" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="pswRemind">
            <el-input v-model="setData.pswRemind" placeholder="设置提示" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="">
            <el-button type="info" plain @click="submitForm('setData')">确认</el-button>
          </el-form-item>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="">
            <el-button type="info" plain @click="resetForm('setData')">重置</el-button>
          </el-form-item>
        </div>
      </el-col>
    </el-form>
  </el-row>

  <el-dialog title="密码注册成功" :visible.sync="dialogSecretFormVisible" @close="dialogSecretFormCLose" width="80%" :destroy-on-close=true>
    <span>现在, 请保存您的密钥, 这是找回密码的唯一凭证(密钥丢失数据无法找回).</span>
    <input type="text" class="fileExportInput" :value="setData.secretKey" ref="secretKey">
    <el-tooltip class="item" effect="dark" content="点击密钥复制" placement="top-start">
      <el-link type="info" @click="copySecretKey">{{setData.secretKey}}</el-link>
    </el-tooltip>
    <div>
      <el-link type="info" @click="saveSecretKey">导出密钥</el-link>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogSecretFormVisible= false">关 闭</el-button>
    </span>
  </el-dialog>
  <el-progress :percentage="progress.percentage" v-if="progressVisible" :show-text="false" :stroke-width="3" class="progress" :color="progress.customColor"></el-progress>
</div>
</template>

<script>
import AES from '@/utils/AES/index'
import $base from '@/assets/scripts/base.js'

const storeNames = 'registerPsw'

export default {
  name: 'register',
  data() {
    var _this = this;
    var validatePass = (rule, value, callback) => { //* 密码校验
      if (value === '') {
        callback(new Error('请设置密码'));
      } else {
        //6-20位包含字符、数字和特殊字符
        var ls = 0;
        if (_this.setData.password !== '') {
          if (_this.setData.password.match(/([a-z])+/)) {
            console.info('is ++')
            ls++;
          }
          if (_this.setData.password.match(/([0-9])+/)) {
            console.info('is ++')
            ls++;
          }
          if (_this.setData.password.match(/([A-Z])+/)) {
            console.info('is ++')
            ls++;
          }
          if (_this.setData.password.match(/([\W])+/) && !_this.setData.password.match(/(![\u4E00-\u9FA5])+/)) {
            console.info('is ++')
            ls++;
          }
          if (ls >= 4 && _this.setData.password.length > 15) {
            console.info('is ++')
            ls++;
          }
          if (_this.setData.password.length < 6 || _this.setData.password.length > 20) {
            callback(new Error('要求6-20位字符'));
            ls = 0;
            console.info('is 20位字符 0')
          }
          if (_this.setData.password.match(/([\u4E00-\u9FA5])+/)) {
            callback(new Error('不能包含中文字符'));
            ls = 0;
            console.info('is 不能包含中文字符 0')
          }
          console.log(`🚀 ~ file: index.vue ~ line 95 ~ validatePass ~ ls`, ls)

          switch (ls) {
            case 0:
              _this.passwordPercent = 0;
              // callback(new Error('数字、小写字母、大写字母以及特殊字符中四选三'));
              break;
            case 1:
              _this.passwordPercent = 20;
              // callback(new Error('数字、小写字母、大写字母以及特殊字符中四选三'));
              break;
            case 2:
              _this.passwordPercent = 40;
              // callback(new Error('数字、小写字母 、大写字母以及特殊字符中四选三'));
              break;
            case 3:
              _this.passwordPercent = 60;
            case 4:
              _this.passwordPercent = 80;
              break;
            case 5:
              _this.passwordPercent = 100;
              break;
            default:
              _this.passwordPercent = 0;
              break;
          }
        }
        //* 自定义方法记得加上 ↓ 这玩意, 否则提交无法执行
        callback();
      }

      /* if (value.trim().length < 6) {
        callback(new Error('请设置至少六位的密码'));
      } */
      /*  else {
              if (this.setData.password !== '') {
                this.$refs.setData.validateField('checkpassword');
              }
              callback();
            } */

    };
    var validatePassCheck = (rule, value, callback) => { //* 确认密码校验
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.setData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      showPsw: '',
      header: '首次使用需要设置管理密码',
      headerSupplement: '用于验证进入及加密数据',
      eyeShow: false, //* 密码可视小眼睛 //* 确认密码输入框是否可编辑(是否需要确认密码)
      dialogSecretFormVisible: false, //* 密钥 dialog
      inputType: 'password', //* 输入框类型
      loading: false, //* 跳转页面时的 loading
      setData: {
        password: '', //* 密码
        checkpassword: '', //* 确认密码
        pswRemind: '', //* 密码提示
        secretKey: '', //* 密钥
      },
      passwordPercent: 0, //* 密码强度比例
      rules: {
        password: [{
          // required: true,
          validator: validatePass,
          trigger: ['blur', 'change'],
          icon: ''
        }],
        checkpassword: [{
          // required: true,
          validator: validatePassCheck,
          trigger: ['blur', 'change'],
          icon: ''
        }]
      },
      progressVisible: false,
      progress: { //* 进度条颜色
        percentage: 0,
        customColor: '#409eff',
        customColors: {
          20: '#f56c6c',
          40: '#e6a23c',
          60: '#5cb87a',
          80: '#1989fa',
          100: '#6f7ad3',
        }
      }
    };
  },
  props: {},
  components: {},
  mounted() {},
  methods: {
    /* async addData() {
      // 父组件维护maxid
      debugger
      await this.db[storeNames].add(this.setData).catch(err => {
        console.log(err.message)
      })
      this.showPsw = this.setData.password
    }, */
    submitForm(formName) { //* 表单提交
    debugger  
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugger
          const encryptPsw = AES.encrypt(this.setData.password); //* 加密密码
          this.setData.secretKey = $base.randomWord(false, 50); //* 密钥
          localStorage.setItem('adminPsw', JSON.stringify({ //* 存储
            psw: encryptPsw, //* 加密后的密码吗
            status: false, //* 登录状态
            pswRemind: encodeURI(this.setData.pswRemind), //* 密码提醒
            secretKey: this.setData.secretKey //* 密钥
          }));
          this.$message.success('密码注册成功');
          setTimeout(() => {
            this.dialogSecretFormVisible = true; //* 展示密钥框
          });
        } else {
          this.$message.error('error submit');
          return false;
        }
      });
    },
    resetForm(formName) { //* 重置表单
      this.eyeShow = !this.eyeShow; //* 眼睛 icon 切换
      this.inputType = 'password';
      this.$refs[formName].resetFields();
      this.passwordPercent = 0;
    },
    eyeChange() {
      this.eyeShow = !this.eyeShow; //* 眼睛 icon 切换
      if (this.eyeShow) {
        this.inputType = 'text';
        this.setData.checkpassword = '';
      } else {
        this.inputType = 'password';
      }
    },
    dialogSecretFormCLose() { //* 密钥 dialog 关闭时触发
      let $this = this;
      let precessNums = 0;
      let timer = null;
      this.loading = true;
      timer = setInterval(() => {
        $this.progressVisible = true; //* 模拟进度条
        let precess = parseFloat(Math.random() * 30 + 20);
        precessNums += precess;
        if (precessNums >= 100) {
          precessNums = 100
        }
        $this.progress.customColor = $this.customColorMethod(precessNums); //* 颜色
        $this.progress.percentage = precessNums; //* 进度
        if (precessNums >= 100) {
          clearInterval(timer);
          timer = null;
          this.loading = false;
          this.$router.push({
            name: 'login'
          });
          return
        }
      }, 1000);
    },
    copySecretKey() { //* 密钥复制
      this.$refs.secretKey.select();
      setTimeout(() => {
        document.execCommand('Copy');
        this.$message({
          type: 'success',
          showClose: true,
          message: '复制成功'
        });
      }, 400);
    },
    saveSecretKey() { //* 导出密钥
      const blob = {
        content: ['密钥: <' + this.setData.secretKey + '>; 保存时间: ' + this.$moment().format('MMMM Do YYYY, h:mm:ss a')],
        type: 'text/plain;chartset=utf-8'
      };
      $base.saveFile(blob, 'PASSWORDMANAGEMENT');
    },
    customColorMethod(percentage) { //* 顶部进度条
      if (percentage <= 20) {
        return this.progress.customColors[20];
      } else if (percentage <= 40 && percentage > 20) {
        return this.progress.customColors[40];
      } else if (percentage <= 60 && percentage > 40) {
        return this.progress.customColors[60];
      } else if (percentage <= 80 && percentage > 60) {
        return this.progress.customColors[80];
      } else if (percentage > 80) {
        return this.progress.customColors[100];
      }
    },
    passwordPercentFormat(percentage) { //* 密码强度
      // console.log(`🚀 ~ file: index.vue ~ line 323 ~ passwordPercentFormat ~ percentage`, percentage)
      /**
       * 很弱
       * 弱
       * 强
       * 很强
       * 极强
       */
      if (Number(percentage) <= 20) {
        return '很弱';
      } else if (Number(percentage) > 20 && Number(percentage) <= 40) {
        return '弱';
      } else if (Number(percentage) > 40 && Number(percentage) <= 60) {
        return '强';
      } else if (Number(percentage) > 60 && Number(percentage) <= 80) {
        return '很强';
      } else {
        return '极强';
      }

    }
  },
  computed: {}
}
</script>

<style scoped>
.register {
  background-color: rgba(51, 51, 51, 1);
  transition: all ease-in-out .3s;
  height: 100%;
}

.tips {
  text-align: center;
  font-family: "楷体", "Microsoft Yahei", sans-serif;
  color: rgba(254, 254, 254, 1);
}

.header {
  font-size: .26rem;
  font-weight: 700;
  margin-top: .5rem;
}

.header-supplement {
  font-size: .18rem;
  font-weight: 600;
  margin-top: .15rem;
  margin-bottom: .5rem;
}

.form-item {
  margin: 0 auto;
  max-width: 5rem;
  min-width: 5rem;
  margin: .25rem 0;
  margin: 0 auto;
}

.form-item button {
  width: 100%;
}

.form-item i {
  cursor: pointer;
}

.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  font-size: 14px;
  line-height: 0;
}

.pswProcess div {
  color: #fff !important;
}
</style>
