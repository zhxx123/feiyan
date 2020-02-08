// import { logout, cd  } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { getUserName, getUserEmail, setUserEmail, setUserName, removeUserName, removeUserEmail } from '../../common/user'

const state = {
  usertoken: getToken(),
  username: getUserName(),
  useremail: getUserEmail()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.usertoken = token
  },
  SET_USERNAME: (state, name) => {
    state.username = name
  },
  SET_USEREMAIL: (state, email) => {
    state.useremail = email
  }
}

const actions = {
  userLogin({ commit }, token) {
    commit('SET_TOKEN', token)
    setToken(token)
  },
  userLoginOut({ commit }) {
    commit('Logout')
    removeUserName()
    removeUserEmail()
    removeToken()
  },
  setUserInfo({ commit }, data) {
    commit('SET_USERNAME', data.username)
    commit('SET_USEREMAIL', data.useremail)
    setUserName(data.username)
    setUserEmail(data.useremail)
  },
  // userEmail
  setUserEmail({ commit }, useremail) {
    commit('SET_USEREMAIL', useremail)
    setUserEmail(useremail)
  },
  // userName
  setUserName({ commit }, username) {
    commit('SET_USERNAME', username)
    setUserName(username)
  }
  // user logout
  // logout({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     logout().then(() => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       commit('SET_USERNAME', '')
  //       removeUserName()
  //       commit('SET_USEREMAIL', '')
  //       removeUserEmail()

  //       resolve()
  //     }).catch(error => {
  //       console.log('logout：', error)
  //       reject(error)
  //     })
  //   })
  // },
  // get user info
  // getInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo().then(response => {
  //       const tmpData = response.data
  //       if (!tmpData) {
  //         reject('获取失败，请重新登录')
  //       }
  //       // console.log(tmpData.user_id, tmpData.email)
  //       commit('SET_USERNAME', tmpData.user_id)
  //       commit('SET_USEREMAIL', tmpData.email)
  //       setUserName(tmpData.user_id)
  //       setUserEmail(tmpData.email)
  //       resolve(response.status)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_USERNAME', '')
  //     removeUserName()
  //     commit('SET_USEREMAIL', '')
  //     removeUserEmail()
  //     removeToken()
  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
