
<template>
  <div v-loading="listLoading" class="home-page">
    <Summary :chart-data="townRecord" :area-name="areaName" />
    <ConfirmLine :chart-data="lineChartData" />
    <ConfirmTotal :chart-data="totalLineChartData" />
    <ConfirmHeal :chart-data="healLineChartData" />
    <PieChart :pie-data="pipChartDeadData" />
    <PieChart :pie-data="pipChartHealData" />
    <!-- <PersonTable :area-name="areaName" /> -->
  </div>
</template>
<script>
import Summary from './components/summary.vue'
import ConfirmLine from './components/confirmdaliy.vue'
import ConfirmTotal from './components/confirmtotal.vue'
import ConfirmHeal from './components/confirmheal.vue'
import PieChart from './components/piechart.vue'
import { getChinaDayTotal, getChinaDayRecord, getChinaDayList } from '@/api/person'
export default {
  name: 'NanYang',
  components: {
    Summary,
    ConfirmLine,
    ConfirmTotal,
    ConfirmHeal,
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
        total_confirm: 0,
        total_suspect: 0,
        total_heal: 0,
        total_dead: 0
      },
      pipChartDeadData: {
        value: [],
        label: ['确诊', '死亡'],
        tips: '(确诊/死亡)比例',
        yAxisName: '累计(确诊/死亡)',
        colors: ['#f55253', '#66666e']
      },
      pipChartHealData: {
        value: [],
        label: ['确诊', '治愈'],
        tips: '(确诊/治愈)比例',
        yAxisName: '累计(确诊/治愈)',
        colors: ['#f55253', '#178B50']
      },
      listQuery: {
        page: 1,
        limit: 100
      },
      listQueryTotal: {
        name: '中国'
      },
      areaName: '中国'
    }
  },
  computed: {
  },
  created() {
    this.setPageTitle()
    this.getList()
    this.getLineList()
    this.getChinaLineList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getChinaDayTotal(this.listQueryTotal).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          this.townRecord = tmpListData.data[0]
          // 更新 累计确诊/死亡比率
          this.handlerSerPipChart(this.townRecord)
          // 更新累计确诊
          // this.handlerSetTotalChart(tmpListData.data)
        }
        // console.log(this.townRecord)
        this.listLoading = false
      })
    },
    getChinaLineList() {
      getChinaDayRecord(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          // 更新累计确诊
          this.handlerSetTotalChart(tmpListData.data)
        }
        // console.log(this.townRecord)
        this.listLoading = false
      })
    },
    getLineList() {
      getChinaDayList(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          this.handlerSetChart(tmpListData.data)
        }
        // this.resetTemp()
      })
    },
    setPageTitle() {
      const title = '新冠肺炎(NCP)数据'
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
        this.totalLineChartData.confirmData.push(item.confirm)
        this.healLineChartData.xAxisData.push(item.date)
        this.healLineChartData.healData.push(item.heal)
        this.healLineChartData.deadData.push(item.dead)
      })
    },
    handlerSerPipChart(chinaTmp) {
      this.pipChartDeadData.value.push(chinaTmp.total_confirm)
      this.pipChartDeadData.value.push(chinaTmp.total_dead)

      this.pipChartHealData.value.push(chinaTmp.total_confirm)
      this.pipChartHealData.value.push(chinaTmp.total_heal)
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
