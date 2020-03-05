<template>
  <div class="block dashboard-editor-container">
    <el-timeline :reverse="reverse">
      <el-timeline-item
        v-for="(activity, index) in tableList"
        :key="index"
        :timestamp="activity.time"
        placement="top"
      >
        <el-card>
          <h4>{{ activity.content }}</h4>
          <p>分支: {{ activity.refer }} </p>
          <p>最新ID: {{ activity.after_id }} 打包状态: <el-tag :type="activity.status | statusTypeFilter">{{ activity.status| statusFilter }}</el-tag></p>
          <p>提交者: {{ activity.author_name }} 提交于: {{ activity.time_stamp }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getGitLogsInfo } from '@/api/person'
import { parseTime } from '@/utils'
export default {
  name: 'GitLogs',
  filters: {
    timeFilter(status) {
      if (status !== null && status > 100000000) {
        return parseTime(status)
      } else {
        return '暂无'
      }
    },
    statusFilter(status) {
      if (status) {
        return '成功'
      } else {
        return '失败'
      }
    },
    statusTypeFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      if (status) {
        return statusMap[0]
      }
      return statusMap[1]
    }
  },
  data() {
    return {
      tableList: [],
      reverse: false,
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
          // this.tableList = tmpListData.data
          this.setGitLogList(tmpListData.data)
        }
        this.listLoading = false
      })
    },
    setGitLogList(tmpListData) {
      tmpListData.forEach((item) => {
        const tmp = {
          'time': parseTime(item.time),
          'content': item.output,
          'after_id': item.after_id.substr(0, 8),
          'time_stamp': parseTime(item.time_stamp),
          'author_name': item.author_name,
          'status': item.status
        }
        this.tableList.push(tmp)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  // height: 200px;
  min-width: 340px;
  width: 90%;
  padding-top: 10px;
  // background:1px solid red;
  background: white;
  margin-top: 10px;
  margin-left: 10px;
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
</style>
