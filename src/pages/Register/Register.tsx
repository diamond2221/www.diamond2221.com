import React, { Component, useState } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import {
  Button,
  Input,
  Form,
  Card,
  notification /* Modal */,
  FormInstance,
} from 'antd'
import { Helmet } from 'react-helmet'
import {
  checkUsername,
  checkPassword,
  checkPasswordAgian,
  checkPhoneNumber,
} from '../../utils/validator'
// const { confirm } = Modal;

import * as RegisterApi from '../../network/modules/accounts'
import { IRegisterParams } from '../../types/api'
import md5 from '../../utils/md5'
import { RegisterWrapper } from './style'

interface IValidator {
  validateStatus: 'success' | 'warning' | 'error' | 'validating' | ''
  help: string
}

const beian = ''
const rules = {
  username: [
    {
      validator: checkUsername.bind(this),
    },
  ],
  phoneNumber: [
    {
      validator: checkPhoneNumber.bind(this),
    },
  ],
  password: [
    {
      validator: checkPassword.bind(this),
    },
  ],
  rePassword: [
    {
      validator: checkPasswordAgian.bind(this),
    },
  ],
}
const userNameRule: IValidator = {
  validateStatus: '',
  help: '',
}
const phoneNumberRule: IValidator = {
  validateStatus: '',
  help: '',
}
const passWordRule: IValidator = {
  validateStatus: '',
  help: '',
}
const rePassWordRule: IValidator = {
  validateStatus: '',
  help: '',
}
const verifyCodeRule: IValidator = {
  validateStatus: '',
  help: '',
}

export default function Registe(props: RouteComponentProps) {
  const [error, setError] = useState<null | string>(null)
  const [submitLock, setSubmitLock] = useState(false)
  const [getVerifyCoded, setGetVerifyCoded] = useState(false)
  const [time, setTime] = useState(59)
  const [form] = Form.useForm()
  const toRegister = () => {
    const { getVerifyCoded } = this.state
    // 进行真正的注册 （已经获取验证码 并且填写）
    form.validateFields().then((registerInfo: IRegisterParams) => {
      console.log(registerInfo, 'registerInfo')
      // const { submitLock } = this.state
      // if (submitLock) {
      //   return
      // }
      // this.setState({ submitLock: true })

      // this.setState({ error: null })
      // let { userName, phoneNumber, passWord, rePassWord } = registerInfo
      // let verifyCode: string = registerInfo.verifyCode || ''
      // if (!getVerifyCoded) {
      //   const result = await RegisterApi.RegisterVerify(
      //     userName,
      //     phoneNumber,
      //     md5(passWord),
      //     md5(rePassWord)
      //   ).toPromise()
      //   this.setState({
      //     userNameRule: {
      //       validateStatus: result.data.userName ? 'error' : 'success',
      //       help: result.data.userName,
      //     },
      //     phoneNumberRule: {
      //       validateStatus: result.data.phoneNumber ? 'error' : 'success',
      //       help: result.data.phoneNumber,
      //     },
      //     passWordRule: {
      //       validateStatus: result.data.passWordRule ? 'error' : 'success',
      //       help: result.data.passWordRule,
      //     },
      //     rePassWordRule: {
      //       validateStatus: result.data.rePassWordRule ? 'error' : 'success',
      //       help: result.data.rePassWordRule,
      //     },
      //     error:
      //       result.data.userName ||
      //       result.data.phoneNumber ||
      //       result.data.passWordRule ||
      //       result.data.rePassWordRule,
      //   })
      //   if (this.state.error) {
      //     return this.setState({ submitLock: false })
      //   }
      //   try {
      //     const result = await RegisterApi.RegisterSms(phoneNumber)
      //     this.setState({
      //       getVerifyCoded: true,
      //       submitLock: false,
      //     })
      //     this.timeStart()
      //     notification.success({ message: result })
      //   } catch (error) {
      //     this.setState({ submitLock: false })
      //   }
      // } else {
      //   if (!verifyCode.trim()) {
      //     return this.setState({
      //       verifyCodeRule: {
      //         validateStatus: 'error',
      //         help: '请输入验证码',
      //       },
      //       submitLock: false,
      //       error: '请输入验证码',
      //     })
      //   }
      //   if (!/\d{6}/.test(verifyCode)) {
      //     return this.setState({
      //       verifyCodeRule: {
      //         validateStatus: 'error',
      //         help: '请检查验证码',
      //       },
      //       submitLock: false,
      //       error: '请检查验证码',
      //     })
      //   }
      //   this.setState({
      //     error: null,
      //   })

      //   try {
      //     await RegisterApi.Register(
      //       userName,
      //       phoneNumber,
      //       md5(passWord),
      //       md5(rePassWord),
      //       verifyCode
      //     )
      //     notification.success({ message: '注册成功' })

      //     this.setState({
      //       submitLock: false,
      //     })

      //     return this.props.history.replace({
      //       pathname: '/account/login',
      //     })
      //   } catch (error) {
      //     this.setState({
      //       submitLock: false,
      //       error: null,
      //     })
      //   }
      // }
    })
  }

  const timeStart = () => {
    let timer = setInterval(() => {
      const newTime = time - 1
      setTime(newTime)
      if (newTime === 0) {
        clearInterval(timer)
      }
    }, 1000)
  }

  const reSendSms = async () => {
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
            <Form onFinish={this.toRegister} ref={(el) => (this.form = el)}>
              <Form.Item
                className="username"
                hasFeedback={true}
                validateStatus={userNameRule.validateStatus}
                help={userNameRule.help}
                rules={rules.username}
                name="userName"
              >
                <Input autoComplete="new-password" placeholder="用户名" />
              </Form.Item>
              <Form.Item
                className="phoneNumber"
                hasFeedback={true}
                validateStatus={phoneNumberRule.validateStatus}
                help={phoneNumberRule.help}
                name="phoneNumber"
                rules={rules.phoneNumber}
              >
                <Input
                  type="tel"
                  autoComplete="new-password"
                  placeholder="手机号"
                />
              </Form.Item>
              <Form.Item
                className="password"
                hasFeedback={true}
                validateStatus={passWordRule.validateStatus}
                help={passWordRule.help}
                name="passWord"
                rules={rules.password}
              >
                <Input
                  autoComplete="new-password"
                  type="password"
                  placeholder="密码"
                />
              </Form.Item>
              <Form.Item
                className="re-password"
                hasFeedback={true}
                validateStatus={rePassWordRule.validateStatus}
                help={rePassWordRule.help}
                name="rePassWord"
                rules={rules.rePassword}
              >
                <Input
                  autoComplete="new-password"
                  type="password"
                  placeholder="请确认密码"
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
              最后一个步骤：输入{' '}
              {({ getFieldValue }) => {
                getFieldValue('phoneNumber')
              }}{' '}
              收到的 6 位数验证码。
            </div>
            <Form onFinish={this.toRegister}>
              <Form.Item
                className="verify-code"
                hasFeedback={true}
                validateStatus={verifyCodeRule.validateStatus}
                help={verifyCodeRule.help}
                name="verifyCode"
              >
                <Input placeholder="验证码" />
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
          <Button type="link">{beian}</Button>
        </p>
      </Card>
    </RegisterWrapper>
  )
}
