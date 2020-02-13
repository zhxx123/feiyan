<template>
  <div class="dashboard-editor-container">
    <div class="board-title">git 日志</div>
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
            <el-form-item label="类型:">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="分支">
              <span>{{ props.row.refer }}</span>
            </el-form-item>
            <el-form-item label="是否强制更新">
              <span>{{ props.row.forced }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="序号" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.ID }}</span>
        </template>
      </el-table-column>
      <el-table-column label="作者名">
        <template slot-scope="{row}">
          <span>{{ row.author_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱">
        <template slot-scope="{row}">
          <span>{{ row.author_email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最新ID" width="80">
        <template slot-scope="{row}">
          <span>{{ row.after_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="100">
        <template slot-scope="{row}">
          <span>{{ row.time | timeFilter }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { getGitLogsInfo } from '@/api/person'
import { parseTime } from '@/utils'
export default {
  name: 'Person',

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
        page: 1,
        limit: 5
      },
      listLoading: false
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
      getGitLogsInfo(this.listQuery).then(response => {
        const tmpListData = response.data
        if (tmpListData.length > 0) {
          this.tableList = tmpListData.data
          // this.total = tmpListData.length
        }
        this.listLoading = false
      })
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
