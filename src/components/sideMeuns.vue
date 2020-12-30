<template>
  <div class="sideMeuns">
      <div class="">
          <!-- 遍历路由表，生成左侧菜单 -->
          <div v-for="(item,index) in meuns" :key="index">
              <template v-if="!item.hidden">
              <!-- 一级菜单的情况 -->
                 <!-- {{item.children[0].path}}-->
              <template v-if="item.children&&item.children.length===1">
                 <!-- {{item.children[0].path}}-->
                  <router-link :to="item.children[0].path">
                      <!--           index跟浏览器地址对应，这样菜单才能显示选中状态  -->
                      <el-menu-item :index="item.children[0].path">
                          <template slot="title">
                              <!-- 设置icon -->
                              <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                              <!-- 菜单名称 -->
                              {{item.children[0].meta.title}}
                          </template>
                      </el-menu-item>
                  </router-link>
              </template>
              <!-- 一级菜单的情况 end-->
              <!-- 多级菜单 -->
              <template v-else>
                  <el-submenu :index="item.path">
                      <template slot="title">
                          <i :class="item.meta.icon"></i>
                          {{item.meta.title}}
                      </template>
                      <!-- 遍历子菜单 -->
                      <template v-if="item.children">
                          <div v-for="(itemChild,indexChild) in item.children" :key="indexChild">
                              <!-- 当发现存在3级或大于3级菜单时,重新遍历当前组件 -->
                              <template v-if="itemChild.children&&itemChild.children.length>0">
                                  <side-meuns :routes="[itemChild]" class="nest-menu"></side-meuns>
                              </template>
                              <!-- 2级菜单时-->
                              <template v-else>
                                  <router-link :to="itemChild.path">
                                      <el-menu-item :index="itemChild.path">
                                          <i v-if="itemChild.meta.icon" :class="itemChild.meta.icon"></i>
                                          {{itemChild.meta.title}}</el-menu-item>
                                  </router-link>
                              </template>
                          </div>
                      </template>
                      <!-- 遍历子菜单 end-->
                  </el-submenu>
              </template>
              <!-- 多级菜单 end-->
              </template>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'sideMeuns',
  props: {
      routes: {
          type: Array,
          default: () => []
      }
  },
  data() {
        return {
            meuns: ''
        }
    },
  mounted() {
        this.meuns = this.routes
    }
}
</script>
<style scoped lang="less">
    .app_wapper {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .app_content {
        min-height: 500px;
        margin-left: 180px;
        border: 1px solid #eee;
        box-sizing: border-box;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .app_wapper .el-aside,
    .slider_container .el-menu {
        color: #333;
        transition: width .28s;
        width: 180px !important;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 1001;
        background-color: rgb(48, 65, 86);
    }
    ::v-deep .is-opened {

        .el-submenu__title{
            background-color: rgba(0, 0, 0, 0.2) !important;
        }
        .el-menu{
            background-color: rgba(0, 0, 0, 0.2) !important;
        }
        .el-menu-item{
            background-color: rgba(0, 0, 0, 0.2) !important;
        }
    }
    .icon-shangjiantou{
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
        display: inline-block;
    }
</style>
