<template>
  <div class="dashboard-editor-container">
    <el-row>
      <el-col :span="24">
        <div class="chart-wrapper">
          <div style="margin-bottom:12px;" @click="handleMachine(item)">
            <strong> {{ areaName }}疫情 </strong> <span class="pie-chart-tip">最后更新: {{ sumaryData.last_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <el-row class="summary-total">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="confirm-num numbers">{{ sumaryData.total_confirm }}</div>
                <div class="confirm-text texts">累计确诊</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="suspect-num numbers">{{ sumaryData.total_suspect }}</div>
                <div class="suspect-text texts">累计疑似</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="heal-num numbers">{{ sumaryData.total_heal }}</div>
                <div class="heal-text texts">累计治愈</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <div class="dead-num numbers">{{ sumaryData.total_dead }}</div>
                <div class="dead-text texts">累计死亡</div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="pie-chart-tip">数据来源: 市卫健委</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  components: {
  },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    areaName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sumaryData: {
        last_time: 0,
        confirm: 0,
        suspect: 0,
        heal: 0,
        dead: 0
      }
    }
  },
  computed: {
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.setSumaryData()
      }
    }
  },
  created() {
    // this.setSumaryData()
  },
  methods: {
    setSumaryData() {
      this.sumaryData = {
        last_time: this.chartData.last_time,
        total_confirm: this.chartData.total_confirm,
        total_suspect: this.chartData.total_suspect,
        total_heal: this.chartData.total_heal,
        total_dead: this.chartData.total_dead
      }
      // console.log(this.sumaryData)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  margin-top: 10px;
  margin-bottom:10px;
  background-color: rgb(240, 242, 245);
  // position: relative;
  // border: 1px solid red;
  .chart-wrapper {
    background: #fff;
    padding: 10px 20px 10px 8px;
  }
	.pie-chart-tip{
		color: grey;
		font-size: 13px;
		float: right;
	}
}

@media (max-width:500px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.bg-purple-dark {
  background: rgb(158, 66, 66);
}
.bg-purple {
	color: grey;
  background:white;
}
.bg-purple-light {
  background:white;
}
.grid-content {
  border-radius: 8px;
  min-height: 86px;
  text-align: center;
  margin-left: 5px;
  font-weight: bold;
  // border: 1px solid red;
}
.numbers {
  min-height: 50px;
  line-height: 50px;
  font-size: 24px;
  border-top-left-radius: 8px;
}
.texts{
  font-size: 16px;
  color: black;
  min-height: 36px;
  line-height: 36px;
}
.confirm-num {
  color:rgb(243, 10, 10);
  background: #fdf1f1;
}
.confirm-text{
background: #ffe0e0;
}
.suspect-num {
  color:#FF961E;
  background: #FFF7ED;
}
.suspect-text{
  background: #ffeeed;
}
.heal-num {
  color:#178B50;
  background: #F1F8F4;
}
.heal-text{
  background: #dfeeee;
}
.dead-num {
  color:#66666e;
  background: #F8F8F8;
}
.dead-text{
  background: #eeeeee;
}
</style>
