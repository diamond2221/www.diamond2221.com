import { AppStore } from '@/store/app'
import md5 from '@/utils/md5'
import { Button, Card, Form, Input, notification /* Modal */ } from 'antd'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, RouteComponentProps } from 'react-router-dom'
// const { confirm } = Modal;
import * as RegisterApi from '../../network/modules/accounts'
import { IRegisterParams } from '../../types/api'
import {
  checkPassword, checkPasswordAgian, checkPhoneNumber,
  checkUsername, checkVerifyCode, IValidator
} from '../../utils/validator'
import { RegisterWrapper } from './style'

let realTime = 59

function Register(props: RouteComponentProps & { appStore: AppStore }) {
  const [error, setError] = useState<null | string>(null)
  const [submitLock, setSubmitLock] = useState(false)
  const [getVerifyCoded, setGetVerifyCoded] = useState(false)
  const [time, setTime] = useState(realTime)
  const [form] = Form.useForm()

  const [userName, setUserName] = useState<IValidator>({
    value: '',
    errorMsg: null,
    validateStatus: '',
  })
  const userNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setUserName({
      ...checkUsername(value),
      value,
    })
  }

  const [phoneNumber, setPhoneNumber] = useState<IValidator>({
    value: '',
    errorMsg: null,
    validateStatus: '',
  })
  const phoneNumberChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setPhoneNumber({
      ...checkPhoneNumber(value),
      value,
    })
  }

  const [passWord, setPassWord] = useState<IValidator>({
    value: '',
    errorMsg: null,
    validateStatus: '',
  })
  const passWordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setPassWord({
      ...checkPassword(value),
      value,
    })
  }

  const [rePassWord, setRePassWord] = useState<IValidator>({
    value: '',
    errorMsg: null,
    validateStatus: '',
  })
  const reRePassWordChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const value = e.target.value
    setRePassWord({
      ...checkPasswordAgian(value, passWord.value),
      value,
    })
  }

  const [verifyCode, setVerifyCode] = useState<IValidator>({
    value: '',
    errorMsg: null,
    validateStatus: '',
  })
  const verifyCodeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value
    setVerifyCode({
      ...checkVerifyCode(value),
      value,
    })
  }

  const toRegister = () => {
    // 进行真正的注册 （已经获取验证码 并且填写）
    form.validateFields().then(async (registerInfo: IRegisterParams) => {
      const userNameResult = checkUsername(userName.value)
      setUserName({
        ...userNameResult,
        value: userName.value,
      })
      const phoneNumberResult = checkPhoneNumber(phoneNumber.value)
      setPhoneNumber({
        ...phoneNumberResult,
        value: phoneNumber.value,
      })
      const passWordResult = checkPassword(passWord.value)
      setPassWord({
        ...passWordResult,
        value: passWord.value,
      })
      const rePassWordResult = checkPasswordAgian(
        rePassWord.value,
        passWord.value
      )
      setRePassWord({
        ...rePassWordResult,
        value: rePassWord.value,
      })

      if (
        !userNameResult.errorMsg &&
        !phoneNumberResult.errorMsg &&
        !passWordResult.errorMsg &&
        !rePassWordResult.errorMsg
      ) {
        console.log(registerInfo, 'registerInfo')
        if (submitLock) return
        setSubmitLock(true)
        setError(null)

        // let { userName, phoneNumber, passWord, rePassWord } = registerInfo
        let verifyCode: string = registerInfo.verifyCode || ''
        if (!getVerifyCoded) {
          const result = await RegisterApi.RegisterVerify(
            registerInfo.userName,
            registerInfo.phoneNumber,
            md5(registerInfo.passWord),
            md5(registerInfo.rePassWord)
          ).toPromise()

          setUserName({
            validateStatus: result.data.userName ? 'error' : 'success',
            errorMsg: result.data.userName,
            value: registerInfo.userName,
          })
          setPhoneNumber({
            validateStatus: result.data.phoneNumber ? 'error' : 'success',
            errorMsg: result.data.phoneNumber,
            value: `${registerInfo.phoneNumber}`,
          })
          const newError =
            result.data.userName ||
            result.data.phoneNumber ||
            result.data.passWordRule ||
            result.data.rePassWordRule
          setError(newError)
          setPassWord({
            validateStatus: result.data.passWordRule ? 'error' : 'success',
            errorMsg: result.data.passWordRule,
            value: registerInfo.passWord,
          })

          setRePassWord({
            validateStatus: result.data.rePassWordRule ? 'error' : 'success',
            errorMsg: result.data.rePassWordRule,
            value: registerInfo.rePassWord,
          })

          if (newError) {
            return setSubmitLock(false)
          }

          try {
            const result = await RegisterApi.RegisterSms(
              registerInfo.phoneNumber
            ).toPromise()
            setGetVerifyCoded(true)
            setSubmitLock(false)
            timeStart()
            notification.success({ message: result.data })
          } catch (error) {
            setSubmitLock(false)
          }
        } else {
          if (!verifyCode.trim()) {
            setSubmitLock(false)
            setError('请输入验证码')

            return setVerifyCode({
              validateStatus: 'error',
              errorMsg: '请输入验证码',
              value: verifyCode,
            })
          }
          if (!/\d{6}/.test(verifyCode)) {
            setSubmitLock(false)
            setError('请检查验证码')
            return setVerifyCode({
              validateStatus: 'error',
              errorMsg: '请检查验证码',
              value: verifyCode,
            })
          }
          setError(null)

          try {
            await RegisterApi.Register(
              registerInfo.userName,
              registerInfo.phoneNumber,
              md5(registerInfo.passWord),
              md5(registerInfo.rePassWord),
              verifyCode
            )
            notification.success({ message: '注册成功' })

            setSubmitLock(false)

            return props.history.replace({
              pathname: '/account/login',
            })
          } catch (error) {
            setSubmitLock(false)
            setError(null)
          }
        }
      }
    })
  }

  const timeStart = () => {
    let timer = setInterval(() => {
      realTime = realTime - 1
      setTime(realTime)
      if (realTime === 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  const reSendSms = async () => {
    realTime = 60
    setTime(60)
    try {
      const result = await RegisterApi.RegisterSms(
        form.getFieldValue('phoneNumber')
      )
      timeStart()
      notification.success({ message: result })
    } catch (error) {}
  }

  return (
    <RegisterWrapper className="page-register">
      <Helmet>
        <title>注册 • Diamond</title>
      </Helmet>
      <Card>
        <div className="logo-img" />
        <h3>注册 Diamond, 分享精彩世界</h3>

        <div style={{ display: !getVerifyCoded ? 'block' : 'none' }}>
          <div className="form">
            <Form form={form} onFinish={toRegister}>
              <Form.Item
                className="username"
                hasFeedback={true}
                validateStatus={userName.validateStatus}
                help={userName.errorMsg}
                name="userName"
              >
                <Input
                  autoComplete="new-password"
                  placeholder="用户名"
                  value={userName.value}
                  onChange={userNameChange}
                />
              </Form.Item>
              <Form.Item
                className="phoneNumber"
                hasFeedback={true}
                validateStatus={phoneNumber.validateStatus}
                help={phoneNumber.errorMsg}
                name="phoneNumber"
              >
                <Input
                  type="tel"
                  autoComplete="new-password"
                  placeholder="手机号"
                  value={phoneNumber.value}
                  onChange={phoneNumberChange}
                />
              </Form.Item>
              <Form.Item
                className="password"
                hasFeedback={true}
                validateStatus={passWord.validateStatus}
                help={passWord.errorMsg}
                name="passWord"
              >
                <Input
                  autoComplete="new-password"
                  type="password"
                  placeholder="密码"
                  value={passWord.value}
                  onChange={passWordChange}
                />
              </Form.Item>

              <Form.Item
                className="re-password"
                hasFeedback={true}
                validateStatus={rePassWord.validateStatus}
                help={rePassWord.errorMsg}
                name="rePassWord"
              >
                <Input
                  autoComplete="new-password"
                  type="password"
                  placeholder="请确认密码"
                  value={rePassWord.value}
                  onChange={reRePassWordChange}
                />
              </Form.Item>
              <Form.Item className="login">
                <Button type="primary" htmlType="submit" loading={submitLock}>
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
          <p
            className="ant-form-explain "
            style={{
              display: error ? '' : 'none',
              color: '#f5222d',
            }}
          >
            {error}
          </p>
          <div className="lines">
            <div className="line" />
            <p className="or">或</p>
            <div className="line" />
          </div>
          <Link to="/account/forgetPassword">忘记密码？</Link>
        </div>

        <div
          className="form-wrap"
          style={{
            display: getVerifyCoded ? 'block' : 'none',
          }}
        >
          <div className="form">
            <div>
              最后一个步骤：输入
              {phoneNumber.value} 收到的 6 位数验证码。
            </div>
            <Form onFinish={toRegister} form={form}>
              <Form.Item
                className="verify-code"
                name="verifyCode"
                validateStatus={verifyCode.validateStatus}
                help={verifyCode.errorMsg}
              >
                <Input
                  placeholder="验证码"
                  value={verifyCode.value}
                  onChange={verifyCodeChange}
                />
              </Form.Item>
              <Form.Item className="login">
                <Button type="primary" htmlType="submit" loading={submitLock}>
                  确定
                </Button>
              </Form.Item>
            </Form>
          </div>
          <p
            className="ant-form-explain "
            style={{
              display: error ? '' : 'none',
              color: '#f5222d',
            }}
          >
            {error}
          </p>
          <div
            className="re-sendSms"
            style={{ display: time === 0 ? 'block' : 'none' }}
          >
            <Button type="link" onClick={reSendSms}>
              重发验证码
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <p>
          已有帐户？ <Link to="/account/login">去登录</Link>
        </p>
      </Card>
      <Card>
        <p>
          <Button type="link">{props.appStore.beian}</Button>
        </p>
      </Card>
    </RegisterWrapper>
  )
}

export default inject('appStore')(observer(Register))
