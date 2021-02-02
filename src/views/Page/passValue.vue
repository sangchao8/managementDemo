<template>
    <div class="passValue">
        在page.vue用了keep-alive的exclude
       <p>我是父组件的正文</p>
        <!--子组件-->
        <pass-children :passValue="parentValue" @setParent="setParent"></pass-children>
        <p>{{value}}</p>

    </div>
</template>

<script>
    import passChildren from "@/views/Page/passChildren";
    export default {
        name: "passValue",
        components: {passChildren},
        data() {
            return {
                parentValue:'我是父组件里面的值',
                value:'',

            };
        },
        methods:{
            setParent(data){
                this.value=data
            },

        }
    }
</script>


<style scoped lang="less">
.passValue{
    line-height: 6vh;
}

</style>