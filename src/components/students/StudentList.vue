<template>
   <div class="studentList">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
         <el-form-item i>
            <el-input v-model="formInline.name" placeholder="请输入姓名查询"></el-input>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="find">查询</el-button>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="el-icon-refresh-right" @click="reset">重置</el-button>
         </el-form-item>
      </el-form>


      <el-table :data="compData" border style="width: 100%;">
         <el-table-column prop="name" label="姓名" align="center">
         </el-table-column>
         <el-table-column prop="age" label="年龄" align="center">
         </el-table-column>
         <el-table-column prop="sex_text" label="性别" align="center">
         </el-table-column>
         <el-table-column prop="number" label="学号" align="center">
         </el-table-column>
         <el-table-column prop="class" label="班级" align="center">
         </el-table-column>
         <el-table-column prop="state_text" label="状态" align="center">
         </el-table-column>
         <el-table-column prop="address" label="地址" align="center">
         </el-table-column>
         <el-table-column prop="phone" label="手机号码" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)"></el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-pagination background @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 50]"
         @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize"
         layout="total,sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
   </div>
</template>
 
<script>
import { students, studentDel } from '../../api/api.js'
export default {
   data () {
      return {
         tableData: [],
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
         formInline: {
            name: ''
         },
      }
   },
   created () {
      this.getData();
   },
   computed: {
      compData () {
         return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      }
   },
   methods: {
      find () {
         console.log(this.formInline)
         this.getData(this.formInline)
      },
      reset () {
         this.formInline = {}
         this.getData(this.formInline)
      },
      getData (params) {
         students(params)
            .then(res => {
               if (res.data.status === 200) {
                  this.tableData = res.data.data
                  this.total = res.data.total
                  this.tableData.forEach(item => {
                     item.sex === 1 ? item.sex_text = '男' : item.sex_text = '女';
                     item.state === "1" ? item.state_text = '已入学' : item.state === "2" ? item.state_text = '未入学' : item.state_text = '休学中';
                  })
               }

            })
      },
      handleSizeChange (val) {
         this.pageSize = val
         this.currentPage = 1
         console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
         this.currentPage = val
         console.log(`当前页: ${val}`);
      },
      del (row) {
         console.log(row)
         studentDel(row.id).then(res => {
            console.log(res)
            if (res.data.status === 200) {
               this.$message({ message: "删除数据成功", type: 'success' })
               this.getData()
            }
         })
      }
   }
}
</script>

<style lang="scss" scop>
.studentList {

   .demo-form-inline,
   .el-form-item {
      margin-right: 20px;
      text-align: left;
   }

   .el-pagination {
      margin-top: 20px;
   }
}
</style>