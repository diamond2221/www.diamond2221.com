import { Form } from 'antd'

export const RegPhone = (value: string): boolean => {
  return !/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
}

export type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus']
export interface IValidator {
  value: string
  validateStatus?: ValidateStatus
  help?: string
  errorMsg?: string | null
}

// tslint:disable-next-line: unified-signatures
export function checkUsername(
  value: string
): Pick<IValidator, 'validateStatus' | 'errorMsg'> {
  if (!value) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入用户名',
    }
  }
  if (!/^\w{3,18}$/.test(value) && !/^[0-9]{3,18}$/.test(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '用户名要求字母数字下划线3-18位',
    }
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  }
}

// tslint:disable-next-line: unified-signatures
export function checkPassword(
  value: string
): Pick<IValidator, 'validateStatus' | 'errorMsg'> {
  if (!value) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入密码',
    }
  }
  if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '密码要求包含字母和数字,并且是6到18位之间',
    }
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  }
}

// tslint:disable-next-line: unified-signatures
export function checkPasswordAgian(
  value: string,
  passWord: string
): Pick<IValidator, 'validateStatus' | 'errorMsg'> {
  if (!value) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入确认密码',
    }
  }
  if (passWord !== value) {
    return {
      validateStatus: 'error',
      errorMsg: '请确认重复密码',
    }
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  }
}

// tslint:disable-next-line: unified-signatures
export function checkNoEmpty(
  this: any,
  fiel: string,
  value: any,
  callback: (arg?: Error) => void
) {
  if (!value) {
    return callback(new Error('请输入或选择内容'))
  }
  callback()
}

export function checkPhoneNumber(
  value: string
): Pick<IValidator, 'validateStatus' | 'errorMsg'> {
  if (!value) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入手机号',
    }
  }
  if (RegPhone(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的手机号',
    }
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  }
}

export function checkVerifyCode(
  value: string
): Pick<IValidator, 'validateStatus' | 'errorMsg'> {
  if (!value) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入验证码',
    }
  }
  if (!/\d{6}/.test(value)) {
    return {
      validateStatus: 'error',
      errorMsg: '请输入正确的验证码',
    }
  }
  return {
    validateStatus: 'success',
    errorMsg: null,
  }
}
