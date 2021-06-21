import React, { Component } from 'react'
import DefaultLayout from '@/layouts/Layout'
import './App.less'
import { RouteComponentProps } from 'react-router'
import { inject, observer } from 'mobx-react'
import { AccountStore } from './store/account'

export interface AppProps extends RouteComponentProps {
  accountStore: AccountStore
}
export class App extends Component<Readonly<AppProps>> {
  render() {
    return (
      <div className="App">
        <DefaultLayout
          {...this.props}
          accountStore={this.props.accountStore}
        ></DefaultLayout>
      </div>
    )
  }
}

export default inject('accountStore')(observer(App)) as any
