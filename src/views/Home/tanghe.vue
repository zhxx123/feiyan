
<template>
  <div v-loading="listLoading" class="home-page">
    <Summary :chart-data="townRecord" :area-name="areaName" />
    <ConfirmLine :chart-data="lineChartData" />
    <ConfirmTotal :chart-data="totalLineChartData" />
    <ConfirmHeal :chart-data="healLineChartData" />
    <PieChart :pie-data="pipChartDeadData" />
    <PieChart :pie-data="pipChartHealData" />
    <LineAgeChart :chart-data="lineAgeChartData" />
    <TangheMap />
    <PersonTable :area-name="areaName" />
    <div class="update-info">
      <span style="color:white;" @click="updateAge">更新</span>
    </div>
  </div>
</template>
<script>
import Summary from './components/summary.vue'
import ConfirmLine from './components/confirmdaliy.vue'
import ConfirmTotal from './components/confirmtotal.vue'
import ConfirmHeal from './components/confirmheal.vue'
import PieChart from './components/piechart.vue'
import LineAgeChart from './components/lineAge.vue'
import TangheMap from './components/thMap.vue'
import PersonTable from './components/person.vue'
import { getTownRecord, getTownList, getAgeInfo, updateAgeInfo } from '@/api/person'
export default {
  name: 'TangHe',
  components: {
    Summary,
    ConfirmLine,
    ConfirmTotal,
    ConfirmHeal,
    PieChart,
    LineAgeChart,
    TangheMap,
    PersonTable
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
      lineAgeChartData: {
        xAxisData: ['确诊', '疑似', '治愈', '死亡'],
        minAge: [],
        maxAge: [],
        yAxisName: '最小/最大年龄',
        name: ['最小年龄', '最大年龄']
      },
      townRecord: {
        last_time: 0,
        confirm: 0,
        suspect: 0,
        heal: 0,
        dead: 0
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
        name: '唐河'
      },
      areaName: '唐河'
    }
  },
  computed: {
  },
  created() {
    this.setPageTitle()
    this.getList()
    this.getLineList()
    this.getAgeList()
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
    getAgeList() {
      const tmpQuery = {
        'area': this.listQuery.name
      }
      getAgeInfo(tmpQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData !== null) {
          this.handlerSetAgeChart(tmpListData)
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
        this.totalLineChartData.confirmData.push(item.total_confirm)
        this.healLineChartData.xAxisData.push(item.date)
        this.healLineChartData.healData.push(item.total_heal)
        this.healLineChartData.deadData.push(item.total_dead)
      })
      // console.log(this.healLineChartData)
    },
    handlerSerPipChart(chinaTmp) {
      this.pipChartDeadData.value.push(chinaTmp.total_confirm)
      this.pipChartDeadData.value.push(chinaTmp.total_dead)

      this.pipChartHealData.value.push(chinaTmp.total_confirm)
      this.pipChartHealData.value.push(chinaTmp.total_heal)
    },
    handlerSetAgeChart(tmpAgeData) {
      this.lineAgeChartData.maxAge = tmpAgeData.max
      this.lineAgeChartData.minAge = tmpAgeData.min
    },
    handleFilter() {
      this.getList()
    },
    updateAge() {
      const tmpQuery = {
        'area': this.listQuery.name
      }
      updateAgeInfo(tmpQuery).then(response => {
        console.log('update', response.msg)
      })
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
.update-info{
  background: white;
  width: 100%;
}
</style>
