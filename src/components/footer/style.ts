import styled from 'styled-components'

/*
 * @Author: ZhangYu
 * @Date:   2018-12-27 16:47:58
 * @Last Modified by:   ZhangYu
 * @Last Modified time: 2018-12-27 18:32:18
 */
export const FooterWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 45px;
  .footer-container {
    width: 935px;
    margin: 0 auto;
    overflow: hidden;
    font-size: 12px;
    font-weight: bold;
    line-height: 24px;
    .footer-nav {
      float: left;
      margin-bottom: 0;
      li {
        float: left;
        margin-right: 17px;
        a {
          color: #023468;
        }
      }
    }
    span {
      float: right;
    }
  }
`
