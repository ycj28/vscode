<template>
   <div class="home">
      <Header />
      <el-container class="content">
         <Menu />
         <el-container>
            <el-main>Main</el-main>
            <el-footer>
               <Footer />
            </el-footer>
         </el-container>
      </el-container>
   </div>
</template>

<script>
import Header from "../components/common/Header.vue"
import Footer from "../components/common/Footer.vue"
import Menu from "../components/common/Menu.vue"
export default {
   components: {
      Header,
      Footer,
      Menu
   },
   data () {
      return {

      }
   }
}
</script>


<style lang="scss">
.home {
   width: 100%;
   height: 100%;

   .content {
      position: absolute;
      width: 100%;
      top: 60px;
      bottom: 0;
   }
}
</style>
