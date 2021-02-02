<template>
    <div class="passChildren">
        <p>下面是父组件通过props传过来的值</p>
        <P>{{passValue}}</P>
        <div @click="setValue" class="btn">我是子组件里面改变父组件的按钮</div>
    </div>
</template>

<script>
    export default {
        name: "passChildren",
        props:['passValue'],
        data() {
            return {
                children:'我是子组件data内容'
            };
        },
        methods:{
            setValue(){
                this.$emit('setParent',this.children);//select事件触发后，自动触发showCityName事件
            },

        },
    }
</script>


<style scoped lang="less">
.passChildren{
    font-size: 1vw;
    color: red;
}
    .btn{
        background-color: #2D64AB;
        /*color: #fff;*/
        display: inline-block;
        cursor: pointer;
    }
</style>