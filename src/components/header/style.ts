import styled from 'styled-components'
import indexLogo from '../../assets/image/logo/index-logo.png'
import spriteImg from '../../assets/image/sprite.png'

export const HeaderWrapper = styled.div`
  height: 54px;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  z-index: 999;
  transition: height 0.4s;
  display: flex;
  align-items: center;
  .header-container {
    // overflow: hidden;
    width: 935px;
    margin: 0 auto;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
    .logo {
      height: 29px;
      width: 103px;
      background: url(${indexLogo}) no-repeat;
      margin-top: 8px;
      &:active {
        opacity: 0.6;
      }
      a {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
    }
    .f1 {
      flex: 1;
    }
    .search {
      margin: 0 auto;
      width: 215px;
      position: absolute;
      left: 50%;
      margin-left: -107.5px;

      .ant-input-search {
        width: 100%;
        z-index: 2;
        input.ant-input {
          height: 28px;
        }
      }
      .dialog {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
      }
      .users-wrap {
        position: relative;
        z-index: 2;
        .arrow-top {
          content: ' ';
          background: #fff;
          border: solid 1px #dbdbdb;
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.0975);
          height: 14px;
          left: 0;
          margin: auto;
          position: absolute;
          right: 0;
          top: 12px;
          transform: rotate(45deg);
          width: 14px;
          z-index: 1;
        }
        .users {
          position: absolute;
          background: #fff;
          border: solid 1px #dbdbdb;
          border-radius: 3px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.0975);
          display: block;
          left: 50%;
          margin-left: -121px;
          position: absolute;
          right: -12px;
          top: 12px;
          width: 243px;
          z-index: 9;
          &::after {
            content: ' ';
            border-color: transparent transparent #fff transparent;
            border-style: solid;
            border-width: 0 10px 10px 10px;
            height: 0;
            left: 110px;
            position: absolute;
            top: -10px;
            width: 0;
            z-index: 3;
          }
          .users-list {
            max-height: 362px;
            overflow-x: hidden;
            overflow-y: auto;
            padding: 0;
            .user-item {
              align-items: center;
              border-bottom: solid 1px #dbdbdb;
              display: flex;
              flex-direction: row;
              flex-shrink: 0;
              height: 50px;
              padding: 8px 14px;
              text-decoration: none;
              box-sizing: content-box;
              &:last-child {
                border: 0;
              }
              &:hover,
              &.active {
                background-color: #fafafa;
              }
              .user-inner {
                align-items: center;
                display: flex;
                flex-direction: row;
                margin-right: 0;
                white-space: nowrap;
                width: 100%;
                .user-info {
                  display: flex;
                  flex-direction: column;
                  flex-shrink: 1;
                  justify-content: center;
                  min-width: 0;
                  .user-username {
                    color: #262626;
                    flex-direction: row;
                    font-size: 14px;
                    text-align: left;
                    border: 0px solid #000;
                    margin-bottom: -4px;
                    span {
                      line-height: 22px;
                      overflow: hidden;
                      font-weight: 600;
                      text-overflow: ellipsis;
                    }
                  }
                  .user-name {
                    color: #999;
                    font-size: 14px;
                    font-weight: 500;
                    line-height: 22px;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                  }
                }
              }
            }
            .no-user {
              color: #999;
              font-size: 14px;
              padding: 15px;
              text-align: center;
            }
          }
        }
      }

      .search-block {
        box-sizing: border-box;
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        width: 100%;
        border-radius: 3px;
        color: #999;
        cursor: text;
        font-size: 14px;
        font-weight: 300;
        text-align: center;
        background: #fafafa;
        border: solid 1px #dbdbdb;

        .block-icon {
          display: inline-block;
          height: 10px;
          width: 10px;
          text-align: center;
          vertical-align: baseline;
          margin-right: 6px;
          /* @include sprite-2x(); */
          background-repeat: no-repeat;
          background-image: url(${spriteImg});
          background-size: 495px 483px;
          background-position: -135px -339px;
        }

        .block-text {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .header-nav {
      display: flex;
      align-items: center;
      height: 100%;
      margin-bottom: 0px;
      padding: 5.5px 0px;
      li {
        display: inline-block;
        margin-left: 22px;
        width: 24px;
        height: 24px;
        a,
        .link {
          width: 100%;
          height: 100%;
          display: inline-block;
          &:active {
            opacity: 0.5;
          }
        }

        &.index {
          a {
            background: url(${spriteImg}) no-repeat -250px -425.5px;
            background-size: 495.5px 483px;
          }
          &.active {
            a {
              background-position: -225px -425.5px;
            }
          }
        }
        &.explore {
          a {
            background: url(${spriteImg}) no-repeat -175px -399.5px;
            background-size: 495.5px 483px;
          }
          &.active {
            a {
              background-position: -174.5px -424.5px;
            }
          }
        }
        &.suggested {
          span {
            background: url(${spriteImg}) no-repeat -150px -425px;
            background-size: 495.5px 483px;
            cursor: pointer;
          }

          &.active {
            span {
              background-position: -425px -425px;
            }
          }
        }
        &.my {
          a {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            overflow: hidden;
            position: relative;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              background-color: #efefef;
            }
            &:active {
              opacity: 1;
            }
            &::after {
              border: 1px solid rgba(0, 0, 0, 0.0975);
              border-radius: 50%;
              bottom: 0;
              content: '';
              left: 0;
              pointer-events: none;
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
        &.isme {
          .wrap-avatar {
            border: 1px solid #262626;
            border-radius: 50%;
            height: 28px;
            margin-left: -2px;
            margin-top: -3px;
            position: absolute;
            width: 28px;
          }
        }
      }
    }
  }
`
