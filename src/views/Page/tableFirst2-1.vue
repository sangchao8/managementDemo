<template>
  <div class="helloword">
    <div class="text-event">
      <vue-draggable-resizable
              :w="300"
              :h="300"
              :x="50"
              :y="50"
              :min-width="200"
              :min-height="100"
              :parent="true"
              :grid="[10,10]"
              class-name="dragging1"
              @dragging="onDrag"
              @resizing="onResize"
      >
        <div class="svgbox" @dblclick.stop="dblclickhandle">
          <div class="icon" :style="{top: yzb + 'px', left: xzb + 'px'}"></div>
        </div>
          <p>我是可以拖拽缩放的盒子</p>
      </vue-draggable-resizable>
    </div>

    <!-- 相对于class等于什么的标记拖拽 注意指定 parent -->
    <!--<div class="p-event">
      <vue-draggable-resizable
              parent=".p-event"
      >
        <p>You can drag me around and resize me as you wish.</p>
      </vue-draggable-resizable>
    </div>-->


  </div>
</template>
<script>
  import VueDraggableResizable from 'vue-draggable-resizable'
  export default {
    name: "HelloWorld",
    data: function() {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        yzb:0,
        xzb:0,
      };
    },
    methods: {
      onResize: function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      },
      onDrag: function(x, y) {
        this.x = x;
        this.y = y;
      },
      dblclickhandle:function(event){
        console.log('x:' + event.offsetX + "  y:" +  event.offsetY)
        this.xzb=event.offsetX
        this.yzb=event.offsetY
      },
    },
    components:{
      VueDraggableResizable
    }
  };

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .svgbox{
    position: relative;
    z-index: 20;
  }
  .svgitem{
    position: relative;
    z-index: -1;
  }
  .icon{
    width: 1vw;
    height: 1vw;
    background-color: red;
    position:absolute
  }
  .helloword {
   /* overflow: hidden;*/
  }
  .text-event {
    float: left;
    height: 500px;
    width: 500px;
    border: 1px solid red;
    position: relative;
    　　background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;
  }
  .p-event {
    float: left;
    height: 300px;
    width: 300px;
    border: 1px solid blue;
    position: relative;
    margin-left: 20px;
  }

  .dragging1 {
    border: 1px solid #000;
    color: #000;
  }
</style>
