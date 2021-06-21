import { routes } from '@/router/index'
import { AccountStore } from '@/store/account'
import { Layout } from 'antd'
import { renderRoutes } from 'react-router-config'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { LayoutWrapper } from './style'

const { Content } = Layout

export function DefaultLayout(
  props: RouteComponentProps & { accountStore: AccountStore }
) {
  const isLogin = Boolean(props.accountStore.userId && props.accountStore.token)
  const dealRoutes = routes.filter((v) => isLogin === Boolean(v.meta?.auth))

  if (!isLogin) {
    dealRoutes.push({
      path: '*',
      render: () => <Redirect to="/account/login"></Redirect>,
    })
  }

  return (
    <LayoutWrapper>
      <Content className="site-layout-content">
        {renderRoutes(dealRoutes)}
      </Content>
    </LayoutWrapper>
  )
}

export default DefaultLayout
