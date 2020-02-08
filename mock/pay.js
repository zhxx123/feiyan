import Mock from 'mockjs'

export default [
  {
    url: '/pay/precreate',
    type: 'post',
    response: config => {
      const mockData = Mock.mock({
        'order_status|1': [1001, 1002, 1003, 1004, 1005],
        qr_code: '@string(10,20)'
      })
      return {
        code: 2000,
        msg: null,
        data: {
          data: mockData
        }
      }
    }
  }
]
