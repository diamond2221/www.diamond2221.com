import { IUserInfo } from '@/types'
import {
  register_post,
  login_post,
  changePassword_post,
  resisterSms_post,
  registerVerify_post,
} from '../../config/urls'
import { request } from '../request'

/** 登录
 * @param userName
 * @param passWord
 * @returns Omit<User, 'passWord' | 'lastTime' | 'addTime' | 'id'> & { token: string }
 */
export const Login = (userName: string, passWord: string) =>
  request<string | IUserInfo>({
    method: 'post',
    url: login_post,
    data: { userName, passWord },
  })

// 注册
export const Register = (
  userName: string,
  phoneNumber: number,
  passWord: string,
  rePassWord: string,
  verifyCode: string
) => {
  return request({
    method: 'post',
    url: register_post,
    data: {
      userName,
      phoneNumber,
      passWord,
      rePassWord,
      verifyCode,
    },
  })
}

export const ChangePassWord = (
  cppOldPassword: string,
  cppNewPassword: string,
  cppConfirmPassword: string
) => {
  return request({
    method: 'post',
    url: changePassword_post,
    data: {
      cppOldPassword,
      cppNewPassword,
      cppConfirmPassword,
    },
  })
}

export const RegisterSms = (phoneNumber: number) => {
  return request({
    method: 'post',
    url: resisterSms_post,
    data: { phoneNumber },
  })
}

export const RegisterVerify = (
  userName: string,
  phoneNumber: number,
  passWord: string,
  rePassWord: string
) => {
  return request({
    method: 'post',
    url: registerVerify_post,
    data: {
      userName,
      phoneNumber,
      passWord,
      rePassWord,
    },
  })
}
