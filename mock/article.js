import Mock from 'mockjs'

const count = 21

const NoticeList = []

for (let i = 0; i < count; i++) {
  NoticeList.push(Mock.mock({
    id: '@increment',
    article_id: '@integer(0, 50)',
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

const HelpList = []

for (let i = 0; i < count; i++) {
  HelpList.push(Mock.mock({
    id: '@increment',
    article_id: '@integer(0, 50)',
    category: '@integer(0, 2)',
    author_id: '@integer(10, 100)',
    read: '@integer(0,1)',
    language: '@integer(0,1)',
    title: '@title',
    content: '@csentence',
    announcer: 'MassGrid',
    published_at: '@integer(1000000000,1600000000)'
  }))
}

export default [
  {
    url: '/article/notice/list',
    type: 'get',
    response: config => {
      const { title, language, page = 1, limit = 20, sort } = config.query

      let mockList = NoticeList.filter(item => {
        if (language && item.language !== +language) return false
        if (title && item.title.indexOf(title) < 0) return false
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
    url: '/article/help/list',
    type: 'get',
    response: config => {
      const { category, language, page = 1, limit = 20, sort } = config.query

      let mockList = HelpList.filter(item => {
        if (category && item.category !== +category) return false
        if (language && item.language !== +language) return false
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
    url: '/article/help/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of HelpList) {
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
        msg: 'No this articel',
        data: null
      }
    }
  },
  {
    url: '/article/notice/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of NoticeList) {
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
        msg: 'No this articel',
        data: null
      }
    }
  },
  {
    url: '/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 2000,
        msg: null,
        data: 'success'
      }
    }
  },
  {
    url: '/workorder/add',
    type: 'post',
    response: config => {
    //   const token = config.body
      return {
        code: 2000,
        msg: null,
        data: 'success'
      }
    }
  }
]

