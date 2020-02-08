import Mock from 'mockjs'

const List = []
const count = 20

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    author_id: '@integer(1, 100)',
    goods_id: '@integer(100,10000)',
    name: '@string',
    org_price: '@integer(100000, 3000000)',
    cur_price: '@integer(100000, 3000000)',
    quantity: '@integer(0, 10)',
    description: 'GPU Miner',
    img_uri: '@string',
    status: '@integer(0, 1)'
  }))
}

export default [
  {
    url: '/product/list',
    type: 'get',
    response: config => {
      const { name, page = 1, limit = 20, sort } = config.query
      let mockList = List.filter(item => {
        if (name && item.name.indexOf(name) < 0) return false
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
    url: '/product/add',
    type: 'post',
    response: _ => {
      return {
        code: 2000,
        data: 'success'
      }
    }
  },

  {
    url: '/product/update',
    type: 'post',
    response: _ => {
      return {
        code: 2000,
        data: 'success'
      }
    }
  }
]

