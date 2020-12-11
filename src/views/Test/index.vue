<template>
<div class="test">
  <h1>Test</h1>
  <el-input type="text" v-model="dataInfo.psw" placeholder="确认管理密码" autocomplete="off"></el-input>
  <el-input type="text" v-model="dataInfo.psw" placeholder="确认管理密码" autocomplete="off"></el-input>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="grid-content bg-purple form-item">
        <el-button type="info" plain @click="add">add</el-button>
        <el-button type="info" plain @click="readAll">readAll</el-button>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
const storeName = 'registerPsw';

export default {
  name: 'test',
  data() {
    return {
      datas: [],
      dataInfo: {
        psw: '111',
        id: 1
      }
    }
  },
  props: {

  },
  components: {},
  mounted() {},
  methods: {
    async add() {
      console.info(this.data)
      await this.db[storeName].add(this.dataInfo).catch(err => {
        console.info(err.message)
      })
    },
    async readAll() {
      this.datas = await this.db[storeName].readAll().catch(err => {
        console.info(err.message)
      })
      console.info(this.datas)
    }
  },
}
</script>

<style scoped>
</style>
