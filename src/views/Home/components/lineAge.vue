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
      default: '96%'
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
    },
    dataLength: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      legendSpace: 0,
      legendTop: 0
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
        this.legendTop = 30
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, maxAge, minAge, yAxisName, name } = {}) {
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
          type: 'category',
          boundaryGap: true,
          nameLocation: 'start', // 坐标轴名称显示位置
          axisTick: {
            show: true
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
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
            return value.max + 5
          }
        },
        legend: {
          show: true,
          top: this.legendTop,
          data: name
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            magicType: { type: ['line', 'bar'] },
            restore: {}
          }
        },
        series: [
          {
            name: name[0],
            smooth: true,
            type: 'bar',
            label: {
              normal: {
                show: true,
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
                  color: '#f5d0e0'
                }
              }
            },
            data: minAge,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: name[1],
            smooth: true,
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: '#FF961E',
                lineStyle: {
                  color: '#FF961E',
                  width: 2
                },
                areaStyle: {
                  color: '#FFE4B5'
                }
              }
            },
            data: maxAge,
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
    margin-left:10px;
    height:100px;
    padding-top: 10px;
    /* border: 1px solid red; */
    background: white;
  }
</style>
