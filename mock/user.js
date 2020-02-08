
const users = {
  access_token: 'abc',
  email: 'zhxx123@qq.com'
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
    //   const { email } = config.body
      //   console.log(config.body)
      //   const token = users[email]

      //   // mock error
      //   if (!token) {
      //     return {
      //       code: 2001,
      //       message: 'Account and password are incorrect.'
      //     }
      //   }

      return {
        code: 2000,
        data: users
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 2000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 2000,
        data: 'success'
      }
    }
  }
]
