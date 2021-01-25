<template>
  <div>
    <!--横向-->
    <div class="box">
      <ul class="tilth">
        <li>时间</li>
        <li style="width:40%">地址</li>
        <li>类型</li>
      </ul>
      <vue-seamless-scroll  :data="listData" class="warp"   :class-option="classOption">
        <ul>
          <li v-for="(item, index) in listData" :key="index">
            <span class="itemspan"  v-text="item.time"></span>
            <span class="itemspan" style="width:40%" v-text="item.adress"></span>
            <span class="itemspan" style="color: red" v-text="item.type"></span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <!--纵向-->
    <div class="right_bottom">
      <div class="thfirst">全部</div>
      <span class="left-arrow" @click="top"></span>
      <div class="scroll">
        <div :class="['qjlist', active==item.name?'on':'']"  v-for="item in listData2" :key="item.name" @click="handledclick(item.name)">
          {{item.name}}
        </div>
      </div>
      <span class="right-arrow" @click="down"></span>
    </div>
  </div>
</template>
<script>
  import vueSeamlessScroll from 'vue-seamless-scroll';//引进scroll
export default {
  data() {
    return {
      listData:[
        {
          time:'12:00:00',
          adress:'一期一区风机房',
          type:'烟雾报警'
        },
        {
          time:'12:00:00',
          adress:'一期一区风机房',
          type:'烟雾报警'
        },
        {
          time:'12:00:00',
          adress:'一期一区风机房',
          type:'烟雾报警'
        },
        {
          time:'12:00:00',
          adress:'一期一区风机房',
          type:'烟雾报警'
        },  {
          time:'12:00:00',
          adress:'一期一区风机房',
          type:'烟雾报警'
        },
      ],
      listData2:[
        {name:'一区一期'},
        {name:'一区二期'},
        {name:'一区三期'},
        {name:'一区四期'},
        {name:'一区五期'},
        {name:'一区六期'},
        {name:'一区七期'},
        {name:'一区八期'},
      ],
      active:''
    }

  },
  components: {
    vueSeamlessScroll},
  computed: {
    classOption () {
      return {
        step: 0.2, // 数值越大速度滚动越快
        /*  limitMoveNum: 4, // 开始无缝滚动的数据量 this.dataList.length*/
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    },
  },
  methods:{
    top(){
      var newarry = Object.assign([], this.listData2);
      let b=newarry[0]
      this.listData2.shift()
      this.listData2.push(b)
    },
    down(){
      var newarry = Object.assign([], this.listData2);
      let b=newarry[this.listData2.length-1]
      this.listData2.pop()
      this.listData2.unshift(b)
    },
    handledclick(name){
      this.active = name
    },
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .box{
    width: 500px;
    background-color: #1f2d3d;
  }
  .tilth{
    display: flex;
    width: 100%;
    color: #fff;
    padding: 1vh 1vw;
    margin: 1vh 0 2vh;
    box-sizing: border-box;
    background-color: rgba(26, 104, 176, 0.18);
    border: 1px solid  rgba(26, 104, 176, 0.4);
    li{
      color: #fff;
      display: inline-block;
      width: 30%;
    }
  }
  .itemspan{
    color: #fff;
    display: inline-block;
    width: 30%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 4vh;
  }
  .warp{
    width: 100%;
    height: 14vh;
    margin: 0 auto;
    overflow: hidden;
  }
  .right_bottom {
    width: 6.51vw;
    height: 40.27vh;
    float: right;
    position: relative;
    z-index: 10;
    margin-bottom:0;
    background: url("../../assets/img/tableFirst2-2/exhaust_15.png");
    background-size: 6.51vw 40.27vh;
    color: #fff;
    font-size: 1.1vw;
    .thfirst{
      line-height: 4.5vh;
      font-weight: bolder;
      color: rgba(0, 255, 255, 1);
      text-indent: 1vw;
      position: relative;
      &:after{
        content: '';
        display: inline-block;
        width: 1.3vw;
        height: 2vh;
        position: absolute;
        right: 0;
        top: 1vh;
        background: url("../../assets/img/tableFirst2-2/exhaust_9.png") center no-repeat;
        background-size: contain;
      }
    }
    .qjlist{
      line-height: 4.5vh;
      text-indent: 1vw;
      cursor: pointer;
      &:hover{
        color:#00ffff;
      }
    }
    .qjlist.on{
      color:#00ffff;
    }
    .scroll{
      height: 30.7vh;
      overflow: hidden;
      margin-bottom:0.8vh ;

    }
    .on{
      color: #00b0f0;
    }
    .img1 {
      width: 1.25vw;
      height: 2.22vh;
      float: left;
      margin-left: 2.63vw;
    }
    .img2 {
      .img1;
      margin-top: 35.87vh;
    }
    .img3 {
      width: 1.15vw;
      height: 1.3vh;
    }
    .innerr {
      width: 80%;
      height: 4vh;
      float: left;
      margin-left: 1vw;
    }
    .spann {
      width: 5vw;
      height: 3vh;
      font-size: 14px;
      color: #fff;
    }
    .inner {
      margin-top: -35vh;
      .innerr;
      span {
        .spann;
        color: #00ffff;
      }
      img {
        float: right;
        margin-top: 0.8vh;
      }
    }

    .inner2 {
      margin-top: -30.5vh;
      .innerr;
      span {
        .spann;
      }
    }
    .inner3 {
      margin-top: -26vh;
      .innerr;
      span {
        .spann;
      }
    }
    .inner4 {
      margin-top: -21.5vh;
      .innerr;
      span {
        .spann;
      }
    }
    .inner5 {
      margin-top: -17vh;
      .innerr;
      span {
        .spann;
      }
    }
    .inner6 {
      margin-top: -12.5vh;
      .innerr;
      span {
        .spann;
      }
    }
    .inner7 {
      margin-top: -8vh;
      .innerr;
      span {
        .spann;
      }
    }
  }
  .left-arrow,.right-arrow{
    display: inline-block;
    width: 100%;
    height: 1.2vw;
    cursor: pointer;
  }
  .left-arrow{
    background: url("../../assets/img/tableFirst2-2/exhaust_7.png") center no-repeat;
    background-size: contain;
  }
  .right-arrow{
    background: url("../../assets/img/tableFirst2-2/exhaust_8.png") center no-repeat;
    background-size: contain;
  }
</style>
