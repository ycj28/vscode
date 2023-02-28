<template>
   <div class="login">
      <el-card class="box-card">
         <div slot="header" class="clearfix">
            <span>通用后台管理系统</span>
         </div>
         <el-form label-width="80px" :model="form" ref="form" :rules="rules">
            <el-form-item label="用户名" prop="username">
               <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
               <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-button type="primary" @click="login('form')">登录</el-button>
         </el-form>
      </el-card>

   </div>
</template>

<script>
import { nameRule, pwdRule } from '../utils/vaildate.js'
import { login } from '../api/api.js'
import { setToken } from '../utils/setTokens.js'
export default {
   data () {
      return {
         form: {
            username: "",
            password: ""
         },
         rules: {
            username: [{ validator: nameRule, trigger: 'blur' }],
            password: [{ validator: pwdRule, trigger: 'blur' }]
         }
      };
   },
   methods: {
      login (form) {
         this.$refs[form].validate((valid) => {
            if (valid) {
               console.log(this.form)
               /* 将这个方法封装成api进行调用
               this.service.post('/login', this.form)
                  .then((res) => {
                     if (res.data.status === 200) {
                        setToken('username', res.data.username)
                        setToken('token', res.data.token)
                        this.$message({ message: res.data.message, type: 'success' })
                        this.$router.push('/home')
                     }
                     console.log(res)
                  })
                  */
               login(this.form).then(res => {
                  if (res.data.status === 200) {
                     setToken('username', res.data.username)
                     setToken('token', res.data.token)
                     this.$message({ message: res.data.message, type: 'success' })
                     this.$router.push('/home')
                  }
               })
            } else {
               console.error(this.form)
            }
         })
      }
   }
}
</script>

<style lang="scss">
.login {
   width: 100%;
   height: 100%;
   position: absolute;
   background: #409EFF;

   .el-card {
      background: #657685;
   }

   .box-card {
      width: 450px;
      margin: 200px auto;
      color: #fff;

      .el-form .el-form-item__label {
         width: 100px;
         color: #fff;
      }

      .el-card__header {
         font-size: 34px;
      }

      .el-button {
         width: 100%;
      }
   }
}
</style>