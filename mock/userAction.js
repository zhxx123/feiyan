import Mock from 'mockjs'

const count = 20
// user list
const List = []

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    trade_no: '@string',
    create_at: '@integer(1000000000,1600000000)',
    coin_type: '@integer(0, 1)',
    amount: '@integer(-10,100)',
    total_amount: '@integer(0,100)',
    'option|1': ['新购', '续费', '收入']
  }))
}

// user asset list
const assetList = []
const address = ['MQbZKpL53knrkJD13GgYf7hazwfqqGHGDk', 'MQbZKpL53knrkJD13GgYf7hazwfqqGHGDk', '0xeb0b828512fc7b8a01a9cb24832fa530da5ea92b']
for (let i = 0; i < 3; i++) {
  assetList.push(Mock.mock({
    coin_type: i,
    coin_addr: address[i],
    coin_amount: '@integer(20, 100)',
    ava_amount: '@integer(20, 100)',
    frozen_amount: '@integer(20, 100)'
  }))
}

// user message
const messageList = []

for (let i = 0; i < 12; i++) {
  messageList.push(Mock.mock({
    article_id: '@integer(0,50)',
    category: '@integer(0, 2)',
    author_id: '@integer(10, 100)',
    read: '@integer(0,1)',
    language: '@integer(0,1)',
    'title|1': ['消费成功', '充值成功', '奖励到帐'],
    content: '@csentence',
    announcer: 'MassGrid',
    published_at: '@integer(1000000000,1600000000)'
  }))
}

export default [
  {
    url: '/user/assetFlow',
    type: 'get',
    response: config => {
      const { time_st, time_ed, coin_type, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (coin_type && item.coin_type !== +coin_type) return false
        if (time_st && new Date(item.create_at * 1000) < new Date(time_st)) return false
        if (time_ed && new Date(item.create_at * 1000) > new Date(time_ed)) return false
        return true
      })
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 2000,
        msg: null,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/user/asset',
    type: 'get',
    response: config => {
      const { coin_type } = config.query
      const mockList = assetList.filter(item => {
        if (coin_type && item.coin_type !== +coin_type) return false
        return true
      })

      return {
        code: 2000,
        msg: null,
        data: {
          items: mockList
        }
      }
    }
  },
  {
    url: '/user/message/list',
    type: 'get',
    response: config => {
      const { page = 1, limit = 20, sort } = config.query
      let mockList = messageList
      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 2000,
        msg: null,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },
  {
    url: '/user/message/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of messageList) {
        if (article.article_id === +id) {
          return {
            code: 2000,
            msg: null,
            data: article
          }
        }
      }
      return {
        code: 2001,
        msg: 'No this message',
        data: null
      }
    }
  },
  {
    url: '/user/pay/id',
    type: 'post',
    response: config => {
      const mockData = Mock.mock({
        out_trade_no: '@string(10,20)'
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

