<template>
    <div>
        <div class="header">header</div>
        <div class="cont">
            <!--菜单栏开始-->
            <div class="menu">
                <el-menu class="sub_meuns_wapper" mode="vertical" unique-opened :default-active="$route.path" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
                    <side-Meuns :routes="getRoutes"></side-Meuns>
                </el-menu>
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
                getRoutes:[
                    { "path": "",
                        "children": [
                            { "path": "Home",
                                "meta": { "title": "首页", "roles": [ "user", "admin" ], "icon": "el-icon-info" } } ]
                    },
                    {
                        path: '/page',
                        name:'page',
                        meta: { "title": "菜单", "icon": "el-icon-success", "roles": [ "admin", "user" ] },
                        children: [
                            {
                                path: '/page/tableFirst',
                                meta: {
                                    title: '一级1', //菜单名称
                                    roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-info' //菜单左侧的icon图标
                                },
                                children: [
                                    {
                                        path: '/page/tableSecond',
                                        meta: {
                                            title: '二级1', //菜单名称
                                            roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                            icon: 'el-icon-info' //菜单左侧的icon图标
                                        },
                                   /*     children: [
                                            {
                                                path: '/page/tableThree',
                                                meta: {
                                                    title: '三级', //菜单名称
                                                      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                                    icon: 'el-icon-info' //菜单左侧的icon图标
                                                },
                                            }]*/
                                    },
                                    {
                                        path: '/page/tableSecond2',
                                        meta: {
                                            title: '二级2', //菜单名称
                                              roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                            icon: 'el-icon-info' //菜单左侧的icon图标
                                        }
                                    },

                                ]
                            },
                            {
                                path: '/page/tableFirst2',
                                meta: {
                                    title: '一级2', //菜单名称
                                      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-info' //菜单左侧的icon图标
                                },
                            }
                        ]
                    },
                    {
                        path: '',
                        name:'page',
                        meta: { "title": "菜单2", "icon": "el-icon-success", "roles": [ "admin", "user" ] },
                        children: [
                            {
                                path: '/page/tableFirst2-1',
                                meta: {
                                    title: '一级2-1', //菜单名称
                                    roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-info' //菜单左侧的icon图标
                                },
                            },
                            {
                                path: '/page/tableFirst2-2',
                                meta: {
                                    title: '一级2-2', //菜单名称
                                    roles: ['user', 'admin'], //当前菜单哪些角色可以看到
                                    icon: 'el-icon-info' //菜单左侧的icon图标
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
        /*computed: {
            getRoutes() {
                return global.antRouter
            }
        },*/
    }
</script>

<style scoped>
.header{
    height: 7vh;
    line-height: 7vh;
    background-color: #42b983;
    color: #fff;
    font-weight:bolder;
    padding: 0 1vw;
}
.cont{
    display: flex;
}
.menu{
    width: 200px;
    height: 93vh;
    background-color: #B3C0D1;
}
.rightSide{
    width: calc(100% - 200px);
    height: 93vh;
}
</style>