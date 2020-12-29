<template>
  <div style="background-color: #111C45">
    <div class="col2" id="map"></div>
    <div id="echGall" style="height: 22vh; width: 60vw;"></div>
    <div @click="tab1()">变数据1</div>
    <div @click="tab2()">变数据2</div>
  </div>
</template>

<script>
  import jsJson from '@/assets/json/jiangsu.json';
/*  import 'echarts/map/js/province/jiangsu'*/
  import echarts from 'echarts';

  export default {
    name: "home",
    data() {
      return{
        echGall:null,
        echGalldata:[
          {
            'name':'研究分类一',
            'value':'555',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类二',
            'value':'444',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类三',
            'value':'333',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类四',
            'value':'222',
            'maxvalue':'1000'
          },
          {
            'name':'其他',
            'value':'111',
            'maxvalue':'1000'
          },
        ]
      }
    },
    mounted() {
      /*this.JsMap();*/
      this.GallLoad();

    },
    methods: {
     /* JsMap() {
        this.$echarts.registerMap('jiangsu', jsJson)
        var myChart = echarts.init(document.getElementById('map'));
        var option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}  (访问量)'
          },
          series: [
            {
              type: 'map',
              mapType: 'jiangsu',
              top: 0,
              bottom: 0,
              itemStyle: {
                borderColor: '#3B5077'
              },
              emphasis: {
                label: {
                  show: true
                },
                itemstyle: {
                  color: 'yellow',
                  areaColor: '#ffffff'
                }
              },
              data: [
                {
                  name: '南京市',
                  value: 4300,
                  itemStyle: {
                    areaColor: '#2aacc7',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '无锡市',
                  value: 400,
                  itemStyle: {
                    areaColor: '#34dadd',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '常州市',
                  value: 50,
                  itemStyle: {
                    areaColor: '#32d1d8',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '苏州市',
                  value: 635,
                  itemStyle: {
                    areaColor: '#36dedd',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '南通市',
                  value: 875,
                  itemStyle: {
                    areaColor: '#30c6d3',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '连云港市',
                  value: 978,
                  itemStyle: {
                    areaColor: '#1963a6',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '淮安市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#1f777ae',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '盐城市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#2284b5',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '扬州市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#289fc1',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '镇江市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#2cb9ce',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '泰州市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#2491bb',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '宿迁市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#1c6fac',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                },
                {
                  name: '徐州市',
                  value: 1358,
                  itemStyle: {
                    areaColor: '#195ba2',
                    borderColor: '#38519d'
                  },
                  label: {
                    show: true,
                    fontSize: 16,
                    fontweight: 700,
                    color: '#fff'
                  }
                }
              ]
            }

          ]
        };
        myChart.clear();
        myChart.setOption(option);
        myChart.on('click', function (e) {
        });
        //监听窗口发生变化，resize组件
        window.addEventListener('resize',function () {
          myChart.resize();
        });
        this.$once('hook:beforeDestroy',function () {
          window.removeEventListener('resize',function () {
            myChart.resize();
          });
        })
      },*/
      GallLoad() {
        var that=this
        var data=this.echGalldata;
        var echarts = require('echarts');
        that.echGall = echarts.init(document.getElementById('echGall'));
        console.log(data)
        var option = {
          grid: [
            {
              //左侧的柱状图grid
              left: '1%',
              top: '10px',
              right: '0',
              bottom: '0'
            }
          ],
          xAxis: [
            {
              //左侧柱状图的X轴
              gridIndex: 0,//x 轴所在的 grid 的索引
              show: false
            },
          ],
          yAxis: [
            {
              //左侧柱状图的Y轴
              gridIndex: 0,//y轴所在的 grid 的索引
              splitLine: 'none',
              axisTick: 'none',
              axisLine: 'none',
              axisLabel: {
                verticalAlign: 'bottom',
                align: 'left',
                padding: [0, 0, 5, 15],
                textStyle: {
                  color: '#befbff',
                  fontSize: '12',
                }
              },
              data: [/*'研究分类一', '研究分类二', '研究分类三', '研究分类四', '其他'*/],
              inverse: true,
            },
            {
              //左侧柱状图的Y轴
              gridIndex: 0,//y轴所在的 grid 的索引
              splitLine: 'none',
              axisTick: 'none',
              axisLine: 'none',
              data: [/*555, 444, 333, 222, 111*/],
              inverse: true,
              axisLabel: {
                show: true,
                verticalAlign: 'bottom',
                align: 'right',
                padding: [0, 20, 5, 0],
                textStyle: {
                  color: '#fff',
                  fontSize: '12',
                },
                formatter: function (value) {
                  return '{x|' + value + '} '
                },
                rich: {
                  y: {
                    color: '#befbff',
                    fontSize: 14
                  },
                  x: {
                    color: '#f6cf42',
                    fontSize: 14
                  }
                }
              }
            },
            {
              //左侧柱状图的Y轴
              gridIndex: 0,//y轴所在的 grid 的索引
              splitLine: 'none',
              axisTick: 'none',
              axisLine: 'none',
              data: []
            },
          ],
          series: [
            {
              name: '值',
              type: 'bar',
              xAxisIndex: 0,//使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 0,//使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              data: [/*555, 444, 333, 222, 111*/],
              barWidth: 6,
              itemStyle: {
                color: function (params) {
                  var colorList = [ '#ff6f20', '#f6fe20','#20fe3f', '#20fe88', '#3aff97', '#00ffc0', '#3aff97', '#00f0ff', '#00f0ff'];
                  return colorList[params.dataIndex]
                },
                barBorderRadius: 6,
              },
              z: 2
            },
            {
              name: '外框',
              type: 'bar',
              xAxisIndex: 0,//使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用。
              yAxisIndex: 2,//使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用。
              barGap: '-100%',
              data: [/*1000, 1000, 1000, 1000, 1000*/],
              barWidth: 7,
              itemStyle: {
                normal: {
                  color: '#2d5271',
                  barBorderRadius: 6,
                }
              },
              z: 0
            },

          ]
        };
        for (var i = 0; i < data.length && i < 4; i++) {
          option.yAxis[0].data.push(data[i].name);
          option.yAxis[1].data.push(data[i].value);
          option.series[0].data.push(data[i].value);
          option.series[1].data.push(data[i].maxvalue);
        }
        that.echGall.setOption(option);
        if (window.GallInterval) {
          clearInterval(window.GallInterval);
        }
        window.GallIndex = option.yAxis[0].data.length;
        window.GallInterval = setInterval(function () {
          option.yAxis[0].data.shift();
          option.yAxis[0].data.push(data[window.GallIndex % data.length].name);
          option.yAxis[1].data.shift();
          option.yAxis[1].data.push(data[window.GallIndex % data.length].value);
          option.series[0].data.shift();
          option.series[0].data.push(data[window.GallIndex % data.length].value);
          option.series[1].data.shift();
          option.series[1].data.push(data[window.GallIndex % data.length].maxvalue);
          that.echGall.setOption(option);
          window.GallIndex++;
        }, 3000);

        //监听窗口发生变化，resize组件
        window.addEventListener('resize',function () {
          that.echGall.resize();
        });
        this.$once('hook:beforeDestroy',function () {
          window.removeEventListener('resize',function () {
            that.echGall.resize();
          });
        });
      },

      tab1(){
        this.echGalldata=[
          {
            'name':'研究分类一',
            'value':'555',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类二',
            'value':'444',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类三',
            'value':'333',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类四',
            'value':'222',
            'maxvalue':'1000'
          },
          {
            'name':'其他',
            'value':'111',
            'maxvalue':'1000'
          },
        ],
                this.GallLoad();
      },
      tab2(){
        console.log(2)
        this.echGalldata=[
          {
            'name':'研究分类二',
            'value':'444',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类三',
            'value':'333',
            'maxvalue':'1000'
          },
          {
            'name':'研究分类四',
            'value':'222',
            'maxvalue':'1000'
          },
          {
            'name':'其他',
            'value':'111',
            'maxvalue':'1000'
          },
        ],
                this.GallLoad();
      }

    },

    watch:{
      echGalldata:{
        handler(newval,oldval){
          if(newval){

          }else{

          }
        },
        deep:true
      }
    },
  }
</script>

<style scoped>
  .col2 {
    width: 60vw;
    height: 22vh;
  }
</style>
