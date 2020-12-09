<template>
<div class="login">
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
    <el-form :model="setData" status-icon :rules="rules" ref="setData">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="password">
            <el-input :type="inputType" v-model="setData.password" placeholder="设置管理密码" autocomplete="off">
              <i class="iconfont icon-eyedefuben eyedefuben" style="font-size: 0.24rem;" v-show="!eyeShow" @click="eyeChange()" slot="suffix"></i>
              <i class="iconfont icon-eye eye" v-show="eyeShow" style="margin-right: 0.04rem;" @click="eyeChange()" slot="suffix"></i>
            </el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item v-if="eyeShow" key="hasProp" >
            <el-input type="password" v-model="setData.checkpassword" :disabled="eyeShow" placeholder="确认管理密码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-else prop="checkpassword">
            <el-input type="password" v-model="setData.checkpassword" :disabled="eyeShow" placeholder="确认管理密码" autocomplete="off"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="grid-content bg-purple form-item">
          <el-form-item prop="pswtips">
            <el-input v-model="setData.pswtips" placeholder="设置提示" autocomplete="off"></el-input>
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
</div>
</template>

<script>
export default {
  name: 'login',
  data() {
    var validatePass = (rule, value, callback) => { //* 密码校验
      if (value === '') {
        callback(new Error('请设置密码'));
      }
      if (value.trim().length < 6) {
        callback(new Error('请设置至少六位的密码'));
      } else {
        if (this.setData.password !== '') {
          this.$refs.setData.validateField('checkpassword');
        }
        callback();
      }
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
      header: '首次使用需要设置管理密码',
      headerSupplement: '用于验证进入及加密数据(忘记无法找回)',
      eyeShow: false, //* 密码可视小眼睛 //* 确认密码输入框是否可编辑(是否需要确认密码)
      inputType: 'password', //* 输入框类型
      setData: {
        password: '', //* 密码
        checkpassword: '', //* 确认密码
        pswtips: '', //* 密码提示
      },
      rules: {
        password: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkpassword: [{
          validator: validatePassCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  props: {},
  components: {},
  mounted() {},
  methods: {
    submitForm(formName) { //* 表单提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //? TODO
          console.info(this.setData);
        } else {
          console.warn('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) { //* 重置表单
      this.eyeShow = !this.eyeShow; //* 眼睛 icon 切换
      this.inputType = 'password';
      this.$refs[formName].resetFields();
    },
    eyeChange() {
      this.eyeShow = !this.eyeShow; //* 眼睛 icon 切换
      if (this.eyeShow) {
        this.inputType = 'text';
        // this.$refs.examine.clearValidate('barCvalidatePassCheckode');
      } else {
        this.inputType = 'password';
        // this.$refs.examine.addValidate('barCvalidatePassCheckode');
      }

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
}

.tips {
  text-align: center;
  font-family: "楷体", "Microsoft Yahei", sans-serif;
  color: rgba(254, 254, 254, 1);
}

.header {
  font-size: .26rem;
  font-weight: 700;
  margin-top: 1rem;
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
</style>
