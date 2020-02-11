import request from '@/utils/request'

export function getPersonInfo(query) {
  return request({
    url: '/api/personinfo/ny',
    method: 'get',
    params: query
  })
}
export function getTownRecord(query) {
  return request({
    url: '/api/town/record',
    method: 'get',
    params: query
  })
}
export function getTownList(query) {
  return request({
    url: '/api/town/list',
    method: 'get',
    params: query
  })
}

export function getChinaDayTotal(query) {
  return request({
    url: '/api/country/record',
    method: 'get',
    params: query
  })
}
export function getChinaDayRecord(query) {
  return request({
    url: '/api/china/daily',
    method: 'get',
    params: query
  })
}
export function getChinaDayList(query) {
  return request({
    url: '/api/china/dayadd',
    method: 'get',
    params: query
  })
}

export function getAgeInfo(query) {
  return request({
    url: '/api/ageinfo/ny',
    method: 'get',
    params: query
  })
}

export function updateAgeInfo(data) {
  return request({
    url: '/api/ageinfo/update',
    method: 'post',
    data
  })
}
