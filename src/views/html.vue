<template>
    <div>
        <iframe class="iframe" src="http://localhost:8080/html/index.html" frameborder="0">

        </iframe>
        <div class="right">
            <div @click="clickbox">box1</div>
            <div>box2</div>
            <div>box3</div>
        </div>
    
    </div>
</template>

<script>
    export default {
        name: "html",
        methods:{
            clickbox(){
                window.open('/html/index.html','_self')
            }
        }
    }
</script>

<style scoped lang="less">
    .iframe{
        padding:0 0 ;
        margin: 0 0;
        width: 100vw;
        height: 100vh;
        background-color: #2D64AB;
    }
    .right{
        right: 0;
        width: 28vw;
        top: 0;
        z-index: 20;
        position: fixed;
        height: 100vh;
        display: flex;
        flex-flow: column;
        justify-content: space-around;
        cursor: pointer;
        div{
            width: 100%;
            height: 30vh;
            text-align: center;
            line-height: 30vh;
            color: #fff;
            background-color: #395372;
            cursor: pointer;
        }
    }

</style>