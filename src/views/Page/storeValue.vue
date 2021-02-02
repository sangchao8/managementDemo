<template>
    <div class="storeValue">
        <!--只看storeValue文件和store/index.js文件-->
        <p class='btn' @click="changeStore">{{lefvalue}}</p>
        <p style="margin-top: 2vh">下面是store的值</p>
        <p style="color: red">{{$store.state.Value}}</p>

        <p>{{value}}</p>


        <p style="margin-top: 3vh">
            使用vuex的问题记录--解决刷新页面state数据消失
        </p>
        <p>使用vuex-persistedstate 插件</p>
        <p>安装插件：npm install vuex-persistedstate --save</p>
        <p>配置：
            在store的index.js中，手动引入插件并配置</p>
        <p>import createPersistedState from "vuex-persistedstate"
            const store = new Vuex.Store({
            // ...
            plugins: [createPersistedState()]
            })
            该插件默认持久化所有state，当然也可以指定需要持久化的state：

            import createPersistedState from "vuex-persistedstate"
            const store = new Vuex.Store({
            // ...
            plugins: [createPersistedState({
            storage: window.sessionStorage,
            reducer(data) {
            return {
            // 设置只储存state中的myData
            myData: data.myData
            }
            }
            })]</p>
    </div>
</template>

<script>
    import * as Vuex from 'vuex'
    export default {
        name: "storeValue",
        data() {
            return {
                lefvalue:'',
                changeStoreValue:'改变了的store值'
            };
        },
        created() {
            this.lefvalue=this.$store.state.Value
        },
        methods:{
            changeStore(){
                this.$store.dispatch('setValueName',this.changeStoreValue)//提交了store/index.js的actions方法——mutations方法
            }
        },
        computed:{
            value:function(){
                return this.$store.getters.getValue
            }
        }
    }
</script>


<style scoped lang="less">
    .btn{
        background-color: #2D64AB;
        /*color: #fff;*/
        display: inline-block;
        cursor: pointer;
        margin-top: 2vh;
    }
</style>