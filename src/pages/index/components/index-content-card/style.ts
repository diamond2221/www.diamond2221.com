import styled from 'styled-components'
import spriteImg2 from '../../../../assets/image/sprite2.png'
import spriteImg from '../../../../assets/image/sprite.png'

/*
 * @Author: ZhangYu
 * @Date:   2018-12-30 10:48:54
 * @Last Modified by: zhangyu
 * @Last Modified time: 2019-08-11 18:03:00
 */

export const IndexContentCardWrapper = styled.div`
  .ant-card {
    width: 100%;
    margin-bottom: 60px;
    .ant-card-body {
      padding: 0;
      .u-title {
        background: #0000;
        border-bottom: 1px solid #e8e8e8;
        border-radius: 2px 2px 0 0;
        padding: 12px;
        zoom: 1;
        margin-bottom: -1px;
        min-height: 48px;
        height: 60px;
        font-size: 16px;
        color: #000000d9;
        font-weight: 500;
        display: flex;
        align-items: center;
        position: relative;
        .u-name {
          a {
            color: black;
          }
        }

        .actions-wrap {
          position: absolute;
          right: 4px;
          top: 0;
          height: 100%;
          display: flex;
          align-items: center;
          .actions {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            .circles {
              display: block;
              width: 16px;
              height: 16px;
              background: url(${spriteImg2}) no-repeat;
              background-position: -166px -54.5px;
              background-size: 236px 211px;
            }
          }
        }
      }
      .img-wrap {
        flex: 1;
        position: relative;
        width: 100%;
        .like-mask {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          z-index: 2;
        }
        .like-wrap {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          .like-state {
            position: absolute;
            background: url(${spriteImg}) no-repeat;
            background-position: -196px 0px;
            background-size: 495.5px 483px;
            height: 76.5px;
            width: 88px;
            transform: scale(0);
            margin: 0 auto;
            &.like-ing {
              animation-duration: 1000ms;
              animation-name: like-heart-animation;
              animation-timing-function: ease-in-out;
              opacity: 0;
              transform: scale(0);
            }
          }
        }
      }
      .user-comments {
        margin: 0px 16px;
        border-bottom: 1px solid #eee;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 1px;
        }
        .own-comments {
          margin-bottom: 4px;
        }
        .look-more-comments {
          color: #999;
          cursor: pointer;
          line-height: 18px;
          font-size: 14px;
          margin-bottom: 4px;
          text-decoration: none;
          &:visited {
            color: #003569;
          }
        }
        .own-comments,
        .other-comments {
          p {
            line-height: 18px;
            margin-bottom: 4px;
          }
          .comments-owner {
            color: black;
            font-weight: 600;
            margin-right: 8px;
          }
          .comment-content {
            color: #333;
            a {
              color: #003569;
            }
          }
          .comment-time {
            float: right;
            font-size: 12px;
            color: #666;
          }
        }
      }
      .user-action {
        margin: 0px 16px 0px;
        padding: 10px 0px 7px 0px;
        p {
          margin: 0;
          font-size: 12px;
          color: black;
          font-weight: 500;
        }
        a {
          color: black;
          font-weight: 500;
        }
        .like,
        .message,
        .share,
        .mark {
          display: inline-block;
          width: 24px;
          height: 23px;
          background: url(${spriteImg2}) no-repeat;
          background-size: 236px 211px;
          margin-right: 16px;
          cursor: pointer;
        }
        .like {
          background-position: -125px -113px;
          &.liked {
            background-position: -100px -113.5px;
          }
        }
        .message {
          background-position: -1px -188px;
        }
        .share {
          background-position: -188.5px -150px;
        }
        .mark {
          width: 19px;
          background-position: -189.5px -25px;
          margin-right: 0;
          float: right;
          &.marked {
            background-position: -127.5px -162px;
          }
        }
        .likenum {
          margin: 3px 0px;
        }
        a {
          font-size: 12px;
          color: black;
          cursor: pointer;
          display: block;
        }
      }
      .add-comments {
        border-top: 1px solid #eee;
        padding: 15px 0px;
        margin-top: 5px;
        input,
        input:focus {
          border: none !important;
          outline: none !important;
          box-shadow: none !important;
          color: black;
        }
      }
    }
  }

  .setting-wrap {
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.65);
    bottom: 0;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    left: 0;
    overflow-y: auto;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    display: flex;
    .setting {
      background-color: #fff;
      background-color: rgba(var(--f23, 255, 255, 255), 1);
      animation: IGCoreModalShow 0.1s ease-out;
      border-radius: 12px;
      flex-shrink: 1;
      margin: 20px;
      max-height: calc(100% - 40px);
      overflow: hidden;
      width: 400px;
      animation: IGCoreModalShow 0.1s ease-out;
      .sets {
        height: 100%;
        overflow: auto;
        .set-item {
          width: 100%;
          display: flex;
          background-color: transparent;
          border-bottom: 0;
          border-left: 0;
          border-right: 0;
          border-top: 1px solid #dbdbdb;
          border-top: 1px solid rgba(var(--b6a, 219, 219, 219), 1);
          cursor: pointer;
          line-height: 1.5;
          margin: 0;
          min-height: 48px;
          padding: 4px 8px;
          user-select: none;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          outline: 0;
          color: black;
          &:active {
            -webkit-tap-highlight-color: transparent;
            background-color: rgba(0, 0, 0, 0.1);
            opacity: 1;
          }
        }
      }
    }
  }
`
