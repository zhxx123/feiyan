<template>
  <div class="chart" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '97%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      legendSpace: 0
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
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
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, confirmData, yAxisName, name } = {}) {
      this.legendSpace = parseInt(xAxisData.length / 7)
      this.chart.setOption({
        title: {
          text: yAxisName,
          x: 'left',
          textStyle: {
            color: '#000', // 标题颜色
            fontWeight: 'bold', // 粗体
            fontSize: 18 // 字体大小
          }
        },
        xAxis: {
          data: xAxisData,
          boundaryGap: false,
          nameLocation: 'start', // 坐标轴名称显示位置
          axisTick: {
            show: true
          },
          axisLabel: {
            interval: this.legendSpace, // 横轴信息全部显示
            formatter: function(params) {
              var newParamsName = ''// 最终拼接成的字符串
              var paramsNameNumber = params.length// 实际标签的个数
              var provideNumber = 10// 每行能显示的字的个数
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber)// 换行的话，需要显示几行，向上取整
              if (paramsNameNumber > provideNumber) {
                /** 循环每一行,p表示行 */
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = ''// 表示每一次截取的字符串
                  var start = p * provideNumber// 开始截取的位置
                  var end = start + provideNumber// 结束截取的位置
                  // 此处特殊处理最后一行的索引值
                  if (p === rowNumber - 1) {
                    // 最后一次不换行
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    // 每一次拼接字符串并换行
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr// 最终拼成的字符串
                }
              } else {
                // 将旧标签的值赋给新标签
                newParamsName = params
              }
              // 将最终的字符串返回
              return newParamsName
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 5]
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            // dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {}
          }
        },
        yAxis: {
          axisTick: {
            show: true
          },
          min: function(value) {
            if (value.min < 10) {
              return 0
            }
            return value.min - 10
          },
          max: function(value) {
            if (value.max < 10) {
              return value.max * 2
            }
            if (value.max > 10000) {
              return value.max + 1000
            }
            return value.max + 5
          }
        },
        legend: {
          data: name
        },
        series: [
          {
            name: name[0],
            smooth: true,
            type: 'line',
            label: {
              normal: {
                // show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: '#f55253',
                lineStyle: {
                  color: '#f55253',
                  width: 2
                },
                areaStyle: {
                  color: '#f5e0e0'
                }
              }
            },
            data: confirmData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  .chart {
    margin-top: 10px;
    margin-left:10px;
    padding-top: 10px;
    height:100px;
    /* border: 1px solid red; */
    background: white;
  }
</style>
