<template>
    <div class="">
     <p>http://localhost:8080/#/threeJs</p>
     <p>http://localhost:8080/#/level01</p>
     <p>http://localhost:8080/#/level02</p>
     <p>http://localhost:8080/#/level03</p>
     <p>http://localhost:8080/#/house</p>
    </div>
</template>

<script>
    export default {
        name: "fullScreen",
        data() {
            return {};
        },
        mounted() {},
        methods: {},
        destroyed() {}
    }
</script>


<style scoped lang="less">
    #container {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    #label {
        position: absolute;
        padding: 10px;
        background: rgba(255, 255, 255, 0.6);
        line-height: 1;
        color:#000000;
        border-radius: 5px;
        display:none;
        line-height: 3vh;
        font-size: 0.9vw;
    }
    .stylevid{
        width: 12vw;
        height: 30vh;
        object-fit: fill;
        position: fixed;
        bottom: 3vh;
        right: 1vw;
    }
    .home{
        position: fixed;
        color: #fff;
        margin-top: 10vh;
        margin-left: 1vw;
        font-size: 1vw;
        cursor: pointer;
    }
</style>