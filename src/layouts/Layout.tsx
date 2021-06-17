import { Layout } from 'antd'
import React from 'react'
import { renderRoutes } from 'react-router-config'
import { RouteComponentProps } from 'react-router-dom'
import {routes } from '@/router/index'
import { LayoutWrapper } from './style'


const { Content } = Layout

export function DefaultLayout(props: RouteComponentProps) {
  return (
    <LayoutWrapper >
      <Content className="site-layout-content">{renderRoutes(routes)}</Content>
    </LayoutWrapper>
  )
}

export default DefaultLayout
