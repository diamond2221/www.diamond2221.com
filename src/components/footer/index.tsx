import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { FooterWrapper } from './style'

export default class Footer extends Component {
  render() {
    return (
      <FooterWrapper>
        <div className="footer-container">
          <ul className="footer-nav">
            <li>
              <Link to="/">关于我们</Link>
            </li>
            <li>
              <Link to="/">支持</Link>
            </li>
            <li>
              <Link to="/">新闻中心</Link>
            </li>
            <li>
              <Link to="/">API</Link>
            </li>
            <li>
              <Link to="/">工作</Link>
            </li>
            <li>
              <Link to="/">隐私</Link>
            </li>
            <li>
              <Link to="/">条款</Link>
            </li>
            <li>
              <Link to="/">目录</Link>
            </li>
            <li>
              <Link to="/">个人主页</Link>
            </li>
            <li>
              <Link to="/">话题标签</Link>
            </li>
            <li>
              <Link to="/">语言</Link>
            </li>
          </ul>
          <span>© 2021 Diamond</span>
        </div>
      </FooterWrapper>
    )
  }
}
