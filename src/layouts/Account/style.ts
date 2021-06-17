import styled from 'styled-components'
import logoBg from '../../assets/image/login/loginbg.png'
import loginBg1 from '../../assets/image/login/1.jpg'
import loginBg2 from '../../assets/image/login/2.jpg'
import loginBg3 from '../../assets/image/login/3.jpg'
import loginBg4 from '../../assets/image/login/4.jpg'
import loginBg5 from '../../assets/image/login/5.jpg'

export const AccountWrapper = styled.div`
  .account-container {
    margin: 0 auto;
    width: 935px;
    display: flex;
    .account-bg {
      background: url(${logoBg}) no-repeat center
        center;
      background-size: contain;
      height: 590px;
      margin: 60px 35px 0px;
      width: 454px;
      position: relative;
      .toogle-image {
        width: 231px;
        height: 411px;
        position: absolute;
        left: 154px;
        top: 94px;
        .img {
          width: 100%;
          height: 100%;
          list-style-type: none;
          li {
            width: 100%;
            height: 100%;
            position: absolute;
            background-size: cover;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            transition: all 2000ms;
            &.li1 {
              background-image: url(${loginBg1});
            }
            &.li2 {
              background-image: url(${loginBg2});
            }
            &.li3 {
              background-image: url(${loginBg3});
            }
            &.li4 {
              background-image: url(${loginBg4});
            }
            &.li5 {
              background-image: url(${loginBg5});
            }
          }
        }
      }
    }
  }
`
