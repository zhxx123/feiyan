
<template>
  <div v-loading="listLoading" class="home-page">
    <Summary :chart-data="townRecord" :area-name="areaName" />
    <ConfirmLine :chart-data="lineChartData" />
    <ConfirmTotal :chart-data="totalLineChartData" />
    <ConfirmHeal :chart-data="healLineChartData" />
    <ConfirmCity :chart-data="townRecordLast" />
    <PieChart :pie-data="pipChartDeadData" />
    <PieChart :pie-data="pipChartHealData" />
  </div>
</template>
<script>
import Summary from './components/summary.vue'
import ConfirmLine from './components/confirmdaliy.vue'
import ConfirmTotal from './components/confirmtotal.vue'
import ConfirmHeal from './components/confirmheal.vue'
import ConfirmCity from './components/confirmcity.vue'
import PieChart from './components/piechart.vue'
import { getTownRecord, getTownList, getTownRecordLast } from '@/api/person'
export default {
  name: 'Henan',
  components: {
    Summary,
    ConfirmLine,
    ConfirmTotal,
    ConfirmHeal,
    ConfirmCity,
    PieChart
  },
  data() {
    return {
      listLoading: false,
      lineChartData: {
        xAxisData: [],
        confirmData: [],
        suspectData: [],
        deadData: [],
        healData: [],
        yAxisName: '每日新增人数',
        name: ['确诊', '疑似', '治愈', '死亡']
      },
      totalLineChartData: {
        xAxisData: [],
        confirmData: [],
        yAxisName: '累计确诊人数',
        name: ['累计确诊']
      },
      healLineChartData: {
        xAxisData: [],
        healData: [],
        deadData: [],
        yAxisName: '累计(治愈/死亡)人数',
        name: ['治愈', '死亡']
      },
      townRecord: {
        last_time: 0,
        confirm: 0,
        suspect: 0,
        heal: 0,
        dead: 0
      },
      townRecordLast: {
        xAxisData: [],
        cityName: [],
        yAxisName: '各地市累计确诊',
        ySubAxisName: '',
        name: ['确诊人数']
      },
      pipChartDeadData: {
        value: [],
        label: ['确诊', '死亡'],
        tips: '(确诊/死亡)比例',
        yAxisName: '累计(确诊/死亡)比例',
        colors: ['#f55253', '#66666e']
      },
      pipChartHealData: {
        value: [],
        label: ['确诊', '治愈'],
        tips: '(确诊/治愈)比例',
        yAxisName: '累计(确诊/治愈)比例',
        colors: ['#f55253', '#178B50']
      },
      listQuery: {
        name: '河南'
      },
      areaName: '河南'
    }
  },
  computed: {
  },
  created() {
    this.setPageTitle()
    this.getList()
    this.getLineList()
    this.getTownRecordLastLine()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTownRecord(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          this.townRecord = tmpListData.data[tmpListData.length - 1]
          // 更新累计确诊
          this.handlerSetTotalChart(tmpListData.data)

          // 更新 累计确诊/死亡比率
          this.handlerSerPipChart(this.townRecord)
        }
        // console.log(this.townRecord)
        this.listLoading = false
      })
    },
    getLineList() {
      getTownList(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          this.handlerSetChart(tmpListData.data)
        }
        // this.resetTemp()
      })
    },
    getTownRecordLastLine() {
      getTownRecordLast(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          // this.townRecordLast = tmpListData.data[tmpListData.length - 1]
          // 更新省内地市累计确诊
          this.handlerSetRecordLastChart(tmpListData.data)
        }
        // console.log(this.townRecord)
        this.listLoading = false
      })
    },
    setPageTitle() {
      const title = '新冠肺炎(COVID-19)数据'
      document.title = `${title} - ${this.areaName}`
    },
    handlerSetChart(tmpListData) {
    //   this.allChartData = Object({}, defaultChartData)
      tmpListData.forEach((item) => {
        this.lineChartData.xAxisData.push(item.date)
        this.lineChartData.confirmData.push(item.confirm)
        this.lineChartData.suspectData.push(item.suspect)
        this.lineChartData.deadData.push(item.dead)
        this.lineChartData.healData.push(item.heal)
      })
      // console.log(this.lineChartData)
    },
    handlerSetTotalChart(tmpListData) {
      tmpListData.forEach((item) => {
        this.totalLineChartData.xAxisData.push(item.date)
        this.totalLineChartData.confirmData.push(item.total_confirm)
        this.healLineChartData.xAxisData.push(item.date)
        this.healLineChartData.healData.push(item.total_heal)
        this.healLineChartData.deadData.push(item.total_dead)
      })
    },
    handlerSerPipChart(chinaTmp) {
      this.pipChartDeadData.value.push(chinaTmp.total_confirm)
      this.pipChartDeadData.value.push(chinaTmp.total_dead)

      this.pipChartHealData.value.push(chinaTmp.total_confirm)
      this.pipChartHealData.value.push(chinaTmp.total_heal)
    },
    handlerSetRecordLastChart(tmpListData) {
      tmpListData.forEach((item) => {
        this.townRecordLast.xAxisData.push(item.total_confirm)
        this.townRecordLast.cityName.push(item.name)
      })
      this.townRecordLast.ySubAxisName = `统计截止: 2020.${tmpListData[0].date} 24时`
    },
    handleFilter() {
      this.getList()
    },
    resetTemp() {
      this.listQuery = {
        area: null,
        status: null
      }
    }
  }
}
</script>
<style lang = "scss" scoped>
.home-page{
  margin: 0 auto;
  min-width: 350px;
  max-width: 800px;
  width: 100%;
  /* border: 1px solid red; */
}
</style>
