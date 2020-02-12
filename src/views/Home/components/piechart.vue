<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/utils/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '96%'
    },
    height: {
      type: String,
      default: '300px'
    },
    pieData: {
      type: Object,
      required: true

    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    pieData: {
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.pieData)
    },
    setOptions({ value, label, tips, yAxisName, colors } = {}) {
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
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}人 ({d}%)'
        },
        legend: {
          right: 30,
          // bottom: '10',
          data: label
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            name: tips,
            type: 'pie',
            // roseType: 'radius',
            radius: [1, 100],
            center: ['50%', '50%'],
            data: [
              { value: value[0], name: label[0] },
              { value: value[1], name: label[1] }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              normal: {
                color: function(params) {
                  // 自定义颜色
                  var colorList = colors
                  return colorList[params.dataIndex]
                }
              }
            }

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
