<template>
    <div>
        <p class="til">点击切换</p>
        <div style="display: flex">
            <div :class="[active==i?'on':'', 'tab']" v-for="(item,i) in list" @click="tabChange(i)">
                {{item}}
            </div>
        </div>
        <p class="til">图标根据字段判断显示</p>
        <p>循环数据加src地址 require必须用</p>
        <div>
            <img :src="item.imgsrc" v-for="(item,i) in imageList">
        </div>
        <p>嵌套三元</p>
       <p>$a = 条件1 ? 值1 : (条件2 ? 值2 : (条件3 ? 值3 : (条件4 ? 值4 : 值5)));</p>
        <div>
            <p v-text="item.name=='svg_1'?'svg_1.png':(item.name=='svg_4'?'svg_4.png':(item.name=='svg_7'?'svg_7.png':'svg_11.png'))" v-for="(item,i) in mageList1">
            </p>
        </div>
        <p>判断显示dom显示图片</p>
        <template v-for="(item,i) in mageList1" >
                <img  v-if="item.name=='svg_1'" src="../../assets/img/zdmStyle/svg_1.png" alt="" >
                <img v-else-if="item.name=='svg_4'"  src="../../assets/img/zdmStyle/svg_4.png" alt="" >
                <img  v-else="item.name=='svg_7'" src="../../assets/img/zdmStyle/svg_7.png" alt="" >
        </template>
            <div>
                <p :class="[statedata=='01'?'on1':(statedata=='02'?'on2':'on3') , 'onn']">{{state[statedata]}}</p>
            </div>


    </div>
</template>

<script>
    export default {
        name: "zdmStyle",
        data(){
            return{
                list:[
                    "tab1",
                    "tab2",
                    "tab3",
                    "tab4",
                ],
                active:0,
                imageList:[
                    {
                        name:'svg_1',
                        id:1
                    },
                    {
                        name:'svg_4',
                        id:2
                    },
                    {
                        name:'svg_7',
                        id:3
                    },
                    {
                        id:4
                    },
                ],
                src:require('@/assets/img/zdmStyle/svg_11.png'),
                mageList1:[
                    {
                        name:'svg_1',
                        id:1
                    },
                    {
                        name:'svg_4',
                        id:2
                    },
                    {
                        name:'svg_7',
                        id:3
                    },
                    {
                        id:4
                    },
                ],
                srclist:'',
                statedata:'01',
                state: {
                    "01": "正常",
                    "02": "暂停",
                    "03": "报警"
                }

            }
        },
        created() {
            this.imgChange()
        },
        methods:{
            /*tab切换*/
            tabChange(i) {
                this.active = i
            },
            /*图片转换*/
            imgChange(){
                let that=this
                that.imageList.forEach(function (item,i) {
                    if(item.name=='svg_1'){
                        item.imgsrc=require('@/assets/img/zdmStyle/svg_1.png')
                    }else if(item.name=='svg_4'){
                        item.imgsrc=require('@/assets/img/zdmStyle/svg_4.png')
                    }else if(item.name=='svg_7'){
                        item.imgsrc=require('@/assets/img/zdmStyle/svg_7.png')
                    }else{
                        item.imgsrc=require('@/assets/img/zdmStyle/svg_11.png')
                    }
                })
                console.log(that.imageList)

            }
        },
    }
</script>

<style scoped lang="less">
    p{
        line-height: 3vh;
    }
    .til{
        color: #9a6e3a;
        font-weight: bolder
    }
    .tab{
        cursor: pointer;
        padding: 1vh 1vw;
        background-color: #fff;
        border-radius: 1vh;
        margin: 1vh 0.5vw;
        font-weight: bold;
    }
    .on{
        color: #11bddb;
    }
    .on1:before{
        background-color: green;
    }
    .on2:before{
        background-color: #ff836f;
    }
    .on3:before{
        background-color: #ffac17;
    }
    .onn:before{
        content: '';
        display: inline-block;
        width: 1vw;
        height: 1vw;
        border-radius: 50%;
        margin-right: 0.5vw;
    }

</style>