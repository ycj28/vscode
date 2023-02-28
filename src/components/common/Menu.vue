<template>
   <div class="menu">
      <el-aside width="250px">
         <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#2578b5" text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
               <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
               </template>
               <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                  <el-menu-item index="1-3">选项3</el-menu-item>
               </el-menu-item-group>
            </el-submenu>
         </el-menu>
      </el-aside>
   </div>
</template>
<script>
export default {
   data () {
      return {}
   }
}
</script>
<style lang="scss" scoped>
.menu {
   .el-aside {
      height: 100%;

      .el-menu {
         height: 100%;
      }

      .el-submenu .el-menu-item {
         min-width: 0;
      }
   }
}
</style>