import { RowsData } from '@/types/common'
import { IOtherUser, IOwnUser, IUpdateUserInfo, IUserInfo } from '@/types/user'
import {
  changeInfo_put, fans_get,
  focusUsers_get,
  focusUser_delete, focusUser_post, recommendUser_get, searchUser_get, userInfo_get, userPhoneSms_post,
  userPhoneUpdate_post, userPhoneVerify_post
} from '../../config/urls'
import { request } from '../request'


// 获取用户信息
export const getUserInfo = (type: number, label: string) =>
  request<IOwnUser | string>({
    url: userInfo_get,
    method: 'GET',
    params: { type, label },
  })

// 修改用户账户信息
export const changeAccountInfo = (params: IUpdateUserInfo) =>
  request({ url: changeInfo_put, method: 'PUT', data: params })

// 关注用户
export const focusUser = (userId: string) =>
  request({
    url: focusUser_post,
    data: { userId },
  })
// 取消关注用户
export const cancelFocusUser = (userId: string) =>
  request({ method: 'DELETE', url: `${focusUser_delete}/${userId}` })

// 获取粉丝列表
export const getFansList = (page: number, size: number) =>
  request({
    method: 'get',
    url: fans_get,
    params: {
      page,
      size,
    },
  })

// 获取关注用户列表
export const getFocusUsers = (page: number, size: number) =>
  request({
    method: 'GET',
    url: focusUsers_get,
    params: {
      page,
      size,
    },
  })

// 搜索用户
export const searchUsers = (name: string) =>
  request<IUserInfo[]>({ url: searchUser_get, method: 'GET', params: { name } })

export const verifyPhoneNumber = (phoneNumber: string) => {
  return request({
    method: 'post',
    url: userPhoneVerify_post,
    data: { phoneNumber },
  })
}
export const sendSmsPhoneNumber = (phoneNumber: string) => {
  return request({
    url: userPhoneSms_post,
    data: { phoneNumber },
    method: 'post',
  })
}

export const userPhoneUpdate = (phoneNumber: string, verifyCode: string) => {
  return request({
    method: 'post',
    url: userPhoneUpdate_post,
    data: {
      phoneNumber,
      verifyCode,
    },
  })
}

export const fetchRecommendUser = (page: number, size: number) => {
  return request<RowsData<IOtherUser[]>>({
    method: 'get',
    url: recommendUser_get,
    params: {
      page,
      size,
    },
  })
}
