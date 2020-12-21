<template>
<div class="root">
  <h1 class="showTitleInTest">root</h1>
  <div>
    <el-form :model="registerFormData" ref="registerForm" :rules="rules">
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input show-password type="password" v-model="registerFormData.password" autocomplete="off" placeholder="8-20位字符在数字、小写、大写字母以及特殊字符中四选三"></el-input>
        <el-progress :percentage="passwordPercent" :format="passwordPercentFormat"></el-progress>
      </el-form-item>
      <el-form-item label="再次输入密码" :label-width="formLabelWidth" prop="comfirmPassword">
        <el-input v-model="registerFormData.comfirmPassword" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'root',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        //6-20位包含字符、数字和特殊字符
        var ls = 0;
        if (this.registerFormData.password !== '') {
          if (this.registerFormData.password.match(/([a-z])+/)) {
            ls++;
          }
          if (this.registerFormData.password.match(/([0-9])+/)) {
            ls++;
          }
          if (this.registerFormData.password.match(/([A-Z])+/)) {
            ls++;
          }
          if (this.registerFormData.password.match(/([\W])+/) && !this.registerFormData.password.match(/(![\u4E00-\u9FA5])+/)) {
            ls++;
          }
          if (this.registerFormData.password.length < 6 || this.registerFormData.password.length > 20) {
            callback(new Error('要求6-20位字符'));
            ls = 0;
          }
          if (this.registerFormData.password.match(/([\u4E00-\u9FA5])+/)) {
            callback(new Error('不能包含中文字符'));
            ls = 0;
          }
          switch (ls) {
            case 0:
              this.passwordPercent = 0;
              callback(new Error('数字、小写字母、大写字母以及特殊字符中四选三'));
              break;
            case 1:
              this.passwordPercent = 33;
              callback(new Error('数字、小写字母、大写字母以及特殊字符中四选三'));
              break;
            case 2:
              this.passwordPercent = 66;
              callback(new Error('数字、小写字母 、大写字母以及特殊字符中四选三'));
              break;
            case 3:
            case 4:
              this.passwordPercent = 100;
              break;
            default:
              this.passwordPercent = 0;
              break;
          }
        }
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerFormData.comfirmPassword !== this.registerFormData.password) {
          callback(new Error('两次输入的密码不一致'));
          // this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    return {
      passwordPercent: 0,
      //表单变量
      registerFormData: {
        password: '',
        comfirmPassword: '',
      },
      formLabelWidth: '120px',
      rules: {
        password: [{
          required: true,
          validator: validatePassword,
          trigger: ['blur', 'change']
        }, ],
        comfirmPassword: [{
          required: true,
          validator: validateConfirmPassword,
          trigger: ['blur', 'change']
        }],
      },
    }
  },
  props: {},
  components: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped>

</style>
