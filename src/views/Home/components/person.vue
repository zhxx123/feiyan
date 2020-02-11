<template>
  <div class="dashboard-editor-container">
    <div class="board-title">患者信息表</div>
    <div class="filter-container">
      <el-select v-if="areaName !== '唐河'" v-model="listQuery.area" placeholder="请选择区域" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in AreaOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="请选择状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button> -->
      <!-- <div class="filter-right">最后更新: {{ lastUpTime }}</div> -->
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableList"
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="性别:">
              <span>{{ props.row.sex }}</span>
            </el-form-item>
            <el-form-item label="地区:">
              <span>{{ props.row.area }}</span>
            </el-form-item>
            <el-form-item label="发病日期:">
              <span>{{ props.row.start_at }}</span>
            </el-form-item>
            <el-form-item label="最后更新:">
              <span>{{ props.row.end_at | timeFilter }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="80">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="性别" width="50">
        <template slot-scope="{row}">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="年龄" width="50">
        <template slot-scope="{row}">
          <span>{{ row.age }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="地区" width="80">
        <template slot-scope="{row}">
          <span>{{ row.area }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="常住地区">
        <template slot-scope="{row}">
          <span>{{ row.place }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="发病日期" width="100">
        <template slot-scope="{row}">
          <span>{{ row.start_at }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="确诊日期" width="80">
        <template slot-scope="{row}">
          <span>{{ row.confirm_at }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就诊地" width="80">
        <template slot-scope="{row}">
          <span>{{ row.hospital }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" width="100">
        <template slot-scope="{row}">
          <el-tag :type="stateTagType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="最后更新" width="100">
        <template slot-scope="{row}">
          <span>{{ row.end_at | timeFilter }}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { getPersonInfo } from '@/api/person'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
const AreaOptions = ['南阳市区', '唐河', '南召', '方城', '西峡', '内乡', '镇平', '淅川', '社旗', '桐柏', '新野', '邓州']
const statusOptions = ['隔离治疗', '已治愈', '已死亡']
export default {
  name: 'Person',
  components: {
    Pagination
  },
  directives: { waves },
  filters: {
    timeFilter(status) {
      if (status !== null && status > 100000000) {
        return parseTime(status)
      } else {
        return '暂无'
      }
    }
  },
  props: {
    areaName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableList: null,
      listQuery: {
        area: null,
        status: null,
        page: 1,
        limit: 10
      },
      AreaOptions,
      statusOptions,
      total: 0,
      listLoading: false,
      lastUpTime: 0
    }
  },
  computed: {
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.areaName !== null && this.areaName !== '' && this.areaName === '唐河') {
        this.listQuery.area = this.areaName
      }
      getPersonInfo(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          this.tableList = tmpListData.data
          this.total = tmpListData.length
          this.setUpLastTime(this.tableList[0])
        } else {
          this.tableList = null
          this.total = 0
        }
        this.listLoading = false
        // this.resetTemp()
      })
    },
    handleFilter() {
      this.getList()
    },
    resetTemp() {
      this.listQuery = {
        area: null,
        status: null
      }
    },
    setUpLastTime(data) {
      const newTime = data.UpdatedAt.replace(/T/g, ' ').replace('+08:00', '')
      this.lastUpTime = newTime
    },
    stateTagType(status) {
      if (status === '隔离治疗') {
        return 'warning'
      } else if (status === '已治愈') {
        return 'success'
      } else if (status === '已死亡') {
        return 'info'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  // height: 200px;
  min-width: 340px;
  width: 100%;
  padding-top: 10px;
  // background:1px solid red;
  background: white;
  margin-top: 10px;
  // position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
  }
	.pie-chart-tip{
		color: grey;
		font-size: 13px;
		float: right;
	}
}

@media (max-width:360px) {
  .chart-wrapper {
    padding: 2px;
  }
}
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
.board-title{
  font-size: 18px;
  font-weight: bold;
  padding-bottom:10px;
}
.filter-item{
  width: 90px;
}
.filter-container{
  background:#eeeeee;
}
.filter-right{
  float:right;
  color: grey;
}
.summary-total{
  padding: 10px;
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
