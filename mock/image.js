import Mock from 'mockjs'
const List = []
// const count = 3

// for (let i = 0; i < count; i++) {
List.push(Mock.mock({
  src: '@image(730x336)',
  dst: '@image(730x336)',
  title: '@csentence(2, 5)',
  'bg_color|1': ['#171717', '#FEFEFE', '#074367']
}))
List.push(Mock.mock({
  src: '@image(730x337)',
  dst: '@image(730x337)',
  title: '@csentence(2, 5)',
  'bg_color|1': ['#171717', '#FEFEFE', '#074367']
}))
List.push(Mock.mock({
  src: '@image(730x338)',
  dst: '@image(730x338)',
  title: '@csentence(2, 5)',
  'bg_color|1': ['#171717', '#FEFEFE', '#074367']
}))
// }

export default [
  {
    url: '/image/index',
    type: 'get',
    response: config => {
      return {
        code: 2000,
        msg: null,
        data: {
          total: List.length,
          items: List
        }
      }
    }
  },
  {
    url: '/upload/image',
    type: 'post',
    response: config => {
      return {
        code: 2000,
        msg: null,
        data: {
          result: 'image.png'
        }
      }
    }
  }
]
