<template>
    <div>
        <div class="header">header</div>
        <div class="cont">
            <!--菜单栏开始-->
            <div :class="[this.menuStatue?'down':'up','menu']">
                <el-menu class="sub_meuns_wapper" mode="vertical" unique-opened :default-active="$route.path" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
                <side-Meuns :routes="getRoutes"></side-Meuns>
            </el-menu>
                <div :class="[this.menuStatue?'':'arrowup','arrow']" class="" @click="up">
                    <i v-if="this.menuStatue" class="el-icon-d-arrow-left"></i>
                    <i v-else class="el-icon-d-arrow-right"></i>

                </div>
            </div>
            <!--菜单内容-->
            <div class="rightSide">
               <router-view />
            </div>
        </div>

    </div>
</template>
<script>
    // 左侧菜单组件
    /*import NavHeader from '@/components/NavHeader'*/
    import sideMeuns from '@/components/sideMeuns'
   /* import { permissionRouter } from '@/router'*/
    export default {
        name: "Page",
        data () {
            return {
                menuStatue: true,//菜单收缩状态
                getRoutes:[
                    { "path": "",
                        "children": [
                            { "path": "Home",
                                "meta": { "title": "首页", "roles": [ "user", "admin" ], "icon": "el-icon-s-home" } } ]
                    },
                    {
                        path: '/page',
                        name:'page',
                        meta: { "title": "菜单", "icon": "el-icon-menu", "roles": [ "admin", "user" ] },
                        children: [
                            {
                                path: '/page/tableFirst',
                                meta: {
                                    title: '一级1', //菜单名称
                                    roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'iconfont icon-shangjiantou' //菜单左侧的icon图标
                                },
                                children: [
                                    {
                                        path: '/page/tableSecond',
                                        meta: {
                                            title: '表单事例', //菜单名称
                                            roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                            icon: 'el-icon-star-on' //菜单左侧的icon图标
                                        },
                                   /*     children: [
                                            {
                                                path: '/page/tableThree',
                                                meta: {
                                                    title: '三级', //菜单名称
                                                      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                                    icon: 'el-icon-star-on' //菜单左侧的icon图标
                                                },
                                            }]*/
                                    },
                                    {
                                        path: '/page/tableSecond2',
                                        meta: {
                                            title: '树的懒搜索加载', //菜单名称
                                              roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                            icon: 'el-icon-star-on' //菜单左侧的icon图标
                                        }
                                    },

                                ]
                            },
                            {
                                path: '/page/tableFirst2',
                                meta: {
                                    title: '一级2', //菜单名称
                                      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-star-on' //菜单左侧的icon图标
                                },
                            }
                        ]
                    },
                    {
                        path: '',
                        name:'page',
                        meta: { "title": "菜单2", "icon": "el-icon-menu", "roles": [ "admin", "user" ] },
                        children: [
                            {
                                path: '/page/tableFirst2-1',
                                meta: {
                                    title: '一级2-1', //菜单名称
                                    roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-star-on' //菜单左侧的icon图标
                                },
                            },
                            {
                                path: '/page/tableFirst2-2',
                                meta: {
                                    title: '一级2-2', //菜单名称
                                    roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-star-on' //菜单左侧的icon图标
                                },
                            }
                        ]
                    },
                ]
            }
        },
        components: {
            sideMeuns
        },
        methods:{
            up(){
                this.menuStatue=!this.menuStatue
            }
        },
        /*computed: {
            getRoutes() {
                return global.antRouter
            }
        },*/
    }
</script>

<style scoped lang="less">
.header{
    height: 7vh;
    line-height: 7vh;
    background-color: #42b983;
    color: #fff;
    font-weight:bolder;
    padding: 0 1vw;
    box-shadow: 0px 0px 20px #00000047;
}
.cont{
    display: flex;
}
.menu{
    height: 93vh;
    background-color: #B3C0D1;
    position: relative;
    .sub_meuns_wapper{
        width: 100%;
        overflow: hidden;
    }
    .arrow{
        width: 1.5vw;
        height: 1.5vw;
        line-height: 1.5vw;
        position: absolute;
        color: #ffffff;
        text-align: center;
        font-size: 1vw;
        cursor: pointer;
        top: 1.5vh;
        right: 0.5vw;
        background-color: rgb(106,123,137);
        border-radius: 50%;
        box-shadow: 0px 0px 20px 1px #00000047;
    }
    .arrowup{
        top: 0.2vh;
        right: 0.5vw;
    }
}
.up{
    width: 35px;
    ::v-deep .el-icon-arrow-down:before{
        content: "";
    }
    ::v-deep .el-submenu__title{
        padding-left: 5px!important;
    }
    ::v-deep .el-menu-item{
        padding-left: 5px!important;
    }
    transition:width .08s ease-in;
}
.down{
    width: 200px;
    transition:width .08s ease-in;
}
.rightSide{
    width: calc(100% - 200px);
    height: 93vh;
    background-color: #dfdfdf;
    padding: 2vh 1vw;
    box-sizing: border-box;
}
</style>