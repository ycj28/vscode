<template>
   <div class="studentList">
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
            <template>
               <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
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
import { students } from '../../api/api.js'
export default {
   data () {
      return {
         tableData: [],
         currentPage: 1,// 当前页数是1
         pageSize: 10, // 每页显示条数
         total: 0,//
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
      }
   }
}
</script>

<style lang="scss" scop>
.studentList {
   .el-pagination {
      margin-top: 20px;
   }
}
</style>