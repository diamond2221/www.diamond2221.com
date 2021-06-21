import React from 'react'
import { Spin } from 'antd'
import { LoadingWrapper } from './style'

export interface IProps {
  loadText?: string
  delay?: number
  size?: 'small' | 'default' | 'large'
  indicator?: React.ReactElement<HTMLElement>
  cusStyle?: React.CSSProperties
}

export default function Loading(props: IProps) {
  const {
    loadText = '',
    delay = 0,
    size = 'default',
    indicator,
    cusStyle,
  } = props
  return (
    <LoadingWrapper style={cusStyle}>
      <Spin tip={loadText} delay={delay} size={size} indicator={indicator} />
    </LoadingWrapper>
  )
}
