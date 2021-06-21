import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
import { HomeWrapper } from './style'
import HeaderComponent from '@/components/header'
import FooterComponent from '@/components/footer'
import { inject, observer } from 'mobx-react'
import { AccountStore } from '@/store/account'
import { notification, Spin } from 'antd'
import { memo, Suspense, useEffect } from 'react'
import * as UserService from '@/network/modules/user'

function Home(
  props: RouteConfigComponentProps & { accountStore: AccountStore }
) {
  const { userInfo } = props.accountStore

  useEffect(() => {
    const { userId, token } = props.accountStore
    if (!userId || !token) return
    UserService.getUserInfo(0, userId)
      .toPromise()
      .then((res) => {
        if (res.data && typeof res.data !== 'string') {
          return props.accountStore.UpdateUserInfo({ ...res.data })
        }
        notification.error({ message: res })
      })
  }, [props.accountStore, props.accountStore.userId])

  useEffect(() => {
    const { pathname } = props.location
    if (
      pathname.startsWith('/accounts/') ||
      pathname.startsWith('/post/') ||
      pathname.startsWith('/newPost')
    ) {
      document.body.style.backgroundColor = 'rgb(250, 250, 250)'
    } else {
      document.body.style.backgroundColor = ''
    }
  }, [props.location, props.location.pathname])

  return (
    <HomeWrapper>
      {userInfo && (
        <HeaderComponent {...props} userInfo={userInfo}></HeaderComponent>
      )}
      <Suspense fallback={<Spin size="large" delay={1000} />}>
        {renderRoutes(props.route?.routes ?? [])}
      </Suspense>
      <FooterComponent></FooterComponent>
    </HomeWrapper>
  )
}

export default memo(inject('accountStore')(observer(Home)))
