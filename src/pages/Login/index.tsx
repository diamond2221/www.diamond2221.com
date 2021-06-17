import React, { useState } from 'react'
import { LoginPageWrapper } from './style'
import { Helmet } from 'react-helmet'
import { Card, Form, Button, Input, notification } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'
import { ILoginParams } from '@/types/api'
import * as LoginApi from '../../network/modules/accounts'
import md5 from '@/utils/md5'
import { IUserInfo } from '@/types/index'
import * as Rx from 'rxjs'
import * as operators from 'rxjs/operators'
import { useEffect } from 'react'

const beian = '晋ICP备19002402号-3'
const rules = {
  username: [
    {
      required: true,
      message: '请输入账号',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
    },
  ],
}
const fromPath = ''

const loginSubject = new Rx.BehaviorSubject(null as null | ILoginParams)
const loginResultObservable = loginSubject.pipe(
  operators.filter((v) => !!v),
  operators.debounceTime(300),
  operators.distinctUntilChanged(),
  operators.switchMap((login) => {
    return Rx.from(LoginApi.Login(login!.userName, md5(login!.passWord)))
  })
  // operators.catchError(() => {
  //   return Rx.empty()
  // })
)

function Login(props: RouteComponentProps) {
  let [loginParams, setLoginParams] = useState<null | ILoginParams>(null)

  const [error, setError] = useState<null | string>(null)
  const [form] = Form.useForm()

  const toLogin = () => {
    form.validateFields().then((login: ILoginParams) => {
      setLoginParams(login)
      loginSubject.next(login)
    })
  }

  useEffect(() => {
    const loginSubscription = loginResultObservable.subscribe((result) => {
      if (typeof result.data !== 'string') {
        const userInfo: IUserInfo = { ...result.data }
        // sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        // setUser({ userId: userInfo.userId, token: userInfo.token })
        // const { fromPath } = this.props
        // this.props.updateFromPath('')
        setTimeout(() => {
          props.history.replace({
            pathname: fromPath ? fromPath : '/',
          })
        }, 200)
        // this.props.login(userInfo)
      } else {
        notification.error({
          message: result,
        })
      }
      setError(null)
    })
    return () => {
      loginSubscription.unsubscribe()
    }
  }, [loginParams])

  return (
    <LoginPageWrapper>
      <Helmet>
        <title>登录 • Diamond</title>
      </Helmet>
      <Card>
        <div className="logo-img" />
        <h3>登录 Diamond, 分享精彩世界</h3>
        <Form form={form} onFinish={toLogin}>
          <Form.Item name="userName" rules={rules.username}>
            <Input placeholder="用户名、手机号" />
          </Form.Item>
          <Form.Item name="passWord" rules={rules.password}>
            <Input type="password" placeholder="密码" />
          </Form.Item>
          <Form.Item className="login">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
        <div className="lines">
          <div className="line" />
          <p className="or">或</p>
          <div className="line" />
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
        <Link to="/account/forgetPassword">忘记密码？</Link>
      </Card>
      <Card>
        <p>
          没有帐户？ <Link to="/account/register">去注册</Link>
        </p>
      </Card>
      <Card>
        <p>
          <Button type="link">{beian}</Button>
        </p>
      </Card>
    </LoginPageWrapper>
  )
}

export default Login
