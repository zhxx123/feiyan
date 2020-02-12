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
      default: '450px'
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
        this.legendTop = 38
      }
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions({ xAxisData, cityName, yAxisName, ySubAxisName, name } = {}) {
      this.legendSpace = parseInt(xAxisData.length / 7)
      this.chart.setOption({
        title: {
          text: yAxisName,
          subtext: ySubAxisName,
          x: 'left',
          textStyle: {
            color: '#000', // 标题颜色
            fontWeight: 'bold', // 粗体
            fontSize: 18 // 字体大小
          }
        },
        xAxis: {
          // data: xAxisData,
          // boundaryGap: false,
          nameLocation: 'start', // 坐标轴名称显示位置
          axisTick: {
            show: true
          },
          type: 'value',
          boundaryGap: [0, 0.01]
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
            type: 'shadow'
          },
          padding: [5, 10]
        },
        yAxis: {
          type: 'category',
          data: cityName,
          axisTick: {
            show: true
          }
        },
        legend: {
          show: true,
          right: this.legendTop,
          top: 5,
          data: name
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: name[0],
            smooth: true,
            type: 'bar',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'right'
                },
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
            data: xAxisData,
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
    margin-top: 10px;
    height:100px;
    padding-top: 10px;
    /* border: 1px solid red; */
    background: white;
  }
</style>
