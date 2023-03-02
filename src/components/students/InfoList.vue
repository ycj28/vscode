<template>
   <div class="infoList">
      <el-form :inline="true" class="demo-form-inline" size="small">
         <el-form-item>
            <el-button type="primary" icon="el-icon-circle-plus" @click="addStudent()">新增</el-button>
         </el-form-item>
      </el-form>

      <el-table :data="tableData" border style="width: 100%;">
         <el-table-column prop="name" label="姓名" align="center">
         </el-table-column>
         <el-table-column prop="age" label="年龄" align="center">
         </el-table-column>add
         <el-table-column prop="sex" label="性别" align="center">
         </el-table-column>
         <el-table-column prop="father" label="父亲名字" align="center">
         </el-table-column>
         <el-table-column prop="mother" label="母亲名字" align="center">
         </el-table-column>
         <el-table-column prop="time" label="入校时间" align="center">
         </el-table-column>
         <el-table-column prop="address" label="家庭住址" align="center">
         </el-table-column>
         <el-table-column prop="phone" label="联系方式" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>

      <el-dialog :title="status ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
         <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
               <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
               <el-input v-model="form.age" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
               <el-radio-group v-model="form.sex" prop="sex">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item label="父亲名字" prop="father" :label-width="formLabelWidth">
               <el-input v-model="form.father" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="母亲名字" prop="mother" :label-width="formLabelWidth">
               <el-input v-model="form.mother" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="入校时间" :label-width="formLabelWidth">
               <el-col :span="11">
                  <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"
                     v-model="form.time" style="width: 100%;"></el-date-picker>
               </el-col>
            </el-form-item>
            <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
               <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="家庭住址" :label-width="formLabelWidth">
               <el-input type="textarea" v-model="form.address"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="closeInfo('form')">取 消</el-button>
            <el-button type="primary" @click="sure('form')">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>

<script>
import { info, getInfo, infoDel, infoUpdate } from "../../api/api.js"
export default {
   data () {
      return {
         tableData: [],
         dialogFormVisible: false,
         form: {
            name: '',
            sex: '1',
            age: '',
            father: '',
            mother: '',
            address: '',
            time: '',
            phone: '',

         },
         rules: {
            name: [{ required: true, message: "请输入姓名" }],
            sex: [{ required: true }],
            age: [{ required: true, message: "请输入年龄" }],
            address: [{ required: true, message: "请输入地址" }],
            time: [{ required: true, message: "请选择时间" }],
            phone: [{ required: true, message: "请输入联系方式" }],
         },
         formLabelWidth: "80px",
         total: 0,
         status: true,
      }
   },
   created () {
      this.getData()
   },
   methods: {
      edit (row) {
         this.status = false
         this, this.dialogFormVisible = true
         this.form = { ...row }
         console.log(row)
      },
      del (row) {
         console.log(row)
         infoDel(row.id).then(res => {
            console.log(res)
            if (res.data.status === 200) {
               this.$message({ message: "删除数据成功", type: 'success' })
               this.getData()
            }
         })
      },
      addStudent () {
         this.form = {
            sex: '1'
         },
            this.status = true
         this.dialogFormVisible = true
      },
      getData () {
         getInfo().then(res => {
            if (res.data.status === 200) {
               this.tableData = res.data.data
               this.total = res.data.total
            }
         })
      }
      ,
      closeInfo (form) {
         this.dialogFormVisible = false
         this.$refs[form].resetFields()
      },
      sure (form) {
         this.$refs[form].validate(valid => {
            if (valid) {
               console.log(this.form)
               if (this.status) {
                  info(this.form).then(res => {
                     if (res.data.status === 200) {
                        this.getData()
                        this.dialogFormVisible = false
                        this.$refs[form].resetFields()
                        this.$message({ type: 'success', message: res.data.message })
                     }
                  })
               }
               else {
                  infoUpdate(this.form).then(res => {
                     if (res.data.status === 200) {
                        this.getData()
                        this.dialogFormVisible = false
                        this.$refs[form].resetFields()
                        this.$message({ type: 'success', message: res.data.message })
                     }
                  })
               }
            }
         })
      }
   }
}
</script>

<style lang="scss" scop>
.infoList {

   .demo-form-inline,
   .el-form-item {
      margin-left: 20px;
      text-align: left;


   }

   .el-pagination {
      margin-top: 20px;
   }
}
</style>