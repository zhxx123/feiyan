<template>
  <div class="chart" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
// import tanghe from '@/static/tanghe.json'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '96%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
    // chartData: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      chart: null,
      legendSpace: 0,
      legendTop: 0,
      data: []
    }
  },
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(val) {
  //       this.setOptions(val)
  //     }
  //   }
  // },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      if (document.body.clientWidth < 600) {
        this.legendSpace = 1
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.getAreaMapInfoList() // 绘制地图
      this.setOptions() // 显示设置
    },
    getAreaMapInfoList() {
      this.$http.get('./static/tanghe.json').then(res => {
        this.chart.registerMap('tanghe', res.body)
        res.body.features.forEach(item => {
          this.data.push({
            name: item.properties.name
          })
        })
      })
    },

    setOptions() {
      this.chart.setOption({
        geo: {
          map: 'tanghe', // 地图类型为中国地图,要是世界那就是world,要是省市区：例如beijing、shanghai
          itemStyle: { // 定义样式
            normal: { // 普通状态下的样式
              areaColor: '#6699CC',
              borderColor: '#fff'
            },
            emphasis: { // 高亮状态下的样式
              areaColor: '#e9fbf1'
            }
          }

        },
        title: {
          text: 'yAxisName',
          x: 'left',
          textStyle: {
            color: '#000', // 标题颜色
            fontWeight: 'bold', // 粗体
            fontSize: 18 // 字体大小
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        series: [
          {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', // 关系图节点标记的图形
            symbolSize: [30, 30],
            symbolOffset: [0, '-40%'], // 关系图节点标记相对于原本位置的偏移。[0, '50%']
            large: true,
            // label: {
            //   normal: {
            //     show: true,
            //     textStyle: {
            //       color: '#fff',
            //       fontSize: 9
            //     }
            //   }
            // },
            itemStyle: {// ===============图形样式，有 normal 和 emphasis 两个状态。normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
              normal: { // 默认样式
                label: {
                  show: true
                },
                borderType: 'solid', // 图形描边类型，默认为实线，支持 'solid'（实线）, 'dashed'(虚线), 'dotted'（点线）。
                borderColor: 'rgba(255,215,0,0.4)', // 设置图形边框为淡金色,透明度为0.4
                borderWidth: 2, // 图形的描边线宽。为 0 时无描边。
                opacity: 1
                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5

              },
              emphasis: {// 高亮状态

              }
            },
            lineStyle: { // ==========关系边的公用线条样式。
              normal: {
                color: 'rgba(255,0,255,0.4)',
                width: '3',
                type: 'dotted', // 线的类型 'solid'（实线）'dashed'（虚线）'dotted'（点线）
                curveness: 0.3, // 线条的曲线程度，从0到1
                opacity: 1
                // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。默认0.5
              },
              emphasis: {// 高亮状态

              }
            },
            label: { // =============图形上的文本标签
              normal: {
                show: true, // 是否显示标签。
                position: 'inside', // 标签的位置。['50%', '50%'] [x,y]
                textStyle: { // 标签的字体样式
                  color: '#cde6c7', // 字体颜色
                  fontStyle: 'normal', // 文字字体的风格 'normal'标准 'italic'斜体 'oblique' 倾斜
                  fontWeight: 'bolder', // 'normal'标准'bold'粗的'bolder'更粗的'lighter'更细的或100 | 200 | 300 | 400...
                  fontFamily: 'sans-serif', // 文字的字体系列
                  fontSize: 12 // 字体大小
                }
              },
              emphasis: {// 高亮状态

              }
            },
            edgeLabel: {// ==============线条的边缘标签
              normal: {
                show: false
              },
              emphasis: {// 高亮状态

              }
            },

            zlevel: 12,
            data: this.data
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  .chart {
    margin-left:10px;
    height:100px;
    padding-top: 10px;
    /* border: 1px solid red; */
    background: white;
  }
</style>
